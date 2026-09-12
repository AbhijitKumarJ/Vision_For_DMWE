# Chapter 3: Context Graph

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

## 3.1 The Context Graph (CxG)

Every contextual element is a node in a live, evolving graph:

```
User
 │
Activity
 │
Workspace
 │
Application
 │
Environment
 │
Capabilities
 │
Devices
```

## 3.2 Node Types

- User
- Activity
- Workspace
- Application
- Environment
- Capabilities
- Devices
- Locations
- People
- Tasks
- Resources

## 3.3 Relationships

| Relationship | Example |
|--------------|---------|
| Located In | User is Located In Office |
| Uses | User Uses Laptop |
| Depends On | Workspace Depends On Projector |
| Near | Phone Near Desk Hub |
| Collaborates With | User Collaborates With Team |
| Assigned To | Task Assigned To User |
| Requires | Task Requires Voice Capability |

## 3.4 Node Metadata

Each node carries:

- Type and ID.
- Timestamp and freshness.
- Confidence.
- Provenance (Chapter 5).
- Privacy class.

## 3.5 Continuous Evolution

- The graph updates continuously as the situation changes.
- Nodes/edges are added, refreshed, and expired.
- Expiry MUST follow defined freshness policies.

## 3.6 Graph Queries

Consumers query the graph:

- "What is the user doing?"
- "Which capabilities are near the user?"
- "What task is in focus?"

## 3.7 Graph as Reasoning Substrate

- The Context Graph powers the Reasoning Engine (Chapter 8).
- Combined with other graphs it forms the Cognitive Graph (below).

## 3.8 The Cognitive Graph (CoG)

The earlier volumes introduced foundational graphs:

- **Volume V:** Capability Graph
- **Volume VI:** Interaction Graph
- **Volume VII:** Context Graph (+ Resource Graph, Trust Graph, Knowledge Graph)

The **Cognitive Graph** is an overlay that links them into a coherent representation of the user's digital ecosystem:

```
Human Digital Twin
   ↓
Context Graph
   ↓
Interaction Graph
   ↓
Capability Graph
   ↓
Resource Graph
   ↓
Trust Graph
   ↓
Knowledge Graph
```

Through the Cognitive Graph, the system can answer:

- What is the user trying to achieve?
- Which capabilities are currently available?
- What resources are constrained?
- What interaction is most likely next?
- Why did the system adapt its behavior?

## 3.9 The Unified Meta-Model (UMM)

Maintaining separately synchronized graphs (Capability, Interaction, Context, Resource, Trust, Knowledge) creates an N² synchronization problem: keeping every pair of graphs mutually consistent costs computation and energy that scales quadratically with mesh size. The CCIF therefore defines a single canonical source of truth, the **Unified Meta-Model (UMM)**, from which all of the above graphs are derived.

- The UMM is a single Universal Directed Property Graph.
- All subsystems read from and write to this one semantic network.
- The UMM is a logical construct; the specification defines its mathematics and topology, not its physical database. A Primary Node MAY store it in an embedded graph database; a low-power module MAY store its local sub-graph as an in-memory struct array.
- Because every view derives from the same meta-model, it is mathematically impossible for two views to disagree about which entities are present in the mesh.

## 3.10 The Five Primitives

Every concept in the DMWE ecosystem MUST be represented as exactly one of five mathematical primitives. No other foundational structures are permitted.

### 3.10.1 Entities (E)

Entities are the nodes (vertices) of the graph. They represent anything that exists, physical or logical.

- Examples: `Module`, `User`, `Intent`, `Task`, `Capability`, `AI Model`.
- Every Entity MUST possess a Canonical Identifier (DID) (Volume XI, Ch 12 §12.7).

### 3.10.2 Relationships (R)

Relationships are the directed edges connecting Entities: `(Subject) → [Relationship] → (Object)`.

- Examples: `provides`, `consumes`, `depends_on`, `authenticated_by`, `located_on`.
- Relationships MUST be strictly directional but MAY be traversed bidirectionally by the query engine.

### 3.10.3 Properties (P)

Properties are key-value attributes mathematically bound to an Entity or a Relationship.

- On an Entity (`Module`): `battery = 92%`, `temperature = 33°C`.
- On a Relationship (`provides`): `latency = 5ms`, `reliability_score = 0.99`.
- Properties represent scalar states only. If a property would reference another complex object, it MUST be refactored into an Entity and a Relationship.

### 3.10.4 Events (V)

Events are immutable, time-stamped artifacts representing a state change in the graph.

- Examples: `PointerMoved`, `NodeDropped`, `AuthenticationSucceeded`.
- Critical state changes append Event nodes to the graph rather than overwriting history, forming a temporal chain.
- Events are immutable; they act as the distributed ledger for interaction history and audit trails.

### 3.10.5 Constraints (C)

Constraints are executable rules (Boolean predicates) bound to the graph. They dictate the legal boundaries of graph transformations.

- Examples: `Latency < 10ms`, `PrivacyLevel == Local`, `Battery > 15%`.
- The Scheduler MUST evaluate Constraints before applying any transformation to the graph. If a Constraint evaluates to `False`, the execution path is invalid.

## 3.11 Distributed Graph Architecture

A Smart Ring with 64KB of RAM cannot store the unified state of a 15-node mesh. The UMM MUST therefore be distributed.

### 3.11.1 Global View vs. Local Bounded Context

- **Global Materialized View:** The Primary Node (phone/hub) maintains the fully materialized UMM.
- **Local Bounded Context (Sub-graph):** Secondary, low-power nodes maintain only the sub-graph containing the Entities and Relationships strictly necessary for their immediate capabilities.

### 3.11.2 Graph-Diffing and Reconciliation

- Nodes MUST NOT replicate full graph state.
- When an Entity changes (e.g., Ring battery drops 40% → 39%), the node generates a **Semantic Graph-Diff** rather than a JSON object: `UPDATE: (Entity: DID_Ring_1) -> [Property: Battery] -> (Value: 39%)`.
- The Primary Node applies the diff mathematically and triggers sub-graph projections to dependent nodes in O(1) time.
- Reconciliation converges toward a consistent state without full replication (Volume VIII, Ch 9 §9.12).

## 3.12 System Projections (Views)

The legacy silos (Capability Graph, Context Graph, Resource Graph) still exist logically, but they are no longer separately maintained databases. They are **Projections** (using the projection operator `Project`; Volume V, Ch 8 §8.11) dynamically generated from the UMM when requested.

- **Resource View:** The Scheduler requests a projection that strips Intents, Contexts, and Policies, returning only `(Device) → [Property: CPU]`, `(Device) → [Property: Battery]`.
- **Security View:** The Security Manager requests a projection returning only `(User) → [authenticated_by] → (Certificate) → [grants] → (Permission)`.
- **Context View:** The Context Graph defined in this chapter is itself such a projection, scoped to user/environmental state and freshness (Volume VIII, Ch 9).

## 3.13 Conformance

A conformant implementation MUST:

1. Maintain a live Context Graph as a projection of the Unified Meta-Model.
2. Represent all concepts using only the five primitives (Entity, Relationship, Property, Event, Constraint).
3. Keep only a local bounded sub-graph on low-power nodes and rely on Graph-Diffing for changes.
4. Generate all legacy graphs (Capability, Interaction, Context, Resource, Trust, Knowledge) as derived projections of the single UMM.
