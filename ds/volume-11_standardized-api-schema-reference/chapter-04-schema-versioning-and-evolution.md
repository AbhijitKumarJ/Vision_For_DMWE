# Chapter 4: Schema Versioning & Evolution

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 4.1 Purpose

Schemas are living contracts. This chapter defines how they evolve without breaking existing modules, applications, or tooling.

## 4.2 Versioning Model

- Every schema file carries a semantic version `MAJOR.MINOR.PATCH`.
- Schema versions are independent of product firmware versions.
- The Schema Registry (Chapter 20) is the authoritative record of all versions.

## 4.3 Backward-Compatible Changes

A change is backward compatible if all valid older messages remain valid and interpretable. Compatible changes include:

- Adding a new field with a new number.
- Adding a new enum value.
- Relaxing an optionality constraint.
- Extending a `oneof`.

Producers MAY add fields; consumers MUST ignore unknown fields and unknown enum values.

## 4.4 Breaking Changes

The following changes are breaking and require a `MAJOR` version bump:

- Removing or renaming a field.
- Reusing a field number with a different type.
- Changing an enum value's meaning.
- Tightening an optionality constraint.
- Changing units or coordinate frames.

## 4.5 Field Deprecation

- Deprecated fields MUST be declared with `reserved` to prevent reuse.
- Deprecated fields MUST remain decodable for one full `MAJOR` version cycle.
- New producers SHOULD stop emitting deprecated fields.

## 4.6 Version Negotiation

- Version negotiation MUST be backward compatible (Volume IV, Ch 5; Volume VIII, Ch 7).
- When a version mismatch is detected, the highest mutually compatible `MAJOR` version is selected.
- Failing negotiation MUST result in a schema error, not silent truncation.

## 4.7 Schema Fingerprints

- Every schema revision is identified by a cryptographic fingerprint (SHA-256) of the canonical definition.
- Fingerprints are exchanged during capability negotiation so consumers can verify exact compatibility.
- A mismatch between expected and received fingerprints MUST abort the exchange.

## 4.8 Conformance

A conformant implementation MUST ignore unknown fields, honor reserved ranges, negotiate versions backward-compatibly, and verify schema fingerprints during capability exchange.
