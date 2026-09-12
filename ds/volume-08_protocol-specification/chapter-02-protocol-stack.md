# Chapter 2: Protocol Stack

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 2.1 Stack Overview

```text
Applications
        │
Capability Services
        │
Interaction Runtime
        │
MeshOS Services
        │
DMWE Session Layer
        │
DMWE Transport Layer
        │
Transport Adapters
        │
BLE / Wi-Fi / UWB / USB / Thread / Ethernet
```

## 2.2 Layers

| Layer | Responsibility |
|-------|----------------|
| Transport Layer | Physical communication abstraction |
| Session Layer | Connection lifecycle |
| Discovery Layer | Finding modules and services |
| Messaging Layer | Reliable information exchange |
| Capability Layer | Capability advertisements |
| Interaction Layer | Semantic interaction events |
| Management Layer | Diagnostics and administration |

## 2.3 Transport Layer

- Abstracts physical communication.
- Provides framing, segmentation, reassembly.
- Exposes a uniform interface to upper layers.
- Adapters define transport mappings (Chapter 15).

## 2.4 Session Layer

- Manages connection lifecycle (Chapter 4).
- Maintains session state and identifiers.
- Handles keep-alive, timeout, reconnection.

## 2.5 Discovery Layer

- Finds modules and services (Chapter 3).
- Supports broadcast and directed discovery.
- Tracks dynamic mesh membership.

## 2.6 Messaging Layer

- Encodes/decodes messages (Chapters 5, 6).
- Provides delivery semantics per QoS (Chapter 12).
- Handles ordering and deduplication.

## 2.7 Capability Layer

- Advertises and updates capabilities (Chapter 7).
- Feeds the Capability Registry (Volume V).
- Supports version negotiation.

## 2.8 Interaction Layer

- Carries semantic interaction events (Chapter 8).
- Preserves Interaction Object semantics (Volume VI).
- Associates context with events.

## 2.9 Management Layer

- Carries diagnostics and telemetry (Chapter 16).
- Supports administration and configuration.
- Reports health and status.

## 2.10 Layer Interfaces

- Every layer defines clear upward/downward interfaces.
- Layers are independently implementable.
- State transitions are specified per layer.
- A conformant stack MUST implement all layers with the defined interfaces.
