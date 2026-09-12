# Chapter 5: Mesh Operating System

**Volume II — System Architecture · Working Draft v0.1**

This chapter defines the distributed operating system at the architecture level. Full runtime specification is in Volume IV; here we define its role, responsibilities, and kernel architecture.

## 5.1 The Mesh OS Concept

MeshOS is the "kernel" of DMWE. Unlike traditional operating systems that manage resources within one physical machine, MeshOS manages resources distributed across many autonomous devices. It is the software platform that makes a collection of wearables behave as one system.

## 5.2 Responsibilities

MeshOS MUST provide:

1. **Module discovery** — detect and authenticate modules as they join.
2. **Capability registry** — maintain the live catalog of available capabilities.
3. **Distributed scheduling** — decide where tasks execute (Chapter 8).
4. **Resource allocation** — pool and allocate CPU, battery, memory, sensors, output (Chapter 7).
5. **Power management** — treat energy as a shared mesh resource.
6. **Communication** — message routing between nodes (Chapter 12).
7. **Synchronization** — keep shared state consistent across nodes.
8. **Security enforcement** — identity, permissions, trust domains.
9. **Health monitoring** — track module and system health.
10. **Runtime services** — application lifecycle and runtime support.
11. **Fault tolerance** — recovery and graceful degradation (Chapter 14).

## 5.3 Kernel Architecture

MeshOS is organized into kernel subsystems:

| Subsystem | Responsibility |
|-----------|----------------|
| Scheduler | Task placement and migration |
| Resource Manager | Pooled resource allocation |
| Capability Manager | Capability registry and negotiation |
| Communication Manager | Messaging, routing, QoS |
| Security Manager | Identity, permissions, encryption |
| Power Manager | Energy budgeting and sharing |
| Context Manager | Context aggregation |
| Health Manager | Monitoring and recovery |
| Intent Runtime | Semantic intent pipeline (Chapter 9) |

Internal APIs between these subsystems are specified in Volume IV, Chapter 23.

## 5.4 Node Architecture

Every wearable runs a lightweight MeshOS node:

```
Application Sandbox
    |
Capability Runtime
    |
Service Runtime
    |
Scheduler
    |
Drivers
    |
Communication Layer
    |
Hardware
```

Each node maintains:

- **Node identity** — linked to the user's mesh identity.
- **Local runtime & cache** — for offline-tolerant operation.
- **Local scheduler** — cooperative with the global scheduler.
- **Service registry** — local services available to the mesh.
- **Failure isolation** — a failing node must not crash the mesh.

## 5.5 Mesh Formation

The mesh is created through a defined lifecycle (full detail in Volume IV, Chapter 4):

```
Power On -> Discovery -> Authentication -> Capability Exchange
  -> Resource Exchange -> Synchronization -> Mesh Formation -> Operational
```

Key concepts:

- **Primary Node selection** — a coordinator role (often the phone/necklace) is elected; the mesh survives its loss via re-election.
- **Secondary nodes** — modules contribute capabilities.
- **Dynamic joining/leaving** — hot-swap without restarting applications.
- **Guest devices** — temporary, capability-scoped participation.

## 5.6 Service-Oriented Architecture

Every module exposes services (Pointer Service, Projection Service, Battery Service, etc.). MeshOS provides:

- Service registration and discovery.
- Service binding and invocation.
- Service dependency and version management.

Applications never consume services directly; they consume capabilities (Chapter 6).

## 5.7 Distributed Interaction State

State is distributed across nodes, with:

- **Local state** — module-internal.
- **Shared state** — visible to cooperating nodes.
- **Replicated state** — mirrored for resilience.
- **Persistent state** — survives mesh reformation.

The **Distributed Interaction State** (Volume IV, Chapter 12) allows any module to resume an ongoing interaction if another module disconnects.

## 5.8 MeshOS and the Digital Twin

MeshOS maintains a privacy-protected **Human Digital Twin** (Volume VII) as the unified, application-facing model of the user:

- Body model, capability graph, interaction history
- Resource graph, context graph, trust graph

Applications query the Digital Twin rather than dozens of individual services.

## 5.9 Conformance Summary

A MeshOS implementation MUST implement all responsibilities in §5.2, the node architecture in §5.4, mesh formation in §5.5, and the internal APIs (Volume IV). Conformance requirements are enumerated in Chapter 16.
