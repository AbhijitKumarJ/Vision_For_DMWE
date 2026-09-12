# Chapter 4: Mesh Formation

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

## 4.1 Formation Lifecycle

A mesh is created through a defined sequence:

```
Power On
   ↓
Discovery
   ↓
Authentication
   ↓
Capability Exchange
   ↓
Resource Exchange
   ↓
Synchronization
   ↓
Mesh Formation
   ↓
Operational State
```

| Phase | Responsibility |
|-------|----------------|
| Power On | Node boots, local runtime starts |
| Discovery | Nodes detect each other (Volume III, Ch 9) |
| Authentication | Mutual trust establishment (Chapter 14) |
| Capability Exchange | Capabilities registered (Chapter 6) |
| Resource Exchange | Resources pooled (Chapter 7) |
| Synchronization | State/time aligned (Volume VIII, Ch 11) |
| Mesh Formation | Primary election, topology finalized |
| Operational State | Normal operation |

## 4.2 Primary Node Election Protocol

The mesh MUST elect a **Primary Node** to coordinate global state. Election uses a **priority-based deterministic protocol** with no single point of failure.

### 4.2.1 Election Triggers

An election is triggered when:

1. **Initial mesh formation** — no Primary Node exists.
2. **Primary Node departure** — graceful leave or heartbeat timeout (>3 missed intervals).
3. **Primary Node degradation** — Health Manager reports Primary Node health below minimum threshold.
4. **Partition recovery** — two partitions each have a Primary; must reconcile to one.
5. **Scheduled rotation** — optional periodic rotation to distribute energy cost (default: every 4 hours).

### 4.2.2 Node Fitness Score

Each node computes a **fitness score** (0–1000) used for election ranking:

```
fitness = (battery_score × 0.25) + (compute_score × 0.20) + (connectivity_score × 0.20) + (trust_score × 0.20) + (stability_score × 0.15)
```

| Component | Range | Calculation |
|-----------|-------|-------------|
| `battery_score` | 0–1000 | 1000 × (remaining_percent / 100); 0 if below critical threshold |
| `compute_score` | 0–1000 | Based on available CPU, memory, and thermal headroom |
| `connectivity_score` | 0–1000 | Sum of active link quality scores across all transports |
| `trust_score` | 0–1000 | Derived from authentication level and tenure (Volume X) |
| `stability_score` | 0–1000 | Uptime since last reboot; penalized by recent failure count |

### 4.2.3 Election Algorithm

```
ELECTION_START:
  1. Each node broadcasts ELECT({node_id, fitness_score, timestamp})
  2. Wait ELECTION_WINDOW (500 ms) for all ELECT messages
  3. If only one ELECT received and it is from this node → claim Primary
  4. If multiple ELECTs received:
     a. Sort by fitness_score descending
     b. If top fitness is unique → that node claims Primary
     c. If top fitness tied → compare node_id lexicographically; lowest wins
     d. Winner broadcasts CLAIM({winner_id, fitness_score, timestamp})
  5. All nodes ACK the CLAIM
  6. Winner enters Primary state; all others enter Secondary state
```

### 4.2.4 Safety Properties

The election protocol MUST satisfy:

1. **Uniqueness** — Exactly one Primary exists per mesh at any time.
2. **Termination** — Election completes within 2 seconds of trigger.
3. **Validity** — The elected node has fitness ≥ all other candidates.
4. **Monotonicity** — Fitness scores are recomputed each election; no stale scores.
5. **Partition safety** — If partitions exist, each elects a local Primary; reconciliation occurs on merge (§4.2.7).

### 4.2.5 Primary Node Responsibilities

- Maintain the global capability registry (Chapter 6).
- Coordinate the distributed scheduler (Chapter 13).
- Maintain distributed state consistency (Chapter 12).
- Enforce security policy (Chapter 14).
- Coordinate OTA updates (Chapter 20).
- Maintain the topology graph.
- Distribute time synchronization reference (Volume VIII, Ch 11).

### 4.2.6 Primary Node Handoff

When a Primary Node steps down gracefully:

1. Primary broadcasts STEP_DOWN({reason, recommended_successor}).
2. Recommended successor is the node with highest fitness among Secondaries.
3. All nodes run election protocol; recommended successor typically wins.
4. Previous Primary transfers state (capability registry, topology, scheduler state) to successor.
5. Successor broadcasts CLAIM; all nodes ACK.
6. Previous Primary enters Secondary state.

Handoff MUST complete within 2 seconds and MUST NOT disrupt running interactions.

### 4.2.7 Partition Reconciliation

When two partitions each have a Primary and reconnect:

1. Both Primary Nodes exchange fitness scores and election timestamps.
2. The Primary with the higher fitness score claims authority.
3. If fitness tied, the Primary with the earlier election timestamp wins.
4. If still tied, node_id tiebreak (lowest wins).
5. The losing Primary enters Secondary state.
6. Both partitions reconcile state using Lamport ordering (Chapter 12).
7. Conflicts are resolved by priority class, then last-writer-wins.

Reconciliation MUST complete within 5 seconds of partition merge.

## 4.3 Secondary Nodes

- All non-Primary Nodes are **Secondary**.
- Secondaries MUST accept global scheduling decisions.
- A Secondary MUST be able to operate independently if the Primary is lost (degraded mode).

## 4.4 Dynamic Joining

- New nodes join at any time.
- Join MUST NOT disrupt running interactions.
- The mesh MUST validate the joining node's identity and trust.
- After join, capabilities/resources are registered and state synchronized.

## 4.5 Dynamic Leaving

- Nodes leave gracefully or abruptly.
- Graceful leave: handoff tasks, save state, notify mesh.
- Abrupt leave: Health Manager detects loss; scheduler migrates tasks; resources released.

## 4.6 Temporary Nodes

- **Guest devices** (a friend's phone, a borrowed ring) join temporarily.
- Guests receive limited trust and temporary identity (Chapter 14).
- Guests MUST be isolated from private resources.
- Guest sessions MUST be revoked when the guest leaves.

## 4.7 Partitioning

- If the mesh partitions, each partition MUST operate independently in degraded mode.
- On reconnection, state MUST merge per consistency rules (Chapter 12).
- Conflicts MUST be resolved deterministically.

## 4.8 Conformance

A conformant MeshOS MUST:

1. Implement the full formation lifecycle.
2. Elect a Primary deterministically.
3. Support dynamic join/leave without disruption.
4. Support guest devices with isolation.
5. Operate in degraded mode under partitioning.
