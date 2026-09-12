# Chapter 2: Mesh Kernel Architecture

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

## 2.1 Kernel Structure

The MeshOS kernel is a **logically centralized, physically distributed** kernel. It consists of subsystems that may run on any node while presenting one coherent system.

```
┌────────────────────────────────────────────┐
│                MESHOS KERNEL                │
├────────────────────────────────────────────┤
│ Scheduler │ Resource Manager │ Capability  │
│           │                  │ Manager     │
├────────────────────────────────────────────┤
│ Communication │ Security │ Power │ Context │
│ Manager       │ Manager  │ Mgr   │ Manager │
├────────────────────────────────────────────┤
│ Health Manager │ Intent Runtime            │
├────────────────────────────────────────────┤
│ Node Runtimes + Hardware Drivers           │
└────────────────────────────────────────────┘
```

## 2.2 Kernel Subsystems

| Subsystem | Responsibility | Chapter |
|-----------|----------------|---------|
| Scheduler | Task placement and migration | 8 |
| Resource Manager | Pooled resource allocation | 7 |
| Capability Manager | Capability lifecycle, fusion, fallback | 6 |
| Communication Manager | Messaging, routing, QoS | 11 |
| Security Manager | Identity, auth, authorization, trust | 14 |
| Power Manager | Energy budget, sleep, thermals | 13 |
| Context Manager | User/system state aggregation | 9 |
| Health Manager | Monitoring, prediction, recovery | 15 |
| Intent Runtime | Sensor → semantic interaction | 10 |

## 2.3 Kernel Boundaries

- Kernel subsystems communicate ONLY through defined internal APIs (Chapter 23).
- No subsystem may access another subsystem's private state.
- All cross-node kernel communication MUST be authenticated and authorized (Security Manager).
- Kernel behavior MUST NOT depend on specific hardware, vendors, or form factors.

## 2.4 Internal Interactions

Typical flows:

- **Capability request:** Application → Capability Manager → (Resource Manager + Scheduler) → Capability provider.
- **Intent delivery:** Sensors → Intent Runtime → Context Manager → Application.
- **Node loss:** Health Manager → Scheduler (migration) → Resource Manager (reallocation).

## 2.5 Local vs Global Responsibility

Each subsystem has:

- **Local responsibilities** — what the node must always do itself.
- **Global responsibilities** — what the mesh coordinates (Primary Node).

| Subsystem | Local | Global |
|-----------|-------|--------|
| Scheduler | Run local tasks | Coordinate placement |
| Resource Mgr | Track local resources | Maintain pooled budget |
| Capability Mgr | Serve local capabilities | Maintain registry |
| Power Mgr | Manage local energy | Coordinate energy budget |

## 2.6 Kernel Goals

The kernel MUST:

1. Keep interaction latency within budget regardless of location.
2. Never require all nodes to be present for basic operation.
3. Fail gracefully: subsystem loss degrades function, not the whole mesh.
4. Be auditable: all kernel actions are traceable.

## 2.7 Conformance

A conformant kernel MUST implement the subsystem set, enforce internal API boundaries, and provide cross-node communication through authenticated channels only.
