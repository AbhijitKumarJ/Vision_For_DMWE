# Chapter 17: JSON Schema Definitions

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 17.1 Purpose

Tooling, debugging, and interoperability with non-TypeScript systems use canonical **JSON Schema** definitions that mirror the Protobuf and TypeScript forms (Volume VIII, Ch 6).

## 17.2 JSON Schema Contract

Each canonical JSON representation MUST satisfy the following:

- Field names in camelCase.
- Same field set and optionality as the wire schema.
- Same enum values (as strings) as the TypeScript SDK.
- Validatable with standard JSON Schema draft 2020-12 validators.

## 17.3 Mesh Envelope (`dmwe-core-envelope.schema.json`)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "dmwe.core.MeshEnvelope",
  "title": "MeshEnvelope",
  "type": "object",
  "required": ["messageId", "timestampMs", "senderNodeId", "qosClass", "payloadType", "payload"],
  "properties": {
    "messageId": { "type": "string", "format": "uuid" },
    "timestampMs": { "type": "integer", "minimum": 0 },
    "senderNodeId": { "type": "string" },
    "receiverNodeId": { "type": "string" },
    "sessionId": { "type": "string" },
    "qosClass": { "$ref": "#/$defs/qosClass" },
    "payloadType": { "$ref": "#/$defs/payloadType" },
    "isEncrypted": { "type": "boolean" },
    "payload": { "type": "string", "contentEncoding": "base64" }
  },
  "$defs": {
    "qosClass": { "enum": ["BACKGROUND", "AI_INFERENCE", "VIDEO", "AUDIO", "REALTIME_INTERACTION"] },
    "payloadType": { "enum": ["DESCRIPTOR", "CAPABILITY_ADVERT", "INTERACTION_OBJ", "CONTEXT_FACT", "RESOURCE_SYNC", "TELEMETRY", "SESSION_CONTROL"] }
  },
  "additionalProperties": false
}
```

## 17.4 Interaction Object (`dmwe-interaction-object.schema.json`)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "dmwe.interaction.InteractionObject",
  "title": "InteractionObject",
  "type": "object",
  "required": ["interactionId", "timestamp", "intent", "origin", "confidence", "priority"],
  "properties": {
    "interactionId": { "type": "string" },
    "timestamp": { "type": "integer" },
    "intent": {
      "type": "object",
      "required": ["verb", "target"],
      "properties": {
        "verb": { "enum": ["SELECT", "MOVE", "ROTATE", "SCROLL", "PROJECT", "AUTHENTICATE", "UNDO"] },
        "modifiers": { "type": "array", "items": { "enum": ["NONE", "PRECISE", "CONTINUOUS", "SILENT", "SHARED"] } },
        "target": { "enum": ["CURRENT_OBJECT", "WORKSPACE", "ROOM", "IOT_DEVICE"] },
        "spatialVector": { "type": "array", "items": { "type": "number" }, "minItems": 3, "maxItems": 3 },
        "scalarDelta": { "type": "number" }
      }
    },
    "origin": {
      "type": "object",
      "required": ["capabilityId", "providerNodeId"],
      "properties": {
        "capabilityId": { "type": "string" },
        "providerNodeId": { "type": "string" }
      }
    },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
    "priority": { "enum": ["BACKGROUND", "INTERACTIVE", "CRITICAL"] },
    "contextSnapshotId": { "type": "string" },
    "requiredFeedback": { "enum": ["ACKNOWLEDGE", "PROGRESS", "CONFIRMATION"] },
    "completionState": { "enum": ["RECOGNIZED", "EXECUTED", "COMPLETED"] }
  },
  "additionalProperties": false
}
```

## 17.5 Module Descriptor

The `ModuleDescriptor` JSON schema is generated from Chapter 6 with camelCase fields (`moduleId`, `productFamily`, `hardwareRevision`, `firmwareVersion`, `resources`, `spatialIdentity`).

## 17.6 Usage Rules

- JSON is for tooling and debugging; it MUST NOT be used for high-rate mesh traffic.
- Validation failures MUST be reported with the failing field path.
- Schemas are versioned and distributed from the Schema Registry (Chapter 20).

## 17.7 Conformance

A conformant implementation MUST ship validators that accept exactly the canonical JSON forms and reject unknown fields.
