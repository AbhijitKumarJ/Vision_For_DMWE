# Chapter 7: Capability Exchange Protocol (CEP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 7.1 Purpose

Modules publish capabilities through standardized exchanges. This protocol feeds the Capability Registry defined in Volume V.

## 7.2 Exchange Types

- Initial advertisement.
- Incremental updates.
- Capability withdrawal.
- Metadata synchronization.
- Capability version negotiation.
- Composite capability announcements.

## 7.3 Initial Advertisement

- Sent at module Registration (Chapter 3).
- Carries the full Capability Set (Volume V, Ch 2).
- Advertisements are authenticated (Chapter 13).

## 7.4 Incremental Updates

- State changes propagate as deltas.
- Updates include the affected Capability ID.
- Low-cost updates preserve battery (Volume IV, Ch 13).

## 7.5 Capability Withdrawal

- Modules signal capability removal.
- Dependents are notified before withdrawal where possible.
- Withdrawal triggers renegotiation (Volume V, Ch 7).

## 7.6 Metadata Synchronization

- Descriptor and metadata sync (Volume III, Ch 4).
- Updates flow to the Capability Registry.
- Conflicts resolve by version + timestamp.

## 7.7 Capability Negotiation Protocol

When a consumer needs a capability it does not本地 have, it initiates a negotiation with one or more providers. This section specifies the handshake, message formats, timeout rules, and state machine.

### 7.7.1 Negotiation State Machine

```
IDLE
  ↓ (consumer needs capability)
REQUESTING
  ↓ (provider receives request)
OFFERING
  ↓ (provider sends offer)
COUNTER_OFFERING  ←→  (consumer sends counter-offer; loop max 3 rounds)
  ↓ (terms agreed)
ACCEPTING
  ↓ (both parties confirm)
BOUND
  ↓ (binding active)
  ↓ (consumer or provider terminates)
RELEASING
  ↓ (cleanup complete)
IDLE
```

### 7.7.2 Message Format

All negotiation messages are carried in `MeshEnvelope` (Volume XI, Ch 5) with `TYPE_CAPABILITY_NEGOTIATE`.

```protobuf
syntax = "proto3";
package dmwe.capability.negotiation;

enum NegotiationMessageType {
  NEGOTIATE_REQUEST = 0;
  NEGOTIATE_OFFER = 1;
  NEGOTIATE_COUNTER = 2;
  NEGOTIATE_ACCEPT = 3;
  NEGOTIATE_REJECT = 4;
  NEGOTIATE_RELEASE = 5;
  NEGOTIATE_ACK = 6;
}

message NegotiationHeader {
  string negotiation_id = 1;      // Unique per negotiation session
  string capability_id = 2;       // e.g. "interaction.pointer.precision"
  string consumer_node_id = 3;
  string provider_node_id = 4;
  uint32 sequence = 5;            // Message sequence number
  uint64 timestamp_ms = 6;
}

message QoCRequirement {
  uint32 max_latency_ms = 1;
  float min_accuracy = 2;         // 0.0 to 1.0
  float min_availability = 3;     // 0.0 to 1.0
  EnergyProfile max_energy_cost = 4;
  PrivacyDomain max_privacy_class = 5;
}

message NegotiationRequest {
  NegotiationHeader header = 1;
  QoCRequirement required_qoc = 2;
  repeated string preferred_versions = 3;  // e.g. ["2.1.0", "2.0.x"]
  uint32 timeout_ms = 4;          // Consumer's negotiation timeout
  string context_snapshot_id = 5; // Current interaction context
}

message NegotiationOffer {
  NegotiationHeader header = 1;
  string offered_version = 2;
  QualityOfCapability offered_qoc = 3;
  repeated string dependencies = 4;
  uint32 grant_duration_ms = 5;   // How long the grant is valid
  bytes transport_params = 6;     // Negotiated transport configuration
}

message NegotiationCounter {
  NegotiationHeader header = 1;
  QoCRequirement revised_requirements = 2;
  string preferred_version = 3;
  uint32 revised_timeout_ms = 4;
}

message NegotiationAccept {
  NegotiationHeader header = 1;
  string accepted_version = 2;
  bytes transport_params = 3;
}

message NegotiationReject {
  NegotiationHeader header = 1;
  RejectReason reason = 2;
  string message = 3;
}

enum RejectReason {
  REJECT_UNKNOWN = 0;
  REJECT_INCOMPATIBLE_VERSION = 1;
  REJECT_QOC_UNAVAILABLE = 2;
  REJECT_CAPACITY_EXCEEDED = 3;
  REJECT_UNTRUSTED_CONSUMER = 4;
  REJECT_TIMEOUT = 5;
  REJECT_DEPENDENCY_MISSING = 6;
}

message NegotiationRelease {
  NegotiationHeader header = 1;
  ReleaseReason reason = 2;
}

enum ReleaseReason {
  RELEASE_CONSUMER_INITIATED = 0;
  RELEASE_PROVIDER_INITIATED = 1;
  RELEASE_TIMEOUT = 2;
  RELEASE_ERROR = 3;
  RELEASE_MIGRATION = 4;
}
```

