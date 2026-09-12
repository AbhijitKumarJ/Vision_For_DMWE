# Chapter 12: Memory & State Management

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

Unlike traditional OSes, MeshOS state is **distributed**. This chapter defines how state is stored, shared, and kept consistent across nodes.

## 12.1 State Types

| Type | Description |
|------|-------------|
| Local state | Node-private, not shared |
| Shared state | Accessible across nodes |
| Replicated state | Duplicated on multiple nodes |
| Persistent state | Survives power cycles |
| Session state | Tied to an interaction/app session |

## 12.2 Distributed Interaction State

The key innovation: **any module can resume an ongoing interaction if another module disconnects.**

- Interaction state (pointer position, active gesture, task context) is published to shared state.
- A replacement provider (e.g., eye tracking) can continue the interaction seamlessly.
- State MUST be synchronized fast enough to avoid perceived interruption.

## 12.3 Synchronization

- State updates propagate via the Communication Manager.
- Update propagation MUST be bounded and versioned.
- Timestamps MUST follow mesh time sync (Volume VIII, Ch 11).

## 12.4 Conflict Resolution

- Concurrent writes MUST resolve deterministically:
  - Version/Lamport ordering.
  - Priority class.
  - Last-writer-wins with explicit rules per state type.
- Conflict resolution MUST be documented per state type.

## 12.5 Distributed Caching

- Nodes MAY cache shared state locally.
- Cache MUST be invalidated on update.
- Cache consistency follows declared consistency model.

## 12.6 Consistency Models

| Model | Use |
|-------|-----|
| Strong | Critical/safety state |
| Eventual | Context, telemetry |
| Causal | Interaction history |
| Session-scoped | App state |

- The consistency model for each state type MUST be declared.

## 12.7 Recovery After Failure

- On node loss, replicated state MUST continue to serve.
- State MUST be re-replicated after recovery.
- Checkpointed task state enables migration (Chapter 8, Chapter 16).

## 12.8 State Lifecycle

- State is created, published, consumed, and retired.
- Retirement MUST follow privacy/retention policy (Volume X).

## 12.9 Conformance

A conformant Memory & State Manager MUST:

1. Support all state types with declared consistency models.
2. Implement Distributed Interaction State.
3. Synchronize and resolve conflicts deterministically.
4. Recover replicated state after failure.
5. Enforce state retention/privacy policy.
