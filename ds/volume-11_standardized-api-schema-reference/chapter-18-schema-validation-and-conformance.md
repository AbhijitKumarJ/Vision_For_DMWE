# Chapter 18: Schema Validation & Conformance

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 18.1 Purpose

Schemas are only valuable if implementations provably respect them. This chapter defines validation requirements and the conformance approach (Volume X, Ch 8).

## 18.2 Validation Requirements

- All inbound payloads MUST be validated against the canonical schema for their `payload_type`.
- Invalid payloads MUST be rejected, logged, and counted in telemetry.
- Validation MUST NOT be skipped on the Fast-Path for integrity reasons (Chapter 13); structural checks are minimal there by design.
- Unknown fields MUST be ignored, not rejected.

## 18.3 Validation Layers

| Layer | What it checks |
|-------|----------------|
| Structural | Schema conformance, required fields, value ranges |
| Semantic | Valid enum combos, consistent units, privacy class |
| Integrity | Signatures, MACs, fingerprint matches |

## 18.4 Conformance Test Vectors

- The Schema Registry distributes a **test vector corpus** for every schema.
- Each vector includes: valid positive cases, invalid negative cases, and boundary cases.
- Implementations MUST pass the full corpus for their declared schema version.

## 18.5 Version Rollout

- A conformant implementation MUST state the schema `MAJOR.MINOR` it supports.
- Interoperability is defined at the negotiated version pair (Chapter 4).
- Failing negotiation MUST NOT silently proceed.

## 18.6 Monitoring

- Validation failure rates are part of mandatory telemetry (Chapter 15).
- Sustained failure anomalies MUST trigger health events.

## 18.7 Conformance

A conformant implementation MUST validate all inbound payloads, ignore unknown fields, pass the test vector corpus, and declare its supported schema versions.
