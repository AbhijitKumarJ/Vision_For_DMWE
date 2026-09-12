# Chapter 12: Routing & QoS

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 12.1 Purpose

Defines how messages travel through the mesh and what delivery guarantees they receive.

## 12.2 Routing Policies

- Lowest latency.
- Lowest power.
- Highest reliability.
- Most secure.
- Closest provider.

## 12.3 Route Selection

- Routes are selected per message/QoS.
- Policy depends on the request (Volume IV, Ch 11).
- Route state is maintained and repaired (Chapter 14).

## 12.4 Routing Table Updates

- Tables update on mesh membership change.
- Updates are event-driven, not periodic.
- Stale routes are invalidated quickly.

## 12.5 Multi-Hop Routing

- Messages route through intermediate modules.
- Hop count is minimized within policy.
- Loops are prevented (sequence numbers).

## 12.6 QoS Classes

| Class | Use |
|-------|-----|
| Real-time interaction | Interaction events, low latency |
| Audio | Voice and sound streaming |
| Video | Vision and projection |
| AI inference | Model serving/offload |
| Background sync | Context/state synchronization |
| Diagnostics | Health and telemetry |
| Bulk transfer | Firmware, large files |

## 12.7 QoS Guarantees

| Attribute | Guarantee |
|-----------|-----------|
| Latency | Class-specific bound |
| Reliability | Class-specific retransmission |
| Ordering | Per-session order guarantee |
| Bandwidth | Class-aware prioritization |

## 12.8 QoS Admission

- High-priority classes reserve capacity.
- Overloaded meshes degrade lower classes first.
- Real-time interaction MUST NOT be starved.

## 12.9 Semantic Routing

- Messages MAY route by Capability ID or Interaction Object.
- Semantic resolution finds providers (Volume V, Ch 13).
- Routing is the execution of Protocol Graph edges.

## 12.10 Conformance

A conformant implementation MUST support the routing policies, QoS classes, and QoS guarantees.
