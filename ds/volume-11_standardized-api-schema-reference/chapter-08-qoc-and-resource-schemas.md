# Chapter 8: Quality of Capability & Resource Schemas

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 8.1 Purpose

Quality of Capability (QoC) and resource state enable the scheduler and negotiator to select and place providers objectively (Volume IV, Ch 7–8; Volume V, Ch 11).

## 8.2 QoC Reporting Contract

```protobuf
syntax = "proto3";
package dmwe.capability;

message QoCReport {
  string capability_id = 1;
  string provider_node_id = 2;
  uint64 measured_at_ms = 3;
  QualityOfCapability qoc = 4;
  // QualityOfCapability defined in Chapter 7.
}

message QoCSubscription {
  string consumer_node_id = 1;
  string capability_id = 2;
  uint32 report_interval_ms = 3;
}
```

- Reports MUST reflect measured, not claimed, values.
- p50/p95/p99 latency MUST be maintained as rolling statistics.
- QoC changes trigger `qualityChanged` events (Volume V, Ch 10).

## 8.3 Resource Advertisement

```protobuf
message ResourceAdvertisement {
  string resource_id = 1;          // e.g. "node.compute.npu"
  string provider_node_id = 2;
  oneof resource {
    ComputeCapacity compute = 3;
    BatteryState battery = 4;
    StorageCapacity storage = 5;
    BandwidthQuota bandwidth = 6;
  }
  uint32 reserved_units = 7;
  uint32 available_units = 8;
}

message StorageCapacity {
  uint64 total_bytes = 1;
  uint64 free_bytes = 2;
}

message BandwidthQuota {
  uint32 kbps = 1;
  uint32 reserved_kbps = 2;
}
```

## 8.4 Energy Profiles

| Profile | Guidance |
|---------|----------|
| LOW | Always-on body-worn modules; budget-aware scheduling |
| MEDIUM | Periodic high-cost operations |
| HIGH | Burst compute, display, projection |

Energy cost is per-operation or per-second draw and MUST be declared by the provider (Volume III, Ch 8).

## 8.5 Privacy Domains

- `PUBLIC` — no user data.
- `PERSONAL` — user identity attached.
- `PRIVATE` — sensitive user data.
- `RESTRICTED` — governed by policy (Volume X).

Consumers MUST respect the privacy class; private/restricted capabilities MUST run in trusted domains (Volume IV, Ch 14).

## 8.6 Reservation Semantics

- Reservations decrement `available_units` atomically.
- Expired reservations MUST be released.
- Conflicts resolve by priority (Volume V, Ch 7).

## 8.7 Conformance

A conformant implementation MUST publish accurate QoC reports, honor energy and privacy classifications, and manage reservations atomically.
