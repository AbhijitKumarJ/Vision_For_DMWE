# Chapter 8: Interaction Event Protocol (IEP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 8.1 Purpose

Defines transmission of semantic interaction events.

## 8.2 Event Flow

```text
Interaction Object
    ↓
Serialization
    ↓
Transmission
    ↓
Validation
    ↓
Context Association
    ↓
Delivery
```

## 8.3 Interaction Objects

- Events carry Interaction Objects (Volume VI, Ch 6).
- Events include confidence, context references, and timestamps.
- Events carry semantic meaning, not raw sensor data (where possible).

## 8.4 Event Fields

| Field | Purpose |
|-------|---------|
| Interaction Object ID | Referenced object |
| Verb / Modifier / Target | Interaction grammar (Volume VI, Ch 2) |
| Confidence | Recognition certainty |
| Context Reference | Associated context (Volume VII) |
| Timestamp | Mesh-synchronized time |
| Priority | Interaction priority (Volume VI, Ch 2) |
| Session ID | Originating session |

## 8.5 Serialization

- Events use the canonical serialization (Chapter 6).
- Compact mode for constrained channels.
- JSON mode for tooling/debug.

## 8.6 Transmission

- Events traverse the mesh per QoS (Chapter 12).
- Real-time interaction events use the lowest-latency class.
- Events MAY be routed by semantic address.

## 8.7 Validation

- Receivers validate structure and integrity.
- Invalid events are discarded with telemetry.
- Repeated invalid events trigger sender quarantine.

## 8.8 Context Association

- Events bind to current context (Volume VII).
- Context references resolve in the Context Graph.
- Unresolved references degrade event confidence.

## 8.9 Delivery

- Delivered to subscribers (Volume VI, Ch 15).
- Multi-module delivery uses fan-out (Volume IV, Ch 8).
- Delivery is confirmed per QoS requirements.

## 8.10 Conformance

A conformant IEP MUST carry semantic objects, preserve confidence/context, validate, and deliver per QoS.
