# Chapter 7: Capability Negotiation

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 7.1 Requirements-Based Selection

Applications request capabilities with specific characteristics. MeshOS selects the best provider.

## 7.2 Example

> Need: Voice Recognition
> Accuracy > 95%
> Latency < 50 ms
> Privacy = Local

MeshOS finds a provider meeting all three constraints.

## 7.3 Negotiation Inputs

| Input | Description |
|-------|-------------|
| Requirements | Hard constraints (MUST satisfy) |
| Preferences | Soft constraints (weighted) |
| Fallback | Acceptable degraded options |
| Priority | Criticality of the request |

## 7.4 Requirements

- Requirements MUST be declared as hard constraints.
- Providers failing a hard requirement MUST be excluded.
- Examples: minimum accuracy, maximum latency, privacy class.

## 7.5 Preferences

- Preferences are weighted soft constraints.
- Examples: prefer lowest energy, prefer nearest provider.
- The selection algorithm maximizes weighted satisfaction.

## 7.6 Fallback

- Consumers declare acceptable fallbacks:
  - Different provider (same capability).
  - Different capability (lower fidelity).
- Fallback MUST be transparent and reported.

## 7.7 Negotiation Protocol

1. Consumer issues request (requirements + preferences).
2. Registry filters candidates.
3. MeshOS ranks by QoC and policy.
4. Reservation is attempted on the best candidate.
5. On success: bound. On failure: next candidate or fallback.
6. Consumer notified of outcome and quality.

## 7.8 Conflict Resolution

- When demand exceeds supply, allocation follows:
  - Priority class (Critical > Interactive > Background).
  - Existing reservations.
  - Policy (Volume X).
- Conflicts MUST be resolved deterministically.

## 7.9 Selection Algorithms

Supported policies (Volume IV, Ch 13 routing):

- Nearest.
- Fastest.
- Most secure.
- Lowest power.
- Highest quality.
- Balanced (weighted mix).

## 7.10 Renegotiation

- Consumers MAY renegotiate on quality change.
- MeshOS MUST renegotiate on provider loss.
- Renegotiation MUST preserve interaction continuity (Volume IV, Ch 12).

## 7.11 Conformance

A conformant negotiation MUST honor hard requirements, rank by preferences/policy, support fallback, and resolve conflicts deterministically.
