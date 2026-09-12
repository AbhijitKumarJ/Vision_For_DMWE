# Chapter 22: Reference Runtime Architectures

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

Example deployments showing how MeshOS organizes real configurations. Each includes service placement, capability maps, scheduling decisions, and expected performance.

## 22.1 Personal Mesh

```
Ring
  ↓
Phone
```

| Aspect | Configuration |
|--------|---------------|
| Nodes | Ring (pointer/gesture/haptics), Phone (compute/network/apps) |
| Primary | Phone |
| Services | Pointer, Gesture, Auth, AI, Storage on Phone |
| Scheduling | Gesture on Ring; LLM and apps on Phone |
| Latency | Interaction < 20 ms (local pairing) |
| Battery | Ring day-long; Phone standard |

## 22.2 Mobile Workspace

```
Ring → Necklace → Laptop → Cloud
```

| Aspect | Configuration |
|--------|---------------|
| Nodes | Ring (pointer), Necklace (projector/mic/AI), Laptop (IBN), Cloud |
| Primary | Laptop |
| Scheduling | Gesture on Ring; projection/voice on Necklace; heavy AI on Laptop/Cloud |
| Latency | Interaction < 20 ms; video < 150 ms |
| Trust | Private on ring/necklace; cloud for public tasks |

## 22.3 AR Workspace

```
Ring → Glasses → Desk Hub → Projector → AI Server
```

| Aspect | Configuration |
|--------|---------------|
| Nodes | Ring (pointer), Glasses (vision/display), Desk Hub (gateway/power), Projector, AI Server |
| Primary | Desk Hub |
| Scheduling | Vision on Glasses; spatial on Projector; heavy AI on AI Server |
| Latency | Eye-tracked pointer < 30 ms; AR overlay < 50 ms |
| Fusion | Ring + Eye Tracking → Precision Pointer |

## 22.4 Industrial Mesh

```
Helmet → EMG Band → Tablet → Edge Server
```

| Aspect | Configuration |
|--------|---------------|
| Nodes | Helmet (vision/safety), EMG Band (gesture), Tablet (control), Edge Server (AI) |
| Primary | Edge Server |
| Scheduling | EMG gesture on band; object recognition on Edge Server |
| Latency | Safety alerts < 100 ms |
| Trust | Strict; safety-critical data stays on-site |

## 22.5 Common Properties

All reference architectures MUST:

- Elect a Primary deterministically.
- Serve capabilities from any node.
- Migrate tasks on node loss.
- Meet per-class latency budgets.
- Respect trust domains.

## 22.6 Conformance

A reference runtime architecture MUST document placement, capability map, scheduling policy, and expected performance as shown above.
