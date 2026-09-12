# Chapter 3: Node Architecture

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

## 3.1 The Node

Every wearable module runs a lightweight **MeshOS node**. A node is the smallest unit of participation in the mesh.

```
Application Sandbox
        ↓
Capability Runtime
        ↓
Service Runtime
        ↓
Scheduler
        ↓
Drivers
        ↓
Communication Layer
        ↓
Hardware
```

## 3.2 Node Components

| Component | Responsibility |
|-----------|----------------|
| Application Sandbox | Isolated execution of apps/services |
| Capability Runtime | Hosts capability implementations |
| Service Runtime | Hosts local services |
| Scheduler | Local task execution (fed by kernel) |
| Drivers | Hardware abstraction |
| Communication Layer | Transport adapter, mesh link |
| Hardware | The physical module |

## 3.3 Node Identity

- Each node has a **globally unique identity** provisioned at manufacture (Volume III, Chapter 4).
- Identity is bound to the secure element where present.
- Node identity is immutable; temporary guest identities are distinct.

## 3.4 Local Runtime

The local runtime MUST provide:

- Preemptive scheduling of local tasks.
- Memory protection between sandboxes.
- Inter-service messaging.
- Power state management.
- Health self-monitoring.

## 3.5 Local Cache

- Nodes MAY cache capability and context data locally.
- Cached data MUST be versioned and validated (Volume VIII, time sync).
- Cache eviction MUST be driven by resource pressure (Resource Manager).

## 3.6 Local Scheduler

- The local scheduler executes tasks assigned by the distributed Scheduler (Chapter 8).
- It MUST honor assigned priorities and deadlines.
- It MUST notify the kernel of missed deadlines or overruns.

## 3.7 Service Registry

- The node maintains a local registry of services and capabilities it hosts.
- The registry is published to the mesh (Capability Manager).
- Registry updates are incremental and authenticated.

## 3.8 Node Capabilities

- Nodes advertise capabilities they can host (Volume III, Chapter 5).
- Capabilities are hosted as services (Chapter 5 of this volume).

## 3.9 Local Storage

- Nodes MAY provide persistent storage.
- Storage is treated as a pooled resource (Volume II, Chapter 7).
- Critical data MUST be replicated per Volume VIII, Chapter 12.

## 3.10 Failure Isolation

- A failing node MUST NOT corrupt other nodes.
- Sandboxes isolate application failures.
- The kernel MUST detect and quarantine failing nodes (Health Manager).

## 3.11 Conformance

A conformant node MUST implement the local runtime, identity, service registry, failure isolation, and local scheduling behaviors specified here.
