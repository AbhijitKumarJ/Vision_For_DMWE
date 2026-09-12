# Chapter 9: Context Manager

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

The Context Manager maintains a **continuously updated understanding of the user** and their environment, shared across the mesh.

## 9.1 Context Sources

| Source | Examples |
|--------|----------|
| Activity | Walking, running, sitting, driving |
| Environment | Light, temperature, noise, air quality |
| Location | Home, office, vehicle, gym |
| Body Pose | Posture, limb position, gaze |
| Nearby Devices | Screen, speakers, hubs, IoT |
| Applications | Current foreground app/task |
| Calendar | Meetings, availability |
| IoT | Lights, climate, locks |
| Attention | Focus level, glance direction |
| Privacy Level | Current trust/privacy posture |

## 9.2 Context Model

- Context is represented as a **Context Graph** (Volume II, Chapter 4).
- Each node contributes local context observations.
- The manager aggregates, fuses, and propagates context.

## 9.3 Aggregation

- Raw observations → normalized context facts.
- Facts are timestamped and confidence-weighted.
- Conflicting observations MUST be resolved deterministically.

## 9.4 Propagation

- Context flows to consumers (applications, scheduler, intent runtime).
- Propagation MUST be subscription-based, not polling.
- Stale context MUST be expired.

## 9.5 Context as a Resource

- Context is a first-class resource used by:
  - Scheduler (task placement by activity).
  - Intent runtime (disambiguation).
  - AI (behavior prediction).
  - Applications (adaptive UI).

## 9.6 Privacy

- Context data is sensitive.
- Aggregation MUST respect trust domains (Chapter 14).
- Raw context MUST NOT be shared outside authorized consumers.
- Users MUST be able to control context visibility (Volume X).

## 9.7 Prediction

- The manager MAY predict likely context transitions.
- Predictions feed proactive scheduling and interaction.

## 9.8 Conformance

A conformant Context Manager MUST:

1. Aggregate and fuse context from multiple sources.
2. Propagate context by subscription with expiry.
3. Resolve conflicts deterministically.
4. Enforce context privacy policy.
5. Support prediction without violating privacy.
