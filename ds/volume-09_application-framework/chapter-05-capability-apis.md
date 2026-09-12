# Chapter 5: Capability APIs

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 5.1 Purpose

Applications request capabilities rather than devices.

## 5.2 API Operations

- Discovery.
- Reservation.
- Shared access.
- Exclusive access.
- Capability subscriptions.
- Metadata queries.
- Quality requirements.
- Release.

## 5.3 Discovery

- Query the Capability Registry (Volume V, Ch 2).
- Filter by type, quality, trust, proximity.
- Discovery is capability-graph-aware.

## 5.4 Reservation

- Reserve a capability for pending work.
- Reservations have deadlines.
- Expired reservations are released.

## 5.5 Shared Access

- Multiple consumers share a capability.
- Sharing follows access policy (Volume V, Ch 9).
- Consumers are notified of state change.

## 5.6 Exclusive Access

- Single consumer for a period.
- Other consumers queue or are denied.
- Exclusive access is time-limited.

## 5.7 Capability Subscriptions

- Subscribe to capability state changes.
- Updates flow via CEP (Volume VIII, Ch 7).
- Subscriptions are low-cost.

## 5.8 Metadata Queries

- Query descriptor metadata (Volume III, Ch 4).
- Quality of Capability data (Volume V, Ch 11).
- Version and compatibility info.

## 5.9 Quality Requirements

- Declare minimum quality (latency, resolution, confidence).
- The framework selects qualifying providers (Volume V, Ch 7).
- Quality is renegotiated on change.

## 5.10 Release

- Explicit release returns the capability.
- Auto-release on component stop.
- Leaked access is reclaimed.

## 5.11 Conformance

A conformant implementation MUST support the capability API operations with quality and access semantics.
