# Chapter 9: Communication Interfaces

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

This chapter specifies how modules connect to the ecosystem at the transport level. Packet formats and protocols are in Volume VIII; here we define supported transports and adapter requirements.

## 9.1 Supported Transports

| Transport | Use |
|-----------|-----|
| Bluetooth Low Energy | Low-latency input streaming, near-body links |
| Wi-Fi / Wi-Fi Direct | High-bandwidth links to laptops/routers |
| UWB | Millimeter-level spatial positioning |
| USB-C | Wired high-speed data, charging, docking |
| NFC | Short-range pairing, payment, secure exchange |
| Thread | Smart-home mesh integration |
| Ethernet | Ambient nodes (docks, hubs) |
| Cellular | Cloud connectivity (via Comms beads or tethered) |

The DMWE protocol is **transport-agnostic**; adapters describe how each transport maps DMWE semantics onto its capabilities (Volume VIII, Chapter 15).

## 9.2 Transport Abstraction

- Modules communicate logically through the DMWE Session/Transport layers regardless of physical radio.
- Behavior (delivery, ordering, QoS) MUST be consistent across transports.
- Transport selection is a scheduling/routing decision, not an application concern.

## 9.3 Connection Establishment

- Modules MUST support secure connection establishment (mutual authentication).
- Connection setup follows the Module Discovery Protocol lifecycle (Volume VIII, Chapter 3).
- Reconnection MUST be automatic with bounded timeout.

## 9.4 Link Quality Reporting

Modules MUST report:

- Signal strength / link quality.
- Data rate / throughput.
- Latency.
- Error rates.

This data feeds routing and QoS decisions (Volume VIII, Chapter 12).

## 9.5 Bandwidth Negotiation

- Modules negotiate bandwidth needs with the mesh.
- High-bandwidth streams (vision, audio) reserve capacity.
- Under contention, QoS classes prioritize (Volume II, Chapter 12).

## 9.6 Latency Classes

Modules MUST declare their latency class per stream. The following budgets are **end-to-end** (sensor capture → application delivery) and are normative for conformant implementations.

### 9.6.1 Interaction Latency Classes

| Class | End-to-End Budget | Use Cases |
|-------|-------------------|-----------|
| **Critical Real-time** | ≤ 5 ms | AR pointer tracking, haptic feedback loops, safety-critical actuation |
| **Interactive** | ≤ 10 ms | Pointer movement, selection, gesture recognition, scroll, zoom |
| **Responsive** | ≤ 20 ms | Voice command initiation, text input, navigation, media control |
| **Conversational** | ≤ 50 ms | Speech recognition, dictation, audio streaming, voice synthesis |
| **Perceptual** | ≤ 150 ms | Video feed processing, spatial mapping, environmental scanning |
| **Background** | ≤ 2000 ms | AI inference, context fusion, cloud sync, analytics |
| **Deferred** | best-effort | Firmware updates, telemetry batch uploads, diagnostics |

### 9.6.2 End-to-End Latency Breakdown

The total latency budget is consumed across the pipeline:

```
Sensor Capture → Driver Processing → Intent Recognition → Context Association → Protocol Transmission → Application Delivery
```

| Stage | Critical Real-time | Interactive | Responsive | Conversational |
|-------|-------------------|-------------|------------|----------------|
| Sensor capture | ≤ 1 ms | ≤ 2 ms | ≤ 3 ms | ≤ 5 ms |
| Driver processing | ≤ 0.5 ms | ≤ 1 ms | ≤ 2 ms | ≤ 5 ms |
| Intent recognition | ≤ 1 ms | ≤ 2 ms | ≤ 5 ms | ≤ 15 ms |
| Context association | ≤ 0.5 ms | ≤ 1 ms | ≤ 2 ms | ≤ 5 ms |
| Protocol transmission | ≤ 1 ms | ≤ 2 ms | ≤ 3 ms | ≤ 10 ms |
| Application delivery | ≤ 1 ms | ≤ 2 ms | ≤ 5 ms | ≤ 10 ms |
| **Total** | **≤ 5 ms** | **≤ 10 ms** | **≤ 20 ms** | **≤ 50 ms** |

### 9.6.3 Per-Capability Latency Requirements

