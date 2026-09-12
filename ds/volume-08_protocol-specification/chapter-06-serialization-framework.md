# Chapter 6: Serialization Framework

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 6.1 Purpose

Specifies how structured data is encoded, enabling interoperability while allowing efficient low-power communication.

## 6.2 Encoding Modes

| Mode | Use |
|------|-----|
| Binary | Mesh traffic (default, compact) |
| JSON | Debug, profiling, tooling |
| Compact | Constrained channels |

## 6.3 Binary Encoding

- Compact, length-delimited fields.
- Canonical byte order.
- Minimal overhead for low-power radios.

## 6.4 JSON Representation

- Canonical JSON schema mirrors the binary model.
- Used for debugging, tooling, and human-readable logs.
- MUST NOT be used for high-rate mesh traffic.

## 6.5 Compact Serialization

- Drops optional/empty fields.
- Uses dictionary-based field compression.
- Applied when payload budget is tight.

## 6.6 Optional Fields

- Every field has a defined default.
- Absent fields resolve to defaults.
- Additive changes preserve compatibility.

## 6.7 Compression

- Compression is negotiated per message type.
- Compressed payloads MUST be flagged.
- Lossless compression only.

## 6.8 Schema Evolution

- Schemas are versioned.
- Producers MAY add fields; consumers MUST ignore unknown fields.
- Removal requires a major version change.
- Version negotiation MUST be backward compatible (Volume IV, Ch 5).

## 6.9 Canonical Formats

- Module Descriptors: canonical binary + JSON (Volume III, Ch 4).
- Capability metadata (Volume V, Ch 4).
- Context facts (Volume VII, Ch 5).

## 6.10 Conformance

A conformant implementation MUST support binary encoding, the JSON representation, version tolerance, and schema evolution rules.
