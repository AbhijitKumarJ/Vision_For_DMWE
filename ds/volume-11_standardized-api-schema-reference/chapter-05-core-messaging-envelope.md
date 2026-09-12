# Chapter 5: Core Messaging Envelope

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 5.1 Purpose

All communication across the mesh is encapsulated in a standard **DMWE Envelope**. This ensures routing, QoS, and security managers can process packets without deserializing the semantic payload.

## 5.2 Wire Format (`dmwe_core.proto`)

```protobuf
syntax = "proto3";
package dmwe.core;

enum QoSClass {
  QOS_UNKNOWN = 0;
  QOS_BACKGROUND = 1;
  QOS_AI_INFERENCE = 2;
  QOS_VIDEO = 3;
  QOS_AUDIO = 4;
  QOS_REALTIME_INTERACTION = 5; // < 10ms latency requirement
}

enum PayloadType {
  TYPE_UNKNOWN = 0;
  TYPE_DESCRIPTOR = 1;
  TYPE_CAPABILITY_ADVERT = 2;
  TYPE_INTERACTION_OBJ = 3;
  TYPE_CONTEXT_FACT = 4;
  TYPE_RESOURCE_SYNC = 5;
  TYPE_TELEMETRY = 6;
  TYPE_SESSION_CONTROL = 7;
  TYPE_ERROR_RESPONSE = 8;
  TYPE_CAPABILITY_NEGOTIATE = 9;
  TYPE_FAST_PATH_HANDSHAKE = 10;
  TYPE_GRAPH_QUERY = 11;
  TYPE_GRAPH_RESULT = 12;
  TYPE_NODE_OFFLINE = 13;        // Graceful shutdown or detach announcement (Vol IV, Ch 16; Vol VIII, Ch 14)
  TYPE_FAULT_ALERT = 14;         // Asynchronous fault notification carrying a FaultCode (Vol IV, Ch 16)
}

message MeshEnvelope {
  string message_id = 1;         // UUID (RFC 4122)
  uint64 timestamp_ms = 2;       // Mesh-synchronized global time (Vol VIII, Ch 11)
  string sender_node_id = 3;
  string receiver_node_id = 4;   // Empty if broadcast
  string session_id = 5;         // Empty if none
  QoSClass qos_class = 6;
  PayloadType payload_type = 7;
  bool is_encrypted = 8;

  // Opaque binary payload, decoded according to payload_type.
  bytes payload = 9;
}
```

## 5.3 Field Semantics

| Field | Constraint |
|-------|------------|
| `message_id` | MUST be unique per sender; enables deduplication (Volume VIII, Ch 14) |
| `timestamp_ms` | MUST be mesh-synchronized |
| `receiver_node_id` | Empty string denotes broadcast |
| `qos_class` | MUST NOT be modified by intermediate hops |
| `is_encrypted` | MUST be set correctly; mismatches MUST be rejected |

## 5.4 QoS Classes

- `QOS_REALTIME_INTERACTION` is reserved for interactions requiring end-to-end latency below 10 ms (Chapters 10, 13).
- `QOS_AI_INFERENCE` tolerates higher latency but MUST preserve ordering.
- The scheduler derives priority and reliability from the class (Volume VIII, Ch 12).

## 5.5 Routing Behavior

- Nodes MUST route on the envelope header only.
- Semantic addressing (by capability or interaction) is resolved via the Protocol Graph (Volume VIII, Ch 5).
- A broadcast envelope MUST be processed by every node in the addressed domain.

## 5.6 Security Marking

- Envelopes are integrity-protected by default.
- Sensitive payloads are encrypted (Chapter 14; Volume VIII, Ch 13).
- `is_encrypted` MUST reflect the actual protection applied.

## 5.7 Error Codes

All protocol errors, capability failures, and system faults are communicated using a standardized error code enum. Error responses MUST be carried in a `MeshEnvelope` with `payload_type = TYPE_ERROR_RESPONSE`.

### 5.7.1 Error Code Enum

