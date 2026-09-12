# Chapter 20: Compliance Requirements

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Defines what is required for each stakeholder to be considered DMWE-compliant in the capability framework.

## 20.1 Stakeholders

- **Hardware providers** — modules exposing capabilities.
- **MeshOS** — capability orchestration.
- **Applications** — capability consumers.
- **Extensions** — third-party capabilities.
- **Marketplace** — capability distribution.

## 20.2 Hardware Provider Compliance

A hardware provider MUST:

1. Advertise capabilities truthfully (Volume III, Ch 5).
2. Publish complete, accurate metadata (Chapter 4).
3. Implement the full lifecycle (Chapter 5).
4. Honor capability contracts (Chapter 2).
5. Enforce security and privacy (Chapter 16).
6. Report QoC honestly (Chapter 11).
7. Support monitoring (Chapter 17).
8. Pass conformance testing (Volume III, Ch 15).

## 20.3 MeshOS Compliance

A MeshOS MUST:

1. Host a Capability Manager (Volume IV, Ch 6).
2. Maintain a consistent registry (Chapter 6).
3. Negotiate per requirements (Chapter 7).
4. Route per policy (Chapter 13).
5. Support composition and fusion (Chapters 8, 12).
6. Enforce security (Chapter 16).
7. Validate QoC (Chapter 11).
8. Virtualize transparently (Chapter 14).

## 20.4 Application Compliance

An application MUST:

1. Request capabilities by ID, never by device.
2. Handle lifecycle events and degradation.
3. Respect privacy classes.
4. Release capabilities when done.
5. Not bypass the Capability SDK.

## 20.5 Extension & Marketplace Compliance

Extensions MUST:

1. Follow the Extension Framework (Chapter 19).
2. Be signed and certified.
3. Pass testing.
4. Enforce sandboxing and permissions.

## 20.6 Conformance Testing

- Reference conformance suite (Volume X).
- Interoperability tests across providers.
- QoC validation.
- Security review.

## 20.7 Compliance Tiers

| Tier | Scope |
|------|-------|
| Capability Core | Metadata, lifecycle, interface |
| Capability Standard | Core + discovery, negotiation, security |
| Capability Full | Standard + composition, fusion, virtualization, marketplace |

## 20.8 Summary

Compliance makes the capability framework trustworthy: applications rely on capabilities, providers rely on honest evaluation, and the ecosystem remains interoperable.
