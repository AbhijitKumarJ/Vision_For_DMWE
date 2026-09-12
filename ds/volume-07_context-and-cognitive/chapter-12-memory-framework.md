# Chapter 12: Memory Framework

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

## 12.1 Kinds of Memory

The framework separates memory by purpose and retention.

| Memory | Contents | Lifespan |
|--------|----------|----------|
| Immediate | Current interaction state | Seconds |
| Session | Current workflow | Session |
| Episodic | Past sessions and events | Policy-defined |
| Semantic | Facts and learned relationships | Long-term |
| Procedural | Learned habits and routines | Long-term |

## 12.2 Immediate Memory

- Holds Distributed Interaction State (Volume IV, Ch 12).
- Enables module-to-module handoff.
- Cleared when interactions complete.

## 12.3 Session Memory

- Holds the current workflow (task, targets, context).
- Persists across device changes.
- Expires with the session.

## 12.4 Episodic Memory

- Records past sessions/events.
- Enables recall, undo, and history (Volume VI, Ch 16).
- Retention governed by policy.

## 12.5 Semantic Memory

- Stores facts and learned relationships.
- Backed by the Knowledge Graph (Chapter 7).
- Consistency maintained across the mesh.

## 12.6 Procedural Memory

- Stores habits and routines.
- Feeds prediction (Chapter 9) and personalization (Chapter 13).
- User-editable.

## 12.7 Policies

Each memory defines:

- **Retention** — how long data persists.
- **Expiration** — when data is deleted.
- **Synchronization** — across trusted devices.
- **User control** — view/edit/delete.

## 12.8 Privacy

- Memory data is personal.
- Retention MUST follow Volume X policy.
- Users MAY clear memory at any time.

## 12.9 Conformance

A conformant implementation MUST implement all five memories with defined retention, expiration, sync, and user control.
