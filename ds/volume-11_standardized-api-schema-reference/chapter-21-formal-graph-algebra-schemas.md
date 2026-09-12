# Chapter 21: Formal Graph Algebra Schemas (`dmwe_algebra.proto`)

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 21.1 Purpose

The Graph Algebra (Volume V, Ch 8 §8.11) transforms the Unified Meta-Model (Volume VII, Ch 3 §3.9) deterministically. When the Scheduler swaps a failing Smart Ring for an Eye Tracker, it does not send a custom command; it broadcasts a **Graph Transformation Transaction** encoded in Protocol Buffers. This chapter defines those wire-level structures so all nodes apply graph mutations locally with zero ambiguity and minimal bandwidth.

## 21.2 The Canonical DID Representation

DIDs are transmitted as fixed-length byte arrays (10 bytes / 80 bits) to maximize BLE and UWB packet efficiency. Protobuf passes them as raw byte arrays to guarantee O(1) memory alignment and zero parsing overhead on constrained MCUs.

```protobuf
syntax = "proto3";
package dmwe.algebra;

// A Canonical DID is strictly 10 bytes (80 bits) formatted as:
// [0]    Registry Type (e.g., 0x01 for CAP, 0x02 for MOD)
// [1..2] Authority ID (e.g., 0x0000 for Standard)
// [3..6] Object ID (32-bit unsigned integer)
// [7]    Version (Major version)
// [8..9] Reserved (0x0000)
typedef bytes CanonicalDID;
```

The string form `DID:<Domain>:<Authority>:<Type>:<ID>:<Version>` (Chapter 12 §12.7) is for documentation, logging, and JSON tooling only; the runtime and network layers MUST use this 80-bit encoding.

## 21.3 The Graph Transaction Envelope

Graph operations (like Substitute) often require multiple underlying changes (e.g., Unbind A, then Bind B). Operations MUST be transmitted as **Atomic Transactions**. If any operation within the transaction violates a Constraint, the entire transaction rolls back.

```protobuf
// Represents an ACID transaction on the Unified Meta-Model
message GraphTransaction {
  CanonicalDID transaction_id = 1;
  uint64 timestamp_ms = 2;

  // The list of algebraic operations to apply in sequence
  repeated GraphOperation operations = 3;

  // Optional: Global constraints that MUST be true for this
  // transaction to commit (e.g., User_Consent == True)
  repeated Constraint global_constraints = 4;
}

message GraphOperation {
  // The specific algebraic operator to apply
  oneof operator {
    // Structural Operators
    ComposeOp compose = 10;
    MergeOp merge = 11;
    SplitOp split = 12;
    ProjectOp project = 13;
    FilterOp filter = 14;
    ReplicateOp replicate = 15;

    // Semantic Operators
    BindOp bind = 20;
    UnbindOp unbind = 21;
    SubstituteOp substitute = 22;
    EnhanceOp enhance = 23;
    AggregateOp aggregate = 24;
    MigrateOp migrate = 25;
  }
}
```

## 21.4 Structural Operator Schemas

These operators modify the topology (nodes and edges) of the Unified Meta-Model.

```protobuf
// Compose (+): Combines multiple entities into a new composite entity.
message ComposeOp {
  repeated CanonicalDID input_dids = 1;    // e.g., Ring_IMU, Glasses_Gaze
  CanonicalDID output_did = 2;             // e.g., Fused_Spatial_Pointer

  // Defines the mathematical rule for combining properties (e.g., average latency)
  CompositionRule rule = 3;
}

// Merge (x): Fuses equivalent entities, abstracting them behind one identity.
message MergeOp {
  repeated CanonicalDID target_dids = 1;   // e.g., Left_Mic, Right_Mic
  CanonicalDID logical_did = 2;            // e.g., Virtual_Stereo_Array
}

// Split (/): Decomposes a complex entity into independent components.
message SplitOp {
  CanonicalDID source_did = 1;             // e.g., Gesture_Recognizer
  repeated CanonicalDID output_dids = 2;   // e.g., Hand_Tracker, Intent_Classifier
}

// Project (p): Extracts a specific subgraph as a read-only view.
message ProjectOp {
  CanonicalDID source_view_did = 1;        // The graph to project from
  CanonicalDID output_view_did = 2;        // The resulting view
  repeated string keep_relation_types = 3; // e.g., "located_in", "provides"
}

// Filter (s): Returns a subgraph satisfying specific constraints.
message FilterOp {
  CanonicalDID source_view_did = 1;        // The graph to filter
  CanonicalDID output_view_did = 2;        // The resulting filtered view
  repeated Constraint constraints = 3;     // e.g., PrivacyLevel == Public
}

// Replicate (r): Creates synchronized copies of a subgraph across nodes.
message ReplicateOp {
  CanonicalDID subgraph_did = 1;           // The subgraph to replicate
  repeated CanonicalDID target_node_dids = 2; // e.g., Phone_Node, Watch_Node
}
```

## 21.5 Semantic Operator Schemas

These operators change the relationships, bindings, and states of existing graph elements. They are the most frequently transmitted packets during real-time execution.

