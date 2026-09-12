# Chapter 11: Context Fact Schema

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 11.1 Purpose

The Context Engine continuously updates the Human Digital Twin and Context Graph. Facts are broadcast as **Context Fact** payloads (Volume VII, Ch 3–5).

## 11.2 Wire Format (`dmwe_context.proto`)

```protobuf
syntax = "proto3";
package dmwe.context;

enum ContextLayer {
  LAYER_UNKNOWN = 0;
  LAYER_SENSOR = 1;
  LAYER_DEVICE = 2;
  LAYER_USER_ACTIVITY = 3;
  LAYER_ENVIRONMENT = 4;
  LAYER_APPLICATION = 5;
}

message ContextFact {
  string fact_id = 1;
  ContextLayer layer = 2;

  // Semantic key-value pair (e.g. key: "user.posture", value: "standing").
  string key = 3;
  oneof value {
    string string_value = 4;
    double numeric_value = 5;
    bool boolean_value = 6;
  }

  double confidence = 7;         // 0.0 to 1.0
  uint64 expires_at_ms = 8;      // Freshness boundary
  string provenance_node = 9;    // which node derived this fact
}
```

## 11.3 TypeScript SDK View

```typescript
/** Volume VII, Ch 5: Context Fact */
interface ContextFact {
  factId: string;
  layer: ContextLayer;           // SENSOR, DEVICE, USER_ACTIVITY, ENVIRONMENT, APPLICATION
  key: string;                   // e.g. "user.posture"
  value: string | number | boolean;
  confidence: number;            // 0.0 to 1.0
  expiresAtMs: number;           // freshness boundary
  provenanceNode: string;        // deriving node
}
```

## 11.4 Fact Semantics

- `layer` selects which graph layer owns the fact.
- `key` uses the dotted naming convention (e.g., `user.posture`, `environment.light_lux`).
- Exactly one member of the `value` `oneof` MUST be set.
- Facts with a confidence below the platform threshold MUST be flagged, not silently propagated.

## 11.5 Freshness & Expiry

- `expires_at_ms` defines the fact's freshness boundary.
- Expired facts MUST NOT be used for decisions.
- Consumers MUST re-query or subscribe to updates before acting on stale facts.

## 11.6 Provenance

- `provenance_node` records the deriving node.
- Facts derived from private data MUST retain their privacy classification (Volume VII, Ch 15).
- Derived facts MUST reference their source facts for auditability.

## 11.7 Synchronization

Facts propagate through the Context Synchronization Protocol (Volume VIII, Ch 9). Deltas, not full graphs, are transmitted.

## 11.8 Conformance

A conformant implementation MUST emit well-formed, provenance-tracked Context Facts and MUST enforce freshness boundaries before decision-making.