| Capability | Minimum Class | Maximum Latency | Rationale |
|------------|---------------|-----------------|-----------|
| Pointer (precision) | Critical Real-time | 5 ms | Motion-to-photon for AR; judder threshold |
| Pointer (basic) | Interactive | 10 ms | Cursor tracking; perceptible lag boundary |
| Selection | Interactive | 10 ms | Click confirmation; user expectation |
| Scroll | Interactive | 10 ms | Smooth scrolling; 60 fps equivalent |
| Zoom | Interactive | 10 ms | Pinch-to-zoom responsiveness |
| Rotation | Interactive | 10 ms | 3D manipulation fluidity |
| Drawing | Interactive | 10 ms | Stroke fidelity; pressure sensitivity |
| Gesture (macro) | Responsive | 20 ms | Nod, shake, fist — deliberate actions |
| Voice command | Conversational | 50 ms | Natural speech cadence |
| Dictation | Conversational | 50 ms | Real-time transcription |
| Audio output | Conversational | 50 ms | Echo cancellation window |
| Haptic feedback | Critical Real-time | 5 ms | Tactile synchronization with visual |
| Projection rendering | Interactive | 10 ms | Spatial overlay alignment |
| Eye tracking | Interactive | 10 ms | Gaze-contingent rendering |
| EMG recognition | Interactive | 10 ms | Muscle signal classification |
| Object recognition | Perceptual | 150 ms | Vision pipeline acceptable latency |
| Spatial mapping (SLAM) | Perceptual | 150 ms | Environmental reconstruction |
| AI inference (local) | Background | 500 ms | On-device model execution |
| AI inference (cloud) | Background | 2000 ms | Network round-trip included |
| Context fusion | Background | 1000 ms | Multi-source aggregation |

### 9.6.4 Transport-Specific Latency Overheads

| Transport | Typical Latency | Max Achievable | Notes |
|-----------|-----------------|----------------|-------|
| E-thread (wired chassis) | 0.1–0.5 ms | 1 ms | Hardwired; lowest latency |
| BLE 5.x | 2–7.5 ms | 15 ms | Connection interval dependent |
| UWB | 0.3–1 ms | 3 ms | Ranging + data; best for spatial |
| Wi-Fi 6 | 1–5 ms | 10 ms | Higher bandwidth variant |
| USB 2.0 HS | 0.1–1 ms | 2 ms | Wired; dock/chassis scenarios |
| Thread/Matter | 10–50 ms | 100 ms | Smart-home mesh; higher hop count |
| Cellular (5G) | 5–20 ms | 100 ms | Cloud offload path |

### 9.6.5 Fast-Path Override

For **Critical Real-time** class interactions (AR pointer, haptic loops), the Fast-Path Binding (Volume XI, Ch 13) bypasses the semantic intent pipeline after initial handshake. Fast-Path packets MUST arrive within **1 ms** of sensor capture at the consumer render loop.

### 9.6.6 Latency Degradation Rules

- If a capability cannot meet its declared latency class, the Capability Manager MUST:
  1. Attempt migration to a faster provider (Volume IV, Ch 6).
  2. If no provider meets budget, downgrade to the next feasible class and notify the application.
  3. If the capability is safety-critical, enter degraded mode with explicit user notification.
- Applications MUST handle latency class changes gracefully (Volume IX, Ch 6).

## 9.7 Multi-Link Operation

- Modules MAY use multiple transports simultaneously (e.g., UWB for positioning + BLE for input).
- Failover between links MUST be automatic.
- Link aggregation is allowed where beneficial.

## 9.8 Failover Strategies

- When the primary link degrades, traffic migrates to an alternate link.
- Failover MUST be transparent to applications.
- Radio coexistence and interference mitigation guidance is in Volume III-A.

## 9.9 Body-Worn Considerations

Body-worn RF has unique constraints (Volume III-A):

- Antenna placement near body.
- RF isolation and SAR compliance.
- Multi-radio scheduling and coexistence.
- Sweat/water ingress protection.

## 9.10 Conformance

A conformant communication implementation MUST:

1. Support at least one DMWE-compliant transport.
2. Implement secure connection establishment.
3. Report link quality and latency.
4. Support failover and multi-link where applicable.
5. Adhere to the DMWE protocol layer (Volume VIII).
