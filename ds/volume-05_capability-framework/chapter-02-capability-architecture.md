# Chapter 2: Capability Architecture

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 2.1 The Capability Model

A capability comprises:

| Element | Description |
|---------|-------------|
| Capability identity | Unique, versioned ID |
| Capability metadata | Quality, trust, cost (Chapter 4) |
| Capability interfaces | Operations supported (Chapter 10) |
| Capability contracts | Semantics and guarantees |
| Capability providers | Implementations (hardware/software) |
| Capability consumers | Applications/services using it |
| Capability dependencies | Required inputs (Chapter 8) |
| Capability priorities | Criticality class |
| Capability inheritance | Subtyping relations |
| Capability composition | Larger capabilities (Chapter 8) |

## 2.2 Layered Architecture

```
Applications
    │
Capability SDK
    │
Capability Runtime
    │
Capability Registry
    │
MeshOS
    │
Hardware Modules
```

- **Applications** — request capabilities.
- **Capability SDK** — stable developer API.
- **Capability Runtime** — execution environment on each node.
- **Capability Registry** — global catalog of providers.
- **MeshOS** — orchestration (Volume IV, Chapter 6).
- **Hardware Modules** — physical providers.

Applications NEVER communicate with hardware directly.

## 2.3 Capability Identity

- Every capability has a globally unique, registered ID (Chapter 19).
- IDs are namespaced by category and vendor.
- Versions are semantic (MAJOR.MINOR.PATCH).

## 2.4 Capability Metadata

- Capabilities publish rich metadata (Chapter 4): latency, accuracy, availability, confidence, bandwidth, energy, privacy, quality, dependencies, supported contexts.

## 2.5 Capability Interfaces

- Each capability exposes a standardized interface (Chapter 10).
- Interfaces define operations, events, and data types.
- Interfaces MUST be versioned with the capability.

## 2.6 Capability Contracts

- A contract defines: preconditions, operations, guarantees, and failure semantics.
- Contracts MUST be honored by providers and relied upon by consumers.
- Contract violations MUST be reported (Chapter 17).

## 2.7 Providers & Consumers

- A **provider** implements a capability (a Ring provides Pointer).
- A **consumer** uses a capability (an app uses Pointer).
- One provider MAY serve multiple capabilities; one capability MAY have many providers.

## 2.8 Dependencies & Priorities

- Capabilities declare dependencies on other capabilities.
- Priorities (Critical/Interactive/Background) drive scheduling (Volume IV, Ch 8).

## 2.9 Inheritance

- Capabilities MAY subtype others (e.g., `PrecisionPointer` extends `Pointer`).
- Inheritance MUST preserve interface compatibility.
- Overriding behavior MUST be documented.

## 2.10 Capability in the Platform

- MeshOS hosts the Capability Manager (Volume IV, Ch 6).
- Hardware advertises capabilities via the Module Descriptor (Volume III, Ch 4–5).
- The registry federates across nodes.

## 2.11 Conformance

A conformant capability MUST have: unique ID, version, metadata, interface, contract, and declared dependencies.