### 7.7.3 Negotiation Sequence

```
Consumer                          Provider
   │                                │
   │── REQUEST ────────────────────→│
   │   (capability_id, required_qoc,│
   │    preferred_versions, timeout) │
   │                                │
   │←────────────────────── OFFER ──│
   │   (offered_version, offered_qoc,│
   │    grant_duration, transport)   │
   │                                │
   │── COUNTER (optional) ─────────→│
   │   (revised_requirements,        │
   │    preferred_version)           │
   │                                │
   │←─────────────────── OFFER ─────│
   │   (revised offer)               │
   │                                │
   │── ACCEPT ─────────────────────→│
   │   (accepted_version, transport) │
   │                                │
   │←─────────────────────── ACK ───│
   │   (grant_id, stream_token)      │
   │                                │
   │   [BOUND — capability active]   │
```

### 7.7.4 Timeout Rules

| Phase | Default Timeout | Action on Timeout |
|-------|-----------------|-------------------|
| Request → Offer | 2 s | Consumer retries once; then fails over to next provider |
| Offer → Counter/Accept | 1 s | Provider assumes accepted; proceeds with offered terms |
| Counter → Revised Offer | 1 s | Consumer rejects; negotiation ends |
| Accept → ACK | 500 ms | Consumer assumes bound; provider MUST send ACK within budget |
| Total negotiation | 5 s | If not bound within 5 s, negotiation fails; consumer falls back to default profile |

### 7.7.5 Multi-Provider Negotiation

When multiple providers offer the same capability:

1. Consumer sends REQUEST to all eligible providers simultaneously.
2. Consumer collects OFFERs within the request timeout window.
3. Consumer selects the best offer based on: QoC score → version freshness → provider trust level.
4. Consumer sends ACCEPT to selected provider; sends REJECT to others.
5. Rejected providers release any reserved resources.

### 7.7.6 Negotiation during Migration

When a capability migrates from one provider to another:

1. Current provider signals WITHDRAWAL (§7.5).
2. Capability Manager initiates negotiation with candidate providers.
3. Migration negotiation uses the same handshake but with reduced timeout (2 s total).
4. In-flight interactions are checkpointed before migration (Volume IV, Ch 12).

### 7.7.7 Protocol Graph Integration

- Each negotiation creates a Protocol Graph edge: consumer → provider.
- The edge carries the negotiated version, QoC, and grant duration.
- Edge removal triggers capability withdrawal notification to dependents.

## 7.8 Composite Capability Announcements

- Multiple modules MAY announce a composite capability.
- Composites reference member capabilities.
- Withdrawal of a member dissolves the composite.

## 7.9 Conformance

A conformant CEP MUST:
1. Support all exchange types (§7.2).
2. Implement the full negotiation handshake (§7.7.3).
3. Enforce timeout rules (§7.7.4).
4. Support multi-provider negotiation (§7.7.5).
5. Integrate with the Protocol Graph (§7.7.7).
6. Authenticate all negotiation messages (Chapter 13).
