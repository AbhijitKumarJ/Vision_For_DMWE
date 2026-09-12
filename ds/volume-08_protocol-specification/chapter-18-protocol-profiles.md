# Chapter 18: Protocol Profiles

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 18.1 Purpose

Different deployments have different requirements. Profiles define recommended protocol options while remaining interoperable.

## 18.2 Profile Table

| Profile | Use |
|---------|-----|
| Ultra-Low Power | Rings, bands, passive sensors |
| Interactive | Necklaces, glasses, controllers |
| High-Bandwidth | Vision modules, projectors |
| Industrial | Rugged devices, deterministic comms |
| Medical | High-integrity, audit-focused comms |

## 18.3 Ultra-Low Power Profile

- Minimal sync intervals (Chapter 11).
- Passive discovery only (Chapter 3).
- Background QoS classes only.
- Dormant sessions (Chapter 4).

## 18.4 Interactive Profile

- Real-time interaction QoS (Chapter 12).
- Active discovery on demand.
- Frequent synchronization.
- Balanced energy use.

## 18.5 High-Bandwidth Profile

- Audio/video/bulk QoS classes.
- Wired or high-rate transports preferred.
- Larger buffers and reordering windows.

## 18.6 Industrial Profile

- Deterministic communication.
- Strict ordering and reliability.
- Fixed-rate telemetry.
- Rugged transport options (Ethernet).

## 18.7 Medical Profile

- High integrity (Volume X policy).
- Full audit trail (Volume VII, Ch 15).
- Restricted QoS admission.
- Fail-safe behavior (Chapter 14).

## 18.8 Profile Negotiation

- Devices negotiate profile at session start.
- Interoperability is guaranteed across profiles.
- Mixed profiles coexist in one mesh.

## 18.9 Profile Declaration

- Profiles are declared in the Module Descriptor (Volume III, Ch 4).
- Declarations drive default behavior.
- Overrides are user-configurable.

## 18.10 Conformance

A conformant module MUST declare a profile and honor its recommended protocol options while remaining interoperable.
