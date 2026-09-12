# Chapter 10: Interaction Object Schema

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 10.1 Purpose

The **Interaction Object** is the application-facing manifestation of the Human Interaction Language. Applications never see raw sensor data; they subscribe to `InteractionObject` streams (Volume VI, Ch 4).

## 10.2 Wire Format (`dmwe_interaction.proto`)

```protobuf
syntax = "proto3";
package dmwe.interaction;

message Vector3D {
  float x = 1;
  float y = 2;
  float z = 3;
}

message Intent {
  Verb verb = 1;
  repeated Modifier modifiers = 2;
  Target target = 3;

  // Directional intents (MOVE, ROTATE, PROJECT).
  Vector3D spatial_vector = 4;

  // Continuous intents (SCROLL).
  float scalar_delta = 5;
}

message Origin {
  string capability_id = 1;      // e.g. "interaction.pointer"
  string provider_node_id = 2;   // module that generated it
}

message InteractionObject {
  string interaction_id = 1;
  uint64 timestamp_ms = 2;

  Intent intent = 3;
  Origin origin = 4;

  float confidence = 5;          // 0.0 to 1.0
  PriorityClass priority = 6;

  string context_snapshot_id = 7;  // Context Graph reference (Chapter 12)

  FeedbackLevel required_feedback = 8;
  Lifecycle completion_state = 9;
}
```

## 10.3 TypeScript SDK View

```typescript
/** Volume VI, Ch 4: Interaction Object */
interface InteractionObject {
  interactionId: string;
  timestamp: number;

  intent: {
    verb: Verb;
    modifiers: Modifier[];
    target: Target;
    spatialVector?: Vector3D;    // [x, y, z] for directional intents
    scalarDelta?: number;        // value change for continuous intents
  };

  origin: {
    capabilityId: string;        // e.g. "interaction.pointer"
    providerNodeId: string;      // the module that generated it
  };

  confidence: number;            // 0.0 to 1.0, used for conflict resolution
  priority: PriorityClass;

  contextSnapshotId: string;     // Context Graph state at this exact ms
  requiredFeedback: FeedbackLevel; // ACKNOWLEDGE, PROGRESS, CONFIRMATION
  completionState: Lifecycle;    // RECOGNIZED, EXECUTED, COMPLETED
}
```

## 10.4 Delivery Semantics

- Objects are delivered to authorized subscribers (Volume IV, Ch 10).
- Delivery is authenticated and ordered.
- `QOS_REALTIME_INTERACTION` guarantees the sub-10 ms latency class.
- Streaming interactions update `scalar_delta` / `spatial_vector` incrementally.

## 10.5 Confidence & Conflict Resolution

- MeshOS uses `confidence` for conflict resolution when multiple inputs express the same intent (Volume VI, Ch 7).
- Below-threshold confidence triggers escalation rather than silent rejection.

## 10.6 Lifecycle

The `completion_state` tracks: Idle → Detected → Recognized → Validated → Contextualized → Executed → Confirmed → Completed → Archived (Volume VI, Ch 8).

## 10.7 Conformance

A conformant implementation MUST emit valid, complete Interaction Objects and deliver them to authorized subscribers with the declared latency class.
