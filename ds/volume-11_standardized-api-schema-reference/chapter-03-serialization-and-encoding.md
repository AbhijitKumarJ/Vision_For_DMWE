# Chapter 3: Serialization & Encoding

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 3.1 Purpose

Defines how structured payloads are encoded so that low-power radios, hubs, and tooling interoperate without ambiguity.

## 3.2 Encoding Modes

| Mode | Use |
|------|-----|
| Binary (Protobuf v3) | Default mesh traffic encoding |
| Canonical JSON | Debugging, profiling, developer tooling |
| Compact | Constrained low-bandwidth channels |

## 3.3 Binary Encoding

- Encoded using the canonical Protobuf v3 wire format defined by the schemas in this volume.
- Field numbers and types are fixed by the schema; a decoder MUST ignore unknown fields (Chapter 4).
- Length-delimited fields MUST use the standard varint length prefix.

## 3.4 Canonical JSON Representation

- Each message has a canonical JSON form that mirrors the Protobuf schema.
- Field names use the camelCase form when converted to JSON.
- Timestamps are emitted as integer milliseconds.
- Canonical JSON MUST NOT be used for high-rate mesh traffic.

## 3.5 Compact Encoding

- The compact mode drops unset optional fields and default-valued scalar fields.
- Repeated high-frequency numeric streams (e.g., FastPath) use packed arrays.
- A compact message MUST remain decodable by the same schema.

## 3.6 Envelope Framing

- Every payload travels inside a `MeshEnvelope` (Chapter 5) unless a Fast-Path Binding is active (Chapter 13).
- The envelope header contains the fields required for routing and QoS, so intermediate nodes MUST NOT deserialize the payload.
- A payload whose `payload_type` is unrecognized MUST be dropped and counted in telemetry.

## 3.7 Compression

- Compression is negotiated per message type and MUST be flagged in the envelope.
- Only lossless compression is permitted.
- Compression MUST NOT be applied to already-compressed payload types.

## 3.8 Checksum & Integrity

- Every frame carries a checksum computed over the encoded bytes.
- Integrity protection is mandatory for signed payloads (Chapter 14).

## 3.9 Conformance

A conformant implementation MUST encode using the canonical Protobuf binary form, support the canonical JSON form for tooling, ignore unknown fields, and honor the envelope framing rules.
