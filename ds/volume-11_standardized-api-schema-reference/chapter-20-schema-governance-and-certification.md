# Chapter 20: Schema Governance & Certification

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 20.1 Purpose

Schemas are long-lived public contracts. This chapter defines how they are governed, extended, and certified (Volume X).

## 20.2 Schema Registry

The Schema Registry is the authoritative store of:

- Canonical `.proto`, `.ts`, and `.json` definitions.
- Version history and fingerprints (Chapter 4).
- Test vector corpora (Chapter 18).
- Deprecation and lifecycle state.

## 20.3 Change Process

| Change Type | Process |
|-------------|---------|
| PATCH | Editorial, no semantics change |
| MINOR | Additive fields; backward compatible |
| MAJOR | Breaking; requires ecosystem migration plan |

- All changes MUST be reviewed by the standards body (Volume X, Ch 3).
- Breaking changes MUST be announced one release cycle in advance.

## 20.4 Extension Model

- Vendors MAY extend schemas by adding fields; unknown fields are tolerated.
- Vendor extensions MUST use the reserved extension namespace.
- Proprietary fields MUST NOT replace canonical behavior.

## 20.5 Certification

- A certified implementation MUST pass the conformance corpus for its declared versions.
- Certification is tied to specific schema `MAJOR.MINOR` versions.
- Certification status is recorded in the Ecosystem Registry (Volume X, Ch 11).

## 20.6 Interoperability

- Two implementations are interoperable at a schema version pair that both support.
- The registry publishes compatibility matrices for all released versions.
- A module MUST declare its supported schema range during negotiation.

## 20.7 Roadmap

- The registry tracks adoption of new majors and sunsetting of old ones.
- Legacy schema versions MAY be retired per Volume X policy.
- Retirement MUST preserve the ability to decode archived data.

## 20.8 Conformance

A conformant implementation MUST declare supported schema versions, pass the conformance corpus, and follow the extension and deprecation rules.
