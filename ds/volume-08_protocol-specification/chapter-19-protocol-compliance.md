# Chapter 19: Protocol Compliance

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 19.1 Scope

Defines conformance requirements for protocol implementations.

## 19.2 Subject Entities

- Hardware modules.
- MeshOS implementations.
- Capability providers.
- Communication gateways.
- Diagnostic tools.
- Certification laboratories.

## 19.3 Hardware Modules

- MUST implement the protocol stack (Chapter 2).
- MUST support MDP, SMP, CEP (Chapters 3, 4, 7).
- MUST support the required QoS classes (Chapter 12).
- MUST declare a profile (Chapter 18).

## 19.4 MeshOS Implementations

- MUST implement routing and QoS (Chapter 12).
- MUST implement time synchronization (Chapter 11).
- MUST implement fault handling (Chapter 14).
- MUST expose diagnostics (Chapter 16).

## 19.5 Capability Providers

- MUST implement CEP (Chapter 7).
- MUST advertise accurate metadata (Volume V).
- MUST honor version negotiation.

## 19.6 Communication Gateways

- MUST implement transport adapters (Chapter 15).
- MUST preserve protocol semantics across transports.
- MUST implement security gating (Chapter 13).

## 19.7 Diagnostic Tools

- MUST consume telemetry (Chapter 16).
- MUST respect privacy controls.
- MUST NOT alter production traffic.

## 19.8 Certification Laboratories

- MUST run the interoperability test suite.
- MUST verify compliance tiers.
- MUST maintain audit records.

## 19.9 Interoperability Test Cases

- Discovery and pairing flow.
- Session lifecycle.
- Capability advertisement.
- Interaction event delivery.
- Context synchronization.
- Time sync accuracy.
- QoS delivery bounds.
- Security handshakes.
- Firmware update flow.
- Fault recovery scenarios.

## 19.10 Declaration

- Implementations MUST declare compliance level.
- Declarations are machine-readable and auditable (Volume VII, Ch 20).

## 19.11 Conformance

A conformant implementation MUST meet the conformance requirements for its entity class.
