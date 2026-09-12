# Chapter 8: Distributed Scheduler

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

The Distributed Scheduler decides **where tasks execute** across the mesh. This is one of MeshOS's defining capabilities.

## 8.1 Scheduling Inputs

Placement decisions consider:

- **Latency** — task end-to-end latency budget.
- **Battery** — remaining energy and draw impact.
- **Thermals** — thermal state of candidate nodes.
- **AI hardware** — availability of NPU/GPU for inference tasks.
- **Network quality** — link quality to consumers.
- **Trust level** — node trust classification for sensitive tasks.
- **Context** — user activity, location, focus.
- **Cost** — energy/compute cost of execution.

## 8.2 Scheduling Policy

### 8.2.1 Priority Classes

| Priority | Class | Examples | Preemption |
|----------|-------|----------|------------|
| P0 | Safety-critical | Emergency alerts, medical monitoring | Preempts all |
| P1 | Critical real-time | AR pointer, haptic feedback | Preempts P2–P5 |
| P2 | Interactive | Selection, scroll, gesture | Preempts P3–P5 |
| P3 | Responsive | Voice command, text input | Preempts P4–P5 |
| P4 | Conversational | Dictation, audio streaming | Preempts P5 |
| P5 | Background | AI inference, telemetry, sync | No preemption |

### 8.2.2 Scheduling Algorithm

The distributed scheduler uses a **deadline-aware, energy-constrained priority queue**:

```
SCHEDULE(task):
  1. CLASSIFY task by priority class (§8.2.1)
  2. CHECK energy budget (Chapter 13)
     - If energy insufficient for task class → DEFER or REJECT
  3. ENUMERATE eligible nodes
     - Filter: trust level ≥ task requirement
     - Filter: capability available
     - Filter: thermal headroom > task requirement
     - Filter: memory available > task requirement
  4. SCORE each eligible node
     score = (latency_fit × 0.35) +
             (energy_cost × 0.25) +
             (thermal_headroom × 0.15) +
             (connectivity_quality × 0.15) +
             (trust_level × 0.10)
  5. SELECT node with highest score
  6. DISPATCH task to selected node
  7. MONITOR execution
     - If deadline approaching (< 50% remaining time) → MIGRATE to faster node
     - If energy critical → PREEMPT and defer
  8. COMPLETE → release resources; update telemetry
```

### 8.2.3 Score Components

| Component | Calculation | Range |
|-----------|-------------|-------|
| `latency_fit` | 1.0 - (estimated_latency / task_deadline) | 0.0–1.0 (1.0 = well within budget) |
| `energy_cost` | 1.0 - (task_energy / node_remaining_energy) | 0.0–1.0 (1.0 = negligible cost) |
| `thermal_headroom` | 1.0 - (current_temp / max_temp) | 0.0–1.0 (1.0 = cool) |
| `connectivity_quality` | link_quality_to_consumer / max_link_quality | 0.0–1.0 |
| `trust_level` | node_trust_score / max_trust_score | 0.0–1.0 |

### 8.2.4 Fairness Rules

- No node may be assigned more than **3× the average task load** of the mesh.
- Background tasks are deferred when any node exceeds **80% utilization**.
- Each node MUST be idle for at least **10% of time** for thermal recovery.
- starvation detection: if a task waits > 2× its deadline, it is force-dispatched to the least-loaded eligible node.

## 8.3 Placement Examples

| Task | Placed On | Reason |
|------|-----------|--------|
| Gesture Recognition | Ring | Latency, sensor locality |
| LLM Inference | Phone | NPU, connectivity |
| Computer Vision | Necklace/Headband | Camera locality |
| Cloud Backup | Cloud | Storage, bandwidth |

## 8.4 Scheduling Hierarchy

- **Local scheduler** (Chapter 3) executes tasks on the node.
- **Distributed scheduler** places tasks across nodes.
- The Primary Node coordinates global placement.
- On Primary loss, placement falls back to decentralized negotiation.

## 8.5 Task Migration

- Tasks MAY migrate during execution.
- Migration triggers:
  - Provider battery depletion.
  - Thermal overload.
  - Node leaving.
  - Better quality provider available.
  - Trust change.
- Migration MUST be transparent to the user/application.
- Checkpointing enables resume (Chapter 12).

## 8.6 Deadline & QoS Enforcement

- The scheduler MUST track deadlines and QoS classes.
- Missed deadlines MUST trigger escalation (fallback, migration, user notice).

## 8.7 Energy-Aware Scheduling

- The scheduler MUST consult the Energy Budget (Chapter 13).
- Background work defers when energy is low.
- Critical capability energy is reserved.

## 8.8 Preemption

- Higher-priority tasks MAY preempt lower-priority work.
- Preemption MUST respect checkpoints so work is not lost.

## 8.9 Conformance

A conformant Distributed Scheduler MUST:

1. Consider all scheduling inputs.
2. Honor priority and deadline classes.
3. Place tasks on best-fit nodes.
4. Migrate tasks without disruption.
5. Enforce energy and thermal constraints.
