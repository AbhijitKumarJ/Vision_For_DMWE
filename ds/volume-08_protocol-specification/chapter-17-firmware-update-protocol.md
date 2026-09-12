# Chapter 17: Firmware Update Protocol (FUP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 17.1 Purpose

Defines secure distributed updates.

## 17.2 Update Topics

- Update discovery.
- Dependency resolution.
- Chunked transfer.
- Signature verification.
- Staged rollout.
- Rollback.
- Resume after interruption.
- Multi-module coordination.

## 17.3 Update Discovery

- Modules discover available updates.
- Discovery sources: coordinator, hub, cloud (Volume IV, Ch 20).
- Update availability respects profile (Chapter 18).

## 17.4 Dependency Resolution

- Updates declare dependencies and versions.
- The mesh resolves a consistent update set.
- Unresolvable dependencies block the update.

## 17.5 Chunked Transfer

- Firmware transfers as chunks (bulk QoS, Chapter 12).
- Chunks verify individually.
- Checkpointing enables resume.

## 17.6 Signature Verification

- Updates MUST be cryptographically signed.
- Signatures verify before installation.
- Unsigned updates are rejected.

## 17.7 Staged Rollout

- Rollout proceeds in stages.
- Each stage validates before advancing.
- Failure halts the rollout.

## 17.8 Rollback

- Failed updates roll back to prior version.
- Rollback is automatic on boot failure.
- Previous version is retained until stable.

## 17.9 Resume After Interruption

- Interrupted transfers resume from the last checkpoint.
- No full re-transfer required.
- Resume survives transport change.

## 17.10 Multi-Module Coordination

- Coordinated updates avoid mesh inconsistency.
- Modules update in dependency order.
- Safety-critical modules update during idle.

## 17.11 Energy Awareness

- Updates gate on battery (Volume IV, Ch 13).
- Low-battery modules defer non-critical updates.
- Wired power is preferred for large updates.

## 17.12 Conformance

A conformant FUP MUST support signed chunked updates, dependency resolution, staged rollout, rollback, and resume.
