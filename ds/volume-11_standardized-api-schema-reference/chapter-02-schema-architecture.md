# Chapter 2: Schema Architecture & Conventions

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 2.1 Purpose

Every DMWE contract is expressed as a typed schema so that routing, QoS, and security managers can process packets without deserializing the semantic payload, and applications can compile against validated type definitions.

## 2.2 Two Canonical Representations

| Form | Use | Authoritative On |
|------|-----|------------------|
| Protobuf v3 | Binary wire format | Mesh traffic |
| TypeScript | Application SDK types | Application code |
| JSON Schema | Tooling, debugging, validation | Developer tooling |

The three forms MUST stay semantically aligned. Divergence between them is a specification defect and MUST be reported through the schema governance process (Chapter 20).

## 2.3 Package & Namespace Conventions

Protobuf packages use a three-part namespace rooted at `dmwe`:

- `dmwe.core` — envelopes, QoS, payload types.
- `dmwe.hardware` — module descriptors, resources, spatial identity.
- `dmwe.capability` — advertisements, QoC, fusion.
- `dmwe.interaction` — grammar enums, Interaction Object.
- `dmwe.context` — Context Facts, graph schemas.
- `dmwe.session` — sessions, security, trust.
- `dmwe.fastpath` — Direct Stream and Fast-Path Binding.

TypeScript interfaces mirror these namespaces as modules under a single SDK root (Chapter 16).

## 2.4 Naming Conventions

- Messages use PascalCase; fields use snake_case in Protobuf and camelCase in TypeScript.
- Enums use SCREAMING_SNAKE_CASE with a stable prefix (`QOS_`, `TYPE_`, `VERB_`, `LAYER_`).
- The zero value of every enum MUST be a `*_UNKNOWN` sentinel to guarantee default safety.
- String identifiers (capability IDs, module IDs) use lowercase dot-separated reverse-domain style, e.g. `interaction.pointer.precision`.

## 2.5 Field Numbering

- Field numbers are immutable once published (Chapter 4).
- Numbers 1–15 use one byte on the wire; they SHOULD be reserved for high-frequency fields.
- Numbers 16–2047 use two bytes.
- Reserved ranges MUST be declared in the schema file with `reserved`.

## 2.6 Optionality & Defaults

- Every field has a defined default.
- Absent fields resolve to their default value; receivers MUST NOT treat a default as an error.
- `oneof` groups MUST have exactly one member set.
- `repeated` fields MUST default to an empty collection.

## 2.7 Timestamps & Units

- Wall-clock timestamps are UNIX epoch milliseconds, `uint64`, mesh-synchronized (Volume VIII, Ch 11).
- Fast-Path stream timestamps use UNIX epoch microseconds for sub-millisecond precision.
- Spatial vectors use the canonical DMWE coordinate frame (Volume III, Ch 10).
- Scalar units MUST be declared in field comments and MUST NOT change without a schema version change.

## 2.8 Conformance

A conformant schema definition MUST follow the package, naming, field-numbering, and optionality rules in this chapter.
