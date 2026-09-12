# Chapter 19: Reference Schema Library

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 19.1 Purpose

This chapter provides complete, worked examples of the canonical schemas so implementers can validate end-to-end behavior. Examples are informative.

## 19.2 End-to-End Envelope Example

A Ring module publishing a precise pointer capability and a SELECT interaction:

```json
{
  "messageId": "ab39c1e0-8f2a-4a6b-9c7d-1b2c3d4e5f60",
  "timestampMs": 1735700000000,
  "senderNodeId": "DMWE-RNG-9942",
  "receiverNodeId": "",
  "sessionId": "sess-8812",
  "qosClass": "REALTIME_INTERACTION",
  "payloadType": "INTERACTION_OBJ",
  "isEncrypted": true,
  "payload": "base64-encoded InteractionObject"
}
```

## 19.3 Interaction Object Example

```json
{
  "interactionId": "ix-2026-0001",
  "timestamp": 1735700000000,
  "intent": {
    "verb": "SELECT",
    "modifiers": ["PRECISE"],
    "target": "IOT_DEVICE",
    "spatialVector": [0.1, -0.2, 0.9]
  },
  "origin": {
    "capabilityId": "interaction.pointer.precision",
    "providerNodeId": "DMWE-RNG-9942"
  },
  "confidence": 0.95,
  "priority": "INTERACTIVE",
  "contextSnapshotId": "snap-4455",
  "requiredFeedback": "ACKNOWLEDGE",
  "completionState": "RECOGNIZED"
}
```

## 19.4 Module Descriptor Example

```json
{
  "schemaVersion": "1.0",
  "moduleId": "DMWE-RNG-9942",
  "manufacturer": "DMWE Labs",
  "productFamily": "SmartRing",
  "hardwareRevision": "B",
  "firmwareVersion": "2.1.0",
  "classes": ["SENSOR", "COMPUTE"],
  "roles": ["AUTH_NODE"],
  "resources": {
    "battery": { "level": 0.95, "capacityMAh": 120, "health": 0.98 },
    "compute": { "mips": 150, "hasNpu": false, "ramMib": 64 }
  },
  "security": { "hasSecureElement": true, "trustLevel": "PERSONAL", "cryptoAlgorithms": ["aes-256-gcm"] },
  "spatialIdentity": { "defaultPlacement": "LEFT_INDEX_FINGER" }
}
```

## 19.5 Capability Advertisement Example

```json
{
  "capabilityId": "interaction.pointer.precision",
  "version": "2.1.0",
  "providerNodeId": "DMWE-RNG-9942",
  "lifecycleState": "AVAILABLE",
  "qoc": {
    "latency": { "typicalMs": 8, "p50Ms": 8, "p95Ms": 10, "p99Ms": 14 },
    "accuracyScore": 0.98,
    "availability": 0.999,
    "energyCost": "LOW",
    "privacyClass": "PERSONAL",
    "compositeScore": 0.97
  },
  "dependencies": ["sensor.imu.9axis"],
  "supportedContexts": ["indoor.seated", "outdoor.stationary"]
}
```

## 19.6 Context Fact Example

```json
{
  "factId": "fact-7788",
  "layer": "USER_ACTIVITY",
  "key": "user.posture",
  "value": "standing",
  "confidence": 0.9,
  "expiresAtMs": 1735700010000,
  "provenanceNode": "DMWE-GLS-1123"
}
```

## 19.7 Fast-Path Stream Example

Decoded from a `FastPathStream` packet:

```text
stream_token    : 0x04C2
timestamp_us    : 1735700000000123
quaternion_wxyz : [0.707, 0.0, 0.707, 0.0]  (sample 1)
                  [0.706, 0.0, 0.708, 0.0]  (sample 2)
accel_xyz       : [0.01, 9.81, 0.02]
                  [0.01, 9.80, 0.02]
```

## 19.8 Conformance

Reference examples are informative; a conformant implementation MUST produce and accept payloads consistent with the canonical schemas and their declared versions.
