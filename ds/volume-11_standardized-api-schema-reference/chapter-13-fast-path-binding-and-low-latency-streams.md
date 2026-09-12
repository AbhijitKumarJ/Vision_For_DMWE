# Chapter 13: Fast-Path Binding & Low-Latency Streams

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 13.1 Purpose

Multi-hop semantic graph resolution is too slow for sub-10 ms tasks such as high-refresh AR pointer tracking. **Fast-Path Binding** (also called **DirectStream**) establishes a direct, low-overhead link between a sensor driver and a consumer's render loop, bypassing the semantic intent pipeline after the initial handshake (Volume IV, Ch 10; Volume V, Ch 13).

## 13.2 Binding Handshake

```protobuf
syntax = "proto3";
package dmwe.fastpath;

message DirectStreamRequest {
  string interaction_id = 1;
  string capability_id = 2;      // e.g. "interaction.pointer.precision"
  string consumer_node_id = 3;
  uint32 target_hz = 4;          // e.g. 1000
  uint32 max_latency_us = 5;     // e.g. 8000
}

message DirectStreamGrant {
  string grant_id = 1;
  uint32 stream_token = 2;       // short token used on every packet
  string provider_node_id = 3;
  uint32 granted_hz = 4;
  uint64 valid_until_ms = 5;
  bytes transport = 6;           // negotiated direct transport params
}
```

- The MeshOS negotiates the binding using the consumer's negotiated `InteractionObject` subscription (Volume IX, Ch 6).
- The grant is revocable; revocation MUST be honored within one latency budget.

## 13.3 Direct Stream Packet (Optimized for Wire)

```protobuf
// Sent directly from the sensor driver to the consumer render loop.
// Bypasses the Semantic Intent Engine after initial handshake.
message FastPathStream {
  uint32 stream_token = 1;       // Short token negotiated via MeshOS
  uint64 timestamp_us = 2;       // Microsecond precision

  // Highly packed arrays for 1000Hz+ polling rates.
  repeated float quaternion_wxyz = 3;
  repeated float accel_xyz = 4;
}
```

## 13.4 Packet Semantics

- `stream_token` MUST match a valid `DirectStreamGrant`.
- Packets carry microsecond timestamps for motion-to-photon correlation.
- The quaternion is packed as a 4-float WXYZ array; accel as a 3-float XYZ array.
- A stream MAY interleave multiple samples per packet at high rates.

## 13.5 Lifecycle & Escalation

1. Consumer negotiates a Fast-Path Binding.
2. Provider streams raw or lightly fused data directly.
3. MeshOS monitors health; degradation triggers fallback to the semantic path.
4. On completion, the binding is released and the token invalidated.

## 13.6 Security

- Fast-Path packets MUST be integrity-protected with minimal overhead.
- Payload confidentiality MAY be disabled under an explicit low-latency security profile (Volume VIII, Ch 13).
- Tokens MUST be single-use and short-lived.

## 13.7 Conformance

A conformant implementation MUST support the binding handshake, honor token validity, maintain microsecond timestamps, and cleanly revert to the semantic path on revocation.
