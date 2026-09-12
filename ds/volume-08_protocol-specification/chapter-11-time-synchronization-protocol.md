# Chapter 11: Time Synchronization Protocol

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 11.1 Purpose

Precise timing is essential for sensor fusion and interaction. This protocol underpins the interaction framework (Volume VI) and context framework (Volume VII).

## 11.2 Timing Topics

- Global time.
- Local clocks.
- Drift correction.
- Timestamp formats.
- Synchronization intervals.
- Latency compensation.
- Event ordering.

## 11.3 Global Time

- A mesh reference time is elected.
- All modules reference global time.
- Global time is monotonic within the mesh.

## 11.4 Local Clocks

- Each module keeps a local clock.
- Local clocks are steered to global time.
- No local clock MAY run uncorrected indefinitely.

## 11.5 Drift Correction

- Periodic sync messages measure offset and drift.
- Corrections are applied smoothly (no jumps).
- High-precision devices offer reference time.

## 11.6 Timestamp Formats

- Canonical timestamp format defined.
- Nanosecond precision for high-rate sensors.
- Compact formats for low-power traffic.

## 11.7 Synchronization Intervals

- Intervals are profile-dependent (Chapter 18).
- High-bandwidth/interactive modules sync more often.
- Low-power modules sync at minimum rate.

## 11.8 Latency Compensation

- Message latency is measured and compensated.
- Timestamps are corrected for transit.
- Compensation is reported where relevant.

## 11.9 Event Ordering

- Events order by global timestamp.
- Ties break by sender ID.
- Causal order is preserved for dependent events.

## 11.10 Conformance

A conformant implementation MUST support global time, drift correction, canonical timestamps, latency compensation, and event ordering.
