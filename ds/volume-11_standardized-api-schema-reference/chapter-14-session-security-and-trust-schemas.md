# Chapter 14: Session, Security & Trust Schemas

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 14.1 Purpose

Secure sessions, trust domains, and capability-level security classifications govern who may use what, and under which protection (Volume IV, Ch 14; Volume VIII, Ch 13).

## 14.2 Session Control (`dmwe_session.proto`)

```protobuf
syntax = "proto3";
package dmwe.session;

enum SessionState {
  SESSION_UNKNOWN = 0;
  SESSION_ESTABLISHING = 1;
  SESSION_ACTIVE = 2;
  SESSION_SUSPENDED = 3;
  SESSION_CLOSED = 4;
}

message SessionEnvelope {
  string session_id = 1;
  SessionState state = 2;
  string initiator_node_id = 3;
  repeated string participant_node_ids = 4;
  uint64 established_at_ms = 5;
  uint64 expires_at_ms = 6;
  bytes session_key_ref = 7;     // key identifier, never the key material
}
```

## 14.3 Trust Domain

```protobuf
enum TrustDomainClass {
  DOMAIN_UNKNOWN = 0;
  DOMAIN_TRUSTED_LOCAL = 1;
  DOMAIN_ISOLATED = 2;
  DOMAIN_CLOUD = 3;
}

message TrustDomain {
  string domain_id = 1;
  TrustDomainClass domain_class = 2;
  repeated string node_ids = 3;
  PrivacyDomain privacy_cap = 4; // Chapter 8
}
```

## 14.4 Security Classifications

| Class | Handling |
|-------|----------|
| Integrity only | Default; detects tampering |
| Confidential | Encrypted end-to-end |
| Authenticated | Provenance verifiable |
| Secure element | Keys bound to hardware (Volume III, Ch 9) |

## 14.5 Capability Access Control

```protobuf
message CapabilityAccessPolicy {
  string capability_id = 1;
  repeated string allowed_consumer_roles = 2;
  PrivacyDomain min_privacy_class = 3;
  bool require_consent = 4;
  uint32 max_usage_rate_hz = 5;
}
```

## 14.6 Key & Material Rules

- Key material MUST NOT be transmitted in messages.
- Only `*_key_ref` identifiers traverse the mesh.
- Session keys MUST provide forward secrecy.
- Revoked sessions MUST terminate within one QoS latency budget.

## 14.7 Conformance

A conformant implementation MUST enforce trust domains, respect access policies, transmit key references only, and terminate revoked sessions promptly.
