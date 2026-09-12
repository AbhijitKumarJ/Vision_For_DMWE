# Chapter 12: Context & Cognitive Graph Schemas

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 12.1 Purpose

Beyond individual facts, the platform maintains queryable **Context Graph** and **Cognitive Graph** overlays (Volume VII, Ch 3, 7). This chapter defines the graph primitives and the snapshot reference used by Interaction Objects.

## 12.2 Graph Node

```protobuf
syntax = "proto3";
package dmwe.context;

enum NodeType {
  NODE_UNKNOWN = 0;
  NODE_ENTITY = 1;
  NODE_ACTIVITY = 2;
  NODE_STATE = 3;
  NODE_RELATIONSHIP = 4;
  NODE_MEMORY = 5;
}

message GraphNode {
  string node_id = 1;
  NodeType type = 2;
  string label = 3;              // e.g. "user", "room", "meeting"
  ContextLayer layer = 4;        // Chapter 11
  repeated GraphProperty properties = 5;
  uint64 updated_at_ms = 6;
}

message GraphProperty {
  string key = 1;
  oneof value {
    string string_value = 2;
    double numeric_value = 3;
    bool boolean_value = 4;
  }
  double confidence = 5;
}
```

## 12.3 Graph Edge

```protobuf
message GraphEdge {
  string edge_id = 1;
  string from_node_id = 2;
  string to_node_id = 3;
  string relation = 4;           // e.g. "located_in", "engaged_with"
  double weight = 5;             // 0.0 to 1.0
  uint64 updated_at_ms = 6;
}
```

## 12.4 Graph Snapshot Reference

```protobuf
message ContextSnapshot {
  string snapshot_id = 1;        // referenced by InteractionObject.context_snapshot_id
  uint64 captured_at_ms = 2;
  repeated string node_ids = 3;
  repeated string edge_ids = 4;
  bytes signature = 5;           // integrity over captured subgraph
}
```

- A snapshot is immutable once published.
- Consumers resolve snapshots by ID via the Context Engine (Volume IV, Ch 9).
- Snapshots capture only the subgraph relevant to the interaction.

## 12.5 Human Digital Twin

The Human Digital Twin is a persistent root node set derived from the Context Graph (Volume VII, Ch 4). Its schema is an aggregation of `GraphNode` of type `NODE_ENTITY` under a canonical `user` label; the full twin schema is defined in Volume VII.

## 12.6 Query Contract

```protobuf
message GraphQuery {
  string query_id = 1;
  repeated string node_filters = 2;
  repeated string edge_filters = 3;
  uint32 max_depth = 4;
  uint32 max_results = 5;
}

message GraphQueryResult {
  string query_id = 1;
  repeated GraphNode nodes = 2;
  repeated GraphEdge edges = 3;
  uint64 resolved_at_ms = 4;
}
```

## 12.7 The Canonical Identifier System (DIDs)

String-based naming (e.g., `interaction.pointer.precision`) introduces unacceptable overhead in memory, bandwidth, and parsing speed. Every Entity, Relationship, Event, and Schema in the ecosystem MUST possess an immutable **DMWE Identifier (DID)**.

### 12.7.1 Anatomy of a DID String

The human-readable (and JSON-serializable) representation follows a URN-like structure:

```
DID:<Domain>:<Authority>:<Type>:<ID>:<Version>
```

| Field | Description |
|-------|-------------|
| `DID` | Fixed prefix identifying the URI scheme |
| `Domain` | Usually `DMWE` (core standards) or a vendor/consortium domain |
| `Authority` | Governing body that allocated the ID (e.g., `STD`, `VENDOR`) |
| `Type` | 3-character class indicator (e.g., `CAP`, `MOD`, `EVT`, `POL`) |
| `ID` | 6-digit zero-padded unique identifier within that type |
| `Version` | Semantic version (e.g., `v1`) |

**Examples:**
- `DID:DMWE:STD:CAP:000184:v1` — DMWE Standard → Capability → ID 184 → v1 (Precision Pointer).
- `DID:ACME:VENDOR:MOD:003217:v2` — ACME Vendor → Hardware Module → ID 3217 → v2.

**Immutability Rules:**
- Once assigned, an ID's core meaning MUST NEVER change.
- A deprecated capability is NOT deleted from the registry nor recycled; its metadata is updated to `Status: Deprecated`.

### 12.7.2 The 80-Bit Binary Encoding

The MeshOS runtime and network layer MUST use a fixed-width binary encoding for DIDs, guaranteeing O(1) equality comparisons and minimal radio payload.

```
[0]        [1..2]      [3..6]      [7]      [8..9]
Registry   Authority   Object ID   Version  Reserved
(8 bits)   (16 bits)   (32 bits)   (8 bits) (16 bits)
```

| Field | Size (Bits) | Description |
|-------|-------------|-------------|
| Registry Type | 8 | Maps to `Type` (e.g., `0x01` = CAP, `0x02` = MOD) |
| Authority ID | 16 | Maps to `Authority` (e.g., `0x0000` = Standard) |
| Object ID | 32 | Up to 4.29 billion objects per Type/Authority pair |
| Version | 8 | Major version (0-255) |
| Reserved | 16 | Future expansion, set to `0x0000` |

### 12.7.3 Dynamic Alias Table (Header Compression)

For Critical Real-time interaction classes (latency budget < 10 ms), even a 10-byte ID is excessive if transmitted thousands of times per second. Nodes use a **Dynamic Alias Protocol**:

1. During the Session Handshake, the Primary Node and module negotiate the required sub-graph.
2. The Primary Node assigns a 1-byte or 2-byte volatile Alias to the full 80-bit DID for the session duration.
   - Example: `DID:DMWE:STD:CAP:000184:v1` → `0x0A`.
3. All subsequent Fast-Path packets use only the alias (Volume VIII, Ch 13).
4. If the session drops or the node migrates, the Alias Table is flushed and aliases MUST be re-negotiated using canonical 80-bit DIDs.

### 12.7.4 Registry Governance and Allocation

The **DMWE Registry Authority (DRA)** governs version-controlled, machine-readable manifests (JSON/Protobuf) for the 10 canonical registries:

1. Organization Registry (Vendor IDs)
2. Capability Registry (CAP)
3. Module Registry (MOD)
4. Schema Registry (SCH)
5. Protocol Registry (PRO)
6. Event Registry (EVT)
7. Error Registry (ERR)
8. Workflow Registry (WF)
9. Policy Registry (POL)
10. Interaction Registry (INT — verbs, modifiers, targets)

The 32-bit `Object ID` space within each registry is divided into allocation blocks:

| Range | Purpose |
|-------|---------|
| `0x00000000` – `0x0001869F` (0–99,999) | **Reserved Core** (DMWE Standard features only) |
| `0x000186A0` – `0x0007A11F` (100k–499k) | **Foundation Extended** (approved standard extensions) |
| `0x0007A120` – `0x000C34FF` (500k–799k) | **Consortium** (cross-vendor agreements) |
| `0x000C3500` – `0xFFFFFFFF` (800k+) | **Vendor-Specific** (private innovation space) |

Vendors MUST use their assigned 16-bit Authority ID combined with the Vendor-Specific range to guarantee zero global collisions.

## 12.8 Conformance

A conformant implementation MUST support immutable snapshots, resolvable graph references, the query contract with integrity-preserving results, and canonical DID addressing with 80-bit binary encoding and session-scoped alias tables.
