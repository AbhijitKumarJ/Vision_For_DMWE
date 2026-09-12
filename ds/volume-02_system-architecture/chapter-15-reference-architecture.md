# Chapter 15: Reference Architecture

**Volume II — System Architecture · Working Draft v0.1**

This chapter presents complete example deployments showing how the architecture assembles into real configurations. Each example includes the module set, capability map, and representative data flow.

## 15.1 Minimal Configuration

**Use case:** basic pointing and selection with a phone as IBN.

```
Ring -> Phone
```

- **Modules:** Smart Ring (IMU + touch + secure element), Phone (IBN).
- **Capabilities:** Pointer (ring), Selection (ring tap), Authentication (ring secure element).
- **Compute placement:** gesture recognition on ring; app logic on phone.
- **Data flow:** ring sensor -> ring local recognition -> Intent Packet -> BLE -> phone -> application.

## 15.2 Mobile Productivity

**Use case:** 3D mouse + air keyboard for a laptop.

```
Ring -> Necklace -> Phone -> Laptop
```

- **Modules:** Ring, Necklace (compute + UWB + battery), Phone, Laptop (IBN).
- **Capabilities:** Precision Pointer (ring IMU + necklace UWB anchor), Text Input (air typing), Scalar (thumb slide).
- **Compute placement:** fusion on necklace; intent classification on necklace; heavy processing on laptop.
- **Data flow:** ring micro-twitch -> UWB position (necklace) -> fused pointer vector -> laptop mapper plugin -> OS cursor.

## 15.3 AR Workspace

**Use case:** spatial computing with projection.

```
Ring -> Glasses -> Necklace -> Desk Hub -> Cloud
```

- **Modules:** Ring, Glasses (display + eye tracking), Necklace (compute + projector), Desk Hub (ambient IBN), Cloud.
- **Capabilities:** Precision Pointer, Spatial Workspace (camera+projector+SLAM), Gaze.
- **Compute placement:** SLAM on desk hub; projection rendering on necklace; heavy AI on cloud.
- **Data flow:** gaze + ring vector fused -> target selected -> projector renders -> desk hub SLAM anchors.

## 15.4 Industrial Worker

**Use case:** hands-free task guidance in a factory.

```
Helmet -> EMG Band -> Projector -> Tablet -> Factory Edge Server
```

- **Modules:** Helmet (camera + display), EMG Band (gesture), Projector, Tablet, Factory Edge Server.
- **Capabilities:** Object Recognition (camera + edge AI), Gesture (EMG), Projection, Haptic.
- **Compute placement:** EMG recognition local; object recognition on factory edge (privacy: local network only).
- **Data flow:** camera frame -> edge server recognition -> instruction overlaid via helmet/projector -> EMG gesture confirms step.

## 15.5 Health Monitoring (Illustrative)

**Use case:** continuous rehabilitation coaching.

- **Modules:** sensor beads (motion + biometric), phone IBN, cloud digital twin.
- **Capabilities:** Motion Tracking, Biometric, Haptic Guidance.
- **Data flow:** motion sensors -> local fusion -> session context -> haptic corrections; summaries sync to cloud twin.

## 15.6 Multi-User Collaboration (Illustrative)

**Use case:** shared spatial workspace.

- **Modules:** two users' meshes + shared room anchors.
- **Capabilities:** Spatial Manipulation, Collaboration (shared mesh).
- **Data flow:** user A gesture -> shared spatial map -> both meshes render -> merged interaction state.

## 15.7 Architecture Best Practices Illustrated

These configurations demonstrate:

- **Capability reuse** — the same `Pointer` capability across very different hardware.
- **Transparent scheduling** — the app never sees where compute runs.
- **Graceful degradation** — removing the glasses in the AR workspace falls back to audio-only UI.
- **Privacy placement** — industrial vision stays on the local edge network.

Each deployment is accompanied by diagrams, capability maps, and data flows maintained in the Reference Architecture Repository (Volume X).

## 15.8 Performance Targets

Every conformant deployment MUST meet or exceed the following performance targets. These are measured end-to-end under normal operating conditions.

### 15.8.1 System-Wide Targets

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Mesh formation time (cold start) | ≤ 5 s | Power-on → operational state |
| Mesh formation time (warm join) | ≤ 2 s | New node authenticated → capabilities registered |
| Primary Node election time | ≤ 2 s | Trigger → CLAIM broadcast + ACK |
| Failover time (capability migration) | ≤ 5 s | Provider loss → alternate provider active |
| State synchronization latency | ≤ 10 s | State change → all replicas consistent |
| Topology convergence | ≤ 5 s | Node join/leave → routing tables updated |

### 15.8.2 Per-Deployment Targets

**Minimal Configuration (Ring → Phone):**

| Metric | Target |
|--------|--------|
| Pointer latency (end-to-end) | ≤ 10 ms |
| Selection latency | ≤ 10 ms |
| Battery life (ring, active use) | ≥ 8 hours |
| Battery life (ring, standby) | ≥ 72 hours |
| BLE throughput | ≥ 1 Mbps sustained |

**Mobile Productivity (Ring → Necklace → Phone → Laptop):**

| Metric | Target |
|--------|--------|
| Precision pointer latency | ≤ 5 ms |
| UWB positioning accuracy | ≤ 2 cm |
| Text input throughput | ≥ 40 WPM achievable |
| System latency (touch to screen) | ≤ 15 ms |
| Battery life (necklace, active) | ≥ 6 hours |

**AR Workspace (Ring → Glasses → Necklace → Desk Hub → Cloud):**

| Metric | Target |
|--------|--------|
| Motion-to-photon latency | ≤ 20 ms |
| SLAM update rate | ≥ 30 Hz |
| Spatial mapping accuracy | ≤ 5 mm |
| Projection alignment error | ≤ 1 pixel |
| Cloud AI inference latency | ≤ 200 ms |

**Industrial Worker (Helmet → EMG → Projector → Tablet → Edge):**

| Metric | Target |
|--------|--------|
| Object recognition latency | ≤ 150 ms |
| EMG classification accuracy | ≥ 95% |
| Projection overlay latency | ≤ 50 ms |
| Edge server response time | ≤ 100 ms |
| EMG-to-feedback loop | ≤ 30 ms |

**Health Monitoring (Sensor Beads → Phone → Cloud):**

| Metric | Target |
|--------|--------|
| Motion capture rate | ≥ 100 Hz |
| Biometric sampling rate | ≥ 50 Hz |
| Haptic feedback latency | ≤ 10 ms |
| Data sync to cloud | ≤ 30 s |
| Battery life (sensors) | ≥ 24 hours |

**Multi-User Collaboration (Two Meshes + Room Anchors):**

| Metric | Target |
|--------|--------|
| Cross-mesh latency | ≤ 50 ms |
| Shared spatial map sync | ≤ 1 s |
| Conflict resolution time | ≤ 2 s |
| Max concurrent users | ≥ 4 |
| Shared workspace update rate | ≥ 15 Hz |

### 15.8.3 Scalability Limits

| Parameter | Minimum | Recommended Maximum |
|-----------|---------|---------------------|
| Nodes per mesh | 2 | 20 |
| Capabilities per mesh | 5 | 500 |
| Concurrent interactions | 1 | 100 |
| Concurrent Fast-Path streams | 0 | 10 |
| State objects in registry | 1 | 10,000 |
| Context facts | 1 | 50,000 |
| Routing table entries | 1 | 200 |

Deployments exceeding recommended maximums MUST demonstrate performance validation through conformance testing (Chapter 23).
