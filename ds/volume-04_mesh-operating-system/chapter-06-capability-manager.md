# Chapter 6: Capability Manager

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

Capabilities are **first-class operating system objects**. The Capability Manager is the subsystem that governs their lifecycle across the mesh. Capability semantics are defined in Volume V; this chapter defines how the OS manages them.

## 6.1 Capability Registry

- A global registry maintains all capabilities available in the mesh.
- Entries: capability ID, version, provider(s), quality, lifecycle state, dependencies.
- The registry MUST be consistent across nodes (replicated per Chapter 12).
- Queries MUST be authorization-filtered.

## 6.2 Capability Discovery

- Consumers discover capabilities by ID, category, quality, location, or trust class.
- Discovery returns the best available providers per policy.
- Discovery MUST respect trust domains (Chapter 14).

## 6.3 Capability Negotiation

- When a capability is requested, the manager negotiates:
  - Which provider serves it.
  - Quality level required.
  - Resource reservation.
  - Latency/energy trade-offs.
- Negotiation MUST result in a binding or a clear rejection with reasons.

## 6.4 Capability Priorities

- Capabilities are assigned priorities:
  - **Critical** (safety, medical) — must never be starved.
  - **Interactive** — latency-bound.
  - **Background** — best-effort.
- Priority drives scheduling and preemption (Chapter 8).

## 6.5 Capability Fusion

- The manager MAY compose multiple capabilities into a **composite capability**.
- Example: Ring Pointer + Eye Tracking → Precision Pointer.
- Fusion rules come from Volume V, Chapter 8.
- The OS MUST validate fused capabilities and their dependencies.

## 6.6 Capability Migration

- A running capability MAY migrate between providers.
- Migration MUST be transparent to the consumer.
- The manager coordinates handoff with the scheduler (Chapter 8).
- State MUST transfer via Distributed Interaction State (Chapter 12).

## 6.7 Capability Deprecation & Fallback

- Capabilities are deprecated per Volume V.
- On deprecation, the manager MUST reroute consumers to alternatives.
- **Fallback capabilities** provide degraded alternatives automatically.
- Example: Precision Pointer unavailable → basic Pointer.

## 6.8 Composite Capability Construction

- The OS MAY automatically construct composites from available primitives.
- Construction MUST be validated against quality and privacy policy.
- Applications see a single, stable capability.

## 6.9 Conformance

A conformant Capability Manager MUST:

1. Maintain a consistent, replicated registry.
2. Support discovery, negotiation, and binding.
3. Enforce priority and preemption.
4. Support fusion, migration, and fallback.
5. Keep consumers unaware of provider changes.
