# Chapter 10: Capability APIs

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Defines the standard interfaces applications and MeshOS use to interact with capabilities.

## 10.1 Core Operations

| Operation | Description |
|-----------|-------------|
| RequestCapability | Request a capability with requirements |
| ReleaseCapability | Release a binding |
| Subscribe | Subscribe to capability events/streams |
| Unsubscribe | Cancel subscription |
| QueryMetadata | Read capability metadata |
| RequestExclusiveAccess | Exclusive binding |
| ShareCapability | Delegate access to another consumer |
| NegotiateParameters | Renegotiate quality parameters |

## 10.2 RequestCapability

Request with requirements:

```json
{
  "capabilityId": "voice-recognition",
  "version": ">=2.0",
  "requirements": {
    "minAccuracy": 0.95,
    "maxLatencyMs": 50,
    "privacy": "local"
  },
  "preferences": { "energy": "low" },
  "fallback": [ { "capabilityId": "voice-intent" } ]
}
```

Response: bound capability with endpoint and QoC report.

## 10.3 ReleaseCapability

- Releases a binding and its reservations.
- MUST be idempotent.
- Triggers Resource Manager release (Volume IV, Ch 7).

## 10.4 Subscribe / Unsubscribe

- Subscribe to: capability availability, quality changes, lifecycle events, data streams.
- Streams carry backpressure (Volume IV, Ch 11).
- Unsubscribe MUST release stream resources.

## 10.5 QueryMetadata

- Read the current metadata profile (Chapter 4).
- Supports polling and change notifications.

## 10.6 RequestExclusiveAccess

- For exclusive resources (camera, projector).
- Conflicts resolve by priority (Chapter 7).
- Exclusive access MUST time out.

## 10.7 ShareCapability

- A consumer MAY delegate its binding to another authorized consumer.
- Delegation MUST respect ownership and policy (Chapter 16).
- Delegation MUST be revocable.

## 10.8 NegotiateParameters

- Adjust quality/latency/energy trade-offs on a bound capability.
- Renegotiation MUST preserve continuity (Chapter 7).

## 10.9 Capability Events

Standard event types:

- `availabilityChanged`
- `qualityChanged`
- `lifecycleChanged`
- `streamStarted` / `streamStopped`
- `contractViolation`

Events are authenticated and versioned.

## 10.10 API Stability

- APIs are versioned with capabilities.
- The Capability SDK (Volume X) wraps these for applications.
- Platform developers use the same APIs at the MeshOS level (Volume IV, Ch 23).

## 10.11 Conformance

A conformant capability MUST implement all core operations and emit standard events.