```protobuf
// Bind (b): Creates a runtime dependency edge between two entities.
message BindOp {
  CanonicalDID subject_did = 1;            // e.g., Intent_Authenticate
  CanonicalDID object_did = 2;             // e.g., Face_Recognition_Capability
  RelationshipType relationship = 3;       // e.g., REL_BOUND_TO, REL_CONSUMES

  // Constraints applied to this specific binding (e.g., Latency < 10ms)
  repeated Constraint edge_constraints = 4;
}

// Unbind (u): Removes a runtime dependency edge.
message UnbindOp {
  CanonicalDID subject_did = 1;
  CanonicalDID object_did = 2;
  RelationshipType relationship = 3;
}

// Substitute (s ⇄ t): Atomically replaces one bound entity with another.
// Used for Graceful Degradation and Fault Recovery.
message SubstituteOp {
  CanonicalDID subject_did = 1;            // The consumer (e.g., App_Task)
  CanonicalDID existing_target_did = 2;    // The failing provider (e.g., Ring_Pointer)
  CanonicalDID new_target_did = 3;         // The fallback provider (e.g., Eye_Tracker)
  RelationshipType relationship = 4;
}

// Enhance (e): Improves QoC by binding an auxiliary input without changing identity.
message EnhanceOp {
  CanonicalDID target_did = 1;             // e.g., Voice_Recognition
  CanonicalDID auxiliary_did = 2;          // e.g., Lip_Reading_Camera
  repeated Constraint edge_constraints = 3;
}

// Aggregate (Sigma): Collects multiple properties of the same type into a pool.
message AggregateOp {
  repeated CanonicalDID input_dids = 1;    // e.g., Battery_1, Battery_2
  CanonicalDID pool_did = 2;               // e.g., System_Energy_Pool
}

// Migrate (m): Moves the execution locus of a task across physical nodes.
message MigrateOp {
  CanonicalDID task_did = 1;               // e.g., ExecutionUnit_LLM_Inference
  CanonicalDID source_node_did = 2;        // e.g., Phone_Hub
  CanonicalDID target_node_did = 3;        // e.g., Cloud_Server

  // The state vector required to resume the task seamlessly
  bytes serialized_state_vector = 4;
}
```

## 21.6 Constraints Schema (C)

Constraint evaluation provides the Formal Verification of privacy, safety, and scheduling feasibility (Volume IV, Ch 16 §16.10). Constraints are passed as mathematical predicates.

```protobuf
enum CompareOp {
  CMP_UNKNOWN = 0;
  CMP_EQUAL = 1;
  CMP_NOT_EQUAL = 2;
  CMP_GREATER_THAN = 3;
  CMP_LESS_THAN = 4;
  CMP_IN_SET = 5;
}

message Constraint {
  CanonicalDID property_did = 1;           // e.g., DID for "Latency" or "PrivacyLevel"
  CompareOp operator = 2;                  // e.g., CMP_LESS_THAN

  // The threshold value
  oneof threshold_value {
    int64 int_val = 3;                     // e.g., 10 (ms)
    float float_val = 4;                   // e.g., 0.95 (confidence)
    string string_val = 5;                 // e.g., "PRIVATE"
    bytes binary_val = 6;
  }

  // If true, violating this constraint aborts the entire transaction
  bool is_hard_constraint = 7;
}
```

## 21.7 Relationship Types

```protobuf
enum RelationshipType {
  REL_UNKNOWN = 0;
  REL_BOUND_TO = 1;       // Runtime dependency
  REL_CONSUMES = 2;       // Capability consumption
  REL_DEPENDS_ON = 3;     // Structural dependency
  REL_ALLOCATED_TO = 4;   // Resource reservation
  REL_PROVIDES = 5;       // Capability provisioning
  REL_AUTHENTICATED_BY = 6;
  REL_HOSTED_ON = 7;
  REL_PART_OF = 8;
  REL_LOCATED_ON = 9;
}

enum CompositionRule {
  COMPOSE_UNKNOWN = 0;
  COMPOSE_FUSION = 1;     // Simultaneous combination
  COMPOSE_SEQUENCE = 2;   // Chained stages
  COMPOSE_PARALLEL = 3;   // Concurrent paths
  COMPOSE_FALLBACK = 4;   // Primary with alternates
}
```

## 21.8 Worked Example

When a Smart Ring's battery drops to 1% while in use as a spatial pointer, the Primary Node detects the drop and must fail over to the Smart Glasses (Eye Tracker). The MeshOS broadcasts a Graph Transaction (JSON representation of the Protobuf payload shown for readability):

```json
{
  "transaction_id": "<DID_TX_9942>",
  "timestamp_ms": 1735700000050,
  "operations": [
    {
      "substitute": {
        "subject_did": "<DID_Intent_MoveCursor>",
        "existing_target_did": "<DID_Ring_Pointer>",
        "new_target_did": "<DID_Glasses_EyeTracker>",
        "relationship": "REL_BOUND_TO"
      }
    },
    {
      "unbind": {
        "subject_did": "<DID_Ring_Pointer>",
        "object_did": "<DID_Ring_Hardware>",
        "relationship": "REL_ALLOCATED_TO"
      }
    }
  ],
  "global_constraints": [
    {
      "property_did": "<DID_Prop_EyeTracker_Health>",
      "operator": "CMP_EQUAL",
      "string_val": "OK",
      "is_hard_constraint": true
    }
  ]
}
```

**Result:**
1. The Glasses verify their Health is "OK" (satisfying the constraint), update their local Sub-Graph to reflect that they are now `bound_to` the `MoveCursor` Intent, and begin streaming data.
2. The Ring detects it is `unbound`, drops its Bluetooth high-speed link, and enters `SUSPEND` sleep mode to save its final 1% of battery.
3. The application rendering the cursor never learns the Ring died; the UMM simply updated the graph relationships beneath it.

## 21.9 Conformance

A conformant implementation MUST:

1. Transmit all graph transformations as atomic Graph Transactions.
2. Encode DIDs as the fixed 80-bit canonical form on the wire.
3. Roll back the entire transaction if any operation or global constraint fails.
4. Evaluate all hard Constraints before committing a transaction.
5. Apply Graph Transactions locally to the Unified Meta-Model sub-graph and propagate Graph-Diffs (Volume VIII, Ch 9 §9.12).
