# Chapter 20: Conformance & Certification

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Defines compliance requirements for interaction stakeholders.

## 20.1 Compliance Scope

- Interaction recognizers
- MeshOS implementations
- Applications
- Hardware modules
- Accessibility support
- AI-assisted interaction

## 20.2 Recognizer Compliance

A recognizer MUST:

1. Map physical inputs to grammar (Chapter 6).
2. Report confidence and latency.
3. Support substitution (Chapter 11).
4. Respect profile sensitivity (Chapter 15).
5. Pass interaction test suites.

## 20.3 MeshOS Compliance

A MeshOS MUST:

1. Run the HIL pipeline (Chapter 2).
2. Emit standard Interaction Objects (Chapter 4).
3. Implement the state machine (Chapter 8).
4. Interpret contextually (Chapter 9).
5. Provide feedback framework (Chapter 10).
6. Maintain the Interaction Graph (Chapter 16).
7. Support adaptation and profiles.

## 20.4 Application Compliance

An application MUST:

1. Consume Interaction Objects, not device events.
2. Handle lifecycle events (Chapter 19).
3. Honor profiles and context.
4. Provide honest feedback.

## 20.5 Hardware Module Compliance

A module MUST:

1. Provide recognizers as capabilities (Volume III, Ch 5).
2. Declare physical mappings.
3. Support accessibility alternatives.

## 20.6 Accessibility Compliance

- All core interactions MUST have ≥ 2 physical expressions (Chapter 14).
- Feedback MUST be available in ≥ 2 channels.

## 20.7 AI-Assisted Compliance

- Explicit vs assist boundaries MUST be enforced (Chapter 12).
- Suggestions MUST be marked and explainable.

## 20.8 Test Suites

- Reference interaction test suite (Volume X).
- Cross-device consistency tests.
- Multimodal synchronization tests.
- Accessibility verification.

## 20.9 Certification

- Certified implementations MAY claim HIF compliance.
- Recertification on material changes (Volume III, Ch 15).

## 20.10 Summary

Conformance ensures interactions behave consistently — and accessibly — across every device and vendor in the ecosystem.
