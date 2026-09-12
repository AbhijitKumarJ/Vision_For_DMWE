# Chapter 15: Resource Coordination & Telemetry Schemas

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 15.1 Purpose

Resource coordination and telemetry keep the mesh alive, healthy, and schedulable (Volume IV, Ch 7, 19; Volume VIII, Ch 10, 16).

## 15.2 Resource Coordination (`dmwe_core.proto`)

```protobuf
syntax = "proto3";
package dmwe.core;

message ResourceClaim {
  string claim_id = 1;
  string resource_id = 2;         // Chapter 8
  string claimant_node_id = 3;
  uint32 claimed_units = 4;
  uint64 expires_at_ms = 5;
  PriorityClass priority = 6;
}

message ResourceGrant {
  string claim_id = 1;
  string grant_id = 2;
  bool granted = 3;
  uint32 granted_units = 4;
  uint64 valid_until_ms = 5;
  string reason = 6;              // denial reason when granted == false
}
```

- Claims MUST be idempotent by `claim_id`.
- Grants expire; renewals MUST be re-negotiated.
- Denials include a machine-readable `reason`.

## 15.3 Telemetry Sample

```protobuf
message TelemetrySample {
  string node_id = 1;
  uint64 sampled_at_ms = 2;
  float cpu_load = 3;             // 0.0 to 1.0
  float battery_level = 4;        // 0.0 to 1.0
  int32 rssi_dbm = 5;
  uint32 packet_loss_percent = 6; // 0 to 100
  uint32 uptime_seconds = 7;
  repeated string active_capabilities = 8;
}
```

## 15.4 Health Events

```protobuf
enum HealthEventType {
  HEALTH_UNKNOWN = 0;
  HEALTH_NODE_OFFLINE = 1;
  HEALTH_NODE_DEGRADED = 2;
  HEALTH_FUSION_BROKEN = 3;
  HEALTH_RESOURCE_EXHAUSTED = 4;
}

message HealthEvent {
  string event_id = 1;
  HealthEventType event_type = 2;
  string node_id = 3;
  uint64 occurred_at_ms = 4;
  string detail = 5;
}
```

## 15.5 Telemetry Rules

- Telemetry MAY be sampled and downsampled to fit low-bandwidth links.
- Health events MUST be emitted on offline, degraded, and fusion-break conditions.
- Consumers MUST NOT block on telemetry; it is best-effort.

## 15.6 Conformance

A conformant implementation MUST support idempotent resource claims, expiring grants, and standardized health event emission.