```protobuf
enum DMWEErrorCode {
  // Success
  ERR_OK = 0;

  // Protocol errors (1xxx)
  ERR_UNKNOWN_MESSAGE_TYPE = 1001;
  ERR_MALFORMED_ENVELOPE = 1002;
  ERR_MALFORMED_PAYLOAD = 1003;
  ERR_UNSUPPORTED_VERSION = 1004;
  ERR_DUPLICATE_MESSAGE_ID = 1005;
  ERR_MESSAGE_TOO_LARGE = 1006;
  ERR_ROUTING_FAILURE = 1007;
  ERR_SESSION_NOT_FOUND = 1008;
  ERR_SESSION_EXPIRED = 1009;
  ERR_QOS_VIOLATION = 1010;

  // Authentication & authorization (2xxx)
  ERR_AUTH_REQUIRED = 2001;
  ERR_AUTH_FAILED = 2002;
  ERR_TOKEN_EXPIRED = 2003;
  ERR_TOKEN_REVOKED = 2004;
  ERR_UNTRUSTED_NODE = 2005;
  ERR_UNTRUSTED_APPLICATION = 2006;
  ERR_INSUFFICIENT_PERMISSIONS = 2007;
  ERR_CAPABILITY_ACCESS_DENIED = 2008;
  ERR_CROSS_DOMAIN_DENIED = 2009;

  // Capability errors (3xxx)
  ERR_CAPABILITY_NOT_FOUND = 3001;
  ERR_CAPABILITY_UNAVAILABLE = 3002;
  ERR_CAPABILITY_VERSION_MISMATCH = 3003;
  ERR_CAPABILITY_DEPENDENCY_MISSING = 3004;
  ERR_CAPABILITY_NEGOTIATION_FAILED = 3005;
  ERR_CAPABILITY_PROVIDER_BUSY = 3006;
  ERR_CAPABILITY_PROVIDER_FAILED = 3007;
  ERR_FAST_PATH_DENIED = 3008;
  ERR_FAST_PATH_REVOKED = 3009;

  // State & data errors (4xxx)
  ERR_STATE_READ_FAILED = 4001;
  ERR_STATE_WRITE_FAILED = 4002;
  ERR_STATE_CONFLICT = 4003;
  ERR_STATE_CORRUPTED = 4004;
  ERR_STATE_NOT_FOUND = 4005;
  ERR_CONTEXT_STALE = 4006;
  ERR_CONTEXT_CONFLICT = 4007;
  ERR_SCHEMA_MISMATCH = 4008;

  // Resource errors (5xxx)
  ERR_RESOURCE_EXHAUSTED = 5001;
  ERR_RESOURCE_DENIED = 5002;
  ERR_ENERGY_LOW = 5003;
  ERR_ENERGY_CRITICAL = 5004;
  ERR_THERMAL_CRITICAL = 5005;
  ERR_MEMORY_EXHAUSTED = 5006;
  ERR_STORAGE_FULL = 5007;

  // Scheduling errors (6xxx)
  ERR_SCHEDULER_NO_CAPABLE_NODE = 6001;
  ERR_SCHEDULER_DEADLINE_MISSED = 6002;
  ERR_SCHEDULER_PREEMPTED = 6003;
  ERR_TASK_MIGRATION_FAILED = 6004;
  ERR_CHECKPOINT_MISSING = 6005;

  // System errors (7xxx)
  ERR_MESH_PARTITIONED = 7001;
  ERR_PRIMARY_NODE_LOST = 7002;
  ERR_TIME_SYNC_LOST = 7003;
  ERR_FIRMWARE_UPDATE_FAILED = 7004;
  ERR_HARDWARE_FAULT = 7005;
  ERR_INTERNAL_ERROR = 7999;
}
```

### 5.7.2 Error Response Message

```protobuf
message ErrorResponse {
  DMWEErrorCode error_code = 1;
  string error_message = 2;        // Human-readable description
  string original_message_id = 3;  // Reference to failed request
  uint64 occurred_at_ms = 4;
  string node_id = 5;              // Node that generated the error
  bytes details = 6;               // Optional structured error details
}
```

### 5.7.3 Error Handling Rules

- Error responses MUST be sent within the same QoS class as the original message.
- Error responses MUST NOT trigger further error responses (no error cascading).
- Nodes MUST handle unknown error codes gracefully (treat as generic error).
- Error codes MUST be stable across versions; new codes are additive only.
- Error logging MUST include the error code, original message ID, and timestamp.

### 5.7.4 Error Severity Mapping

| Code Range | Severity | Retry Policy |
|------------|----------|--------------|
| 1xxx Protocol | Medium | Retry with backoff |
| 2xxx Auth | High | Re-authenticate; then retry |
| 3xxx Capability | Medium | Failover to alternate provider |
| 4xxx State | High | Restore from checkpoint |
| 5xxx Resource | High | Defer; reduce resource usage |
| 6xxx Scheduler | Medium | Re-schedule; migrate task |
| 7xxx System | Critical | Enter degraded mode; alert user |

## 5.7 Conformance

A conformant implementation MUST support the `MeshEnvelope`, honor QoS semantics, route on headers only, and enforce the integrity and encryption markings.
