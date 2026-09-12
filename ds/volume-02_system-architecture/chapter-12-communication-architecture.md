# Chapter 12: Communication Architecture

**Volume II — System Architecture · Working Draft v0.1**

This chapter defines how subsystems and modules communicate. Packet formats are specified in Volume VIII; this chapter defines communication behavior and patterns.

## 12.1 Communication Layers

The Mesh OS provides communication between:

- **Internal subsystems** (within a node) — via internal APIs.
- **Modules** (across nodes) — via the mesh protocol.
- **Services** — via service discovery and binding.
- **Applications** — via the Interaction Runtime.

## 12.2 Communication Patterns

The architecture supports:

| Pattern | Use |
|---------|-----|
| Request/Response | Service calls, capability requests |
| Publish/Subscribe | Intent delivery, context changes, capability updates |
| Streaming | High-rate sensor data, audio, video |
| Broadcast | Discovery, presence |
| Sync | State synchronization, clock sync |
| Unicast | Point-to-point messages |

## 12.3 Message Characteristics

The communication manager MUST handle:

- **Routing** — deliver messages to the right nodes (Chapter 8 schedules placement; here we route).
- **Serialization** — compact, version-tolerant encoding (Volume VIII, Chapter 6).
- **Priorities** — real-time interaction > audio > video > AI > background > diagnostics.
- **Reliability** — acknowledged delivery where required; fire-and-forget where latency wins.
- **Retries** — bounded retransmission with backoff.
- **Ordering** — sequence guarantees for state-changing messages.
- **Timeouts** — bounded request lifetimes.
- **QoS classes** — mapped to transport capabilities.

## 12.4 QoS Classes

| Class | Latency budget | Example |
|-------|----------------|---------|
| Real-time interaction | < 10–20 ms | Pointer, click |
| Audio | < 50 ms | Voice, media |
| Video | < 150 ms | Camera stream |
| AI inference | 100 ms–2 s | Object recognition |
| Background sync | seconds–minutes | Calendar, state |
| Diagnostics | low priority | Telemetry |
| Bulk transfer | best effort | Firmware, backup |

## 12.5 Discovery

- **Service discovery** — modules and services advertise presence.
- **Module Discovery Protocol (MDP)** — lifecycle from advertisement to ready (Volume VIII, Chapter 3).
- Discovery scopes: local chassis, near-body, room, network.

## 12.6 Synchronization

- **Time synchronization** — global time with drift correction, essential for sensor fusion (Volume VIII, Chapter 11).
- **State synchronization** — shared/replicated state consistency (Chapter 5 §5.7).
- **Context synchronization** — context propagated across trusted nodes (Volume VIII, Chapter 9).

## 12.7 Transport Abstraction

The DMWE protocol sits **above** physical transports:

```
MeshOS Services -> DMWE Session -> DMWE Transport -> Transport Adapters
  -> BLE / Wi-Fi / UWB / USB / Thread / Ethernet
```

Identical behavior regardless of underlying radio. Transport adapters define capability and constraint mappings (Volume VIII, Chapter 15).

## 12.8 Security

All mesh communication MUST be:

- **Authenticated** — mutual authentication between nodes.
- **Encrypted** — session keys with forward secrecy (Volume VIII, Chapter 13).
- **Integrity-protected** — tamper-evident.
- **Replay-resistant** — sequence numbers, freshness.

## 12.9 Failure Handling

Communication must survive:

- Packet loss and link degradation.
- Node disappearance (timeout and re-route).
- Out-of-order delivery.
- Partitioned meshes (temporary divergence, later reconciliation).

Recovery: retransmission, alternate routing, state reconciliation, graceful degradation (Chapter 14).

## 12.10 Summary

| Concern | Where specified |
|---------|-----------------|
| Patterns | This chapter |
| Packet formats | Volume VIII, Ch 5 |
| Serialization | Volume VIII, Ch 6 |
| Discovery protocols | Volume VIII, Ch 3 |
| Sessions | Volume VIII, Ch 4 |
| Time sync | Volume VIII, Ch 11 |
| Security protocols | Volume VIII, Ch 13 |
| Transport adapters | Volume VIII, Ch 15 |
