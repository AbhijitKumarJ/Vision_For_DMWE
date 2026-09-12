# Chapter 8: Distributed Scheduling

**Volume II — System Architecture · Working Draft v0.1**

This chapter defines how workloads move through the ecosystem. Full specification: Volume IV, Chapter 8.

## 8.1 The Scheduling Problem

Every task must run somewhere in the compute continuum:

```
Ring -> Necklace -> Phone -> Laptop -> Cloud
```

The scheduler decides where, considering latency, battery, thermals, privacy, available AI hardware, network quality, trust level, and context.

## 8.2 Example Placements

| Task | Runs on | Reason |
|------|---------|--------|
| Finger-click detection | Ring (local) | Latency |
| Gesture recognition | Necklace | Balanced compute |
| Intent classification | Necklace/Phone | ML model size |
| LLM inference | Cloud | Model size |
| Face recognition | Local/Phone | Privacy |
| Cloud backup | Cloud | Storage + bandwidth |
| Vision processing | Necklace/Phone | NPU availability |

## 8.3 Scheduling Inputs

The scheduler MUST consider:

1. **Latency** — interaction-critical tasks stay near the sensor.
2. **Battery** — avoid draining critical modules.
3. **Thermals** — respect module thermal limits (Volume III-A).
4. **Privacy** — sensitive data stays in trusted domains.
5. **Available compute** — accelerators (NPU/GPU) where available.
6. **Network quality** — bandwidth, latency, link state.
7. **Trust level** — restrict what crosses trust boundaries.
8. **Context** — e.g., high-motion activity reduces fine-compute priority.
9. **Cost** — energy + bandwidth + cloud cost.

## 8.4 Task Migration

The scheduler MUST support **task migration during execution**:

- If a ring's battery dies mid-task, processing migrates to another node.
- If a phone leaves range, compute migrates to the necklace.
- Migration MUST be transparent to the application.

Checkpointing and state handoff are defined in Volume IV (Chapters 12, 16).

## 8.5 Scheduling and Capabilities

Scheduling is driven by the Capability Graph (Chapter 6):

- A task needing `Pointer` is placed near the best Pointer provider.
- Capability fusion composes providers; the scheduler places the composite.
- QoC (quality-of-capability) informs provider selection.

## 8.6 Scheduling Policies

Policy templates include:

- **Nearest** — place closest to data source (lowest latency).
- **Fastest** — place on fastest available compute.
- **Most secure** — prefer trusted local execution.
- **Lowest power** — place on energy-rich nodes.
- **Highest quality** — prefer best QoC providers.

Policies MAY be combined with priorities.

## 8.7 Energy-Aware Scheduling

Scheduling and power management cooperate:

- Predict battery drain (Volume VII Prediction Engine).
- Reserve energy for critical capabilities.
- Degrade gracefully: reduce fidelity before losing function.

## 8.8 Summary

Distributed scheduling is what makes the mesh feel like one computer. It MUST be automatic, transparent, context-aware, energy-aware, and failure-tolerant.
