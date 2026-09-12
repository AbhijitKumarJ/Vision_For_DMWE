# Chapter 10: Resource Coordination Protocol (RCP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 10.1 Purpose

Supports distributed resource management across the mesh.

## 10.2 Resource Types

- CPU
- GPU
- NPU
- Battery
- Storage
- Network
- Sensors

## 10.3 Operations

- Advertisement.
- Reservation.
- Allocation.
- Release.
- Migration.
- Health reporting.

## 10.4 Advertisement

- Modules publish available resources.
- Advertisements include capacity and state (Volume IV, Ch 7).
- Updates flow on state change.

## 10.5 Reservation

- Resources are reserved for pending work.
- Reservations have deadlines.
- Expired reservations are released.

## 10.6 Allocation

- Allocations bind resources to tasks (Volume IV, Ch 8).
- Allocations are scheduled and accounted.
- Over-allocation is prevented.

## 10.7 Release

- Explicit release returns resources.
- Automatic release on task completion/failure.
- Leaked resources are reclaimed by policy.

## 10.8 Migration

- Allocations may migrate between modules.
- Migration preserves task state (Volume IV, Ch 12).
- Only trusted nodes host migrations.

## 10.9 Health Reporting

- Resources report health and load.
- Health feeds the Resource Manager (Volume IV, Ch 7).
- Degraded resources reduce advertised capacity.

## 10.10 Energy Awareness

- All coordination is energy-aware (Volume IV, Ch 13).
- Battery reservations gate high-cost tasks.
- Low-power modules decline non-critical work.

## 10.11 Conformance

A conformant RCP MUST support advertisement, reservation, allocation, release, migration, and health reporting.
