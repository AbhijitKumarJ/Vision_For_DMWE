# Chapter 7: Capability Advertisement Schema

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 7.1 Purpose

Once a module is authenticated, it registers its **Capability Advertisements** (Volume V, Ch 4; Volume VIII, Ch 7). These make the module's services discoverable and negotiable.

## 7.2 Wire Format (`dmwe_capability.proto`)

```protobuf
syntax = "proto3";
package dmwe.capability;

enum CapabilityState {
  STATE_UNKNOWN = 0;
  STATE_AVAILABLE = 1;
  STATE_RESERVED = 2;
  STATE_SUSPENDED = 3;
}

enum EnergyProfile {
  ENERGY_UNKNOWN = 0;
  ENERGY_LOW = 1;
  ENERGY_MEDIUM = 2;
  ENERGY_HIGH = 3;
}

enum PrivacyDomain {
  PRIVACY_UNKNOWN = 0;
  PRIVACY_PUBLIC = 1;
  PRIVACY_PERSONAL = 2;
  PRIVACY_PRIVATE = 3;
  PRIVACY_RESTRICTED = 4;
}

message LatencyReport {
  uint32 typical_ms = 1;
  uint32 p50_ms = 2;
  uint32 p95_ms = 3;
  uint32 p99_ms = 4;
}

message QualityOfCapability {
  LatencyReport latency = 1;
  float accuracy_score = 2;      // 0.0 to 1.0
  float availability = 3;        // 0.0 to 1.0
  EnergyProfile energy_cost = 4;
  PrivacyDomain privacy_class = 5;
  float composite_score = 6;     // Volume V, Ch 11
}

message CapabilityAdvertisement {
  string capability_id = 1;      // e.g. "interaction.pointer.precision"
  string version = 2;            // e.g. "2.1.0"
  string provider_node_id = 3;
  string schema_version = 4;

  CapabilityState lifecycle_state = 5;
  QualityOfCapability qoc = 6;

  repeated string dependencies = 7;  // required underlying capability IDs
  repeated string supported_contexts = 8;
}
```

## 7.3 TypeScript SDK View

```typescript
/** Volume V, Ch 4: Capability Metadata */
interface CapabilityAdvertisement {
  capabilityId: string;          // e.g. "interaction.pointer.precision"
  version: string;               // e.g. "2.1.0"
  providerNodeId: string;

  lifecycleState: CapabilityState; // AVAILABLE, RESERVED, SUSPENDED

  qoc: {
    latencyMs: number;
    accuracyScore: number;       // 0.0 to 1.0
    energyCost: EnergyProfile;   // LOW, MEDIUM, HIGH
    privacyClass: PrivacyDomain; // PUBLIC, PERSONAL, PRIVATE
  };

  dependencies?: string[];       // IDs of required underlying capabilities
  supportedContexts?: string[];
}
```

## 7.4 Advertisement Semantics

- `capability_id` follows the reverse-domain dot convention (Chapter 2).
- `lifecycle_state` transitions are governed by the Capability Manager (Volume IV, Ch 6).
- `supported_contexts` MUST NOT overclaim validated performance.
- QoC values MUST be updated dynamically as quality changes (Volume V, Ch 4).

## 7.5 Registration & Update

- Advertisements are transmitted in `TYPE_CAPABILITY_ADVERT` envelopes (Chapter 5).
- Updates MUST replace the previous advertisement atomically.
- Deregistration uses `STATE_SUSPENDED` followed by lifecycle removal.

## 7.6 Conformance

A conformant capability MUST publish a complete, accurate, dynamically updated `CapabilityAdvertisement` and honor its declared QoC and dependencies.
