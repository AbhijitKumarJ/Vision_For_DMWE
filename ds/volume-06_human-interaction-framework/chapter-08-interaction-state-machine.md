# Chapter 8: Interaction State Machine

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Every interaction progresses through defined states.

## 8.1 State Diagram

```
Idle
   ↓
Detected
   ↓
Recognized
   ↓
Validated
   ↓
Contextualized
   ↓
Executed
   ↓
Confirmed
   ↓
Completed
   ↓
Archived
```

## 8.2 State Definitions

| State | Description |
|-------|-------------|
| Idle | No interaction in progress |
| Detected | Physical signal observed |
| Recognized | Parsed into grammar (Ch 3) |
| Validated | Schema + policy checks passed |
| Contextualized | Meaning resolved by context (Ch 9) |
| Executed | Application performed the action |
| Confirmed | Feedback/acknowledgment received |
| Completed | Interaction finished |
| Archived | History stored (Ch 16) |

## 8.3 Recovery Paths

Recovery handles:

- **Cancellation** — user aborts (Cancelled state).
- **Timeout** — no confirmation (Expired state).
- **Ambiguity** — multiple interpretations (Clarification state).
- **Interruption** — a higher-priority interaction takes over (Interrupted state).

```
Detected → Recognized → Validated → Contextualized
   ↓            ↓           ↓            ↓
 Cancelled   Expired   Clarification  Interrupted
```

## 8.4 Transitions & Events

- Each transition MUST emit a lifecycle event (Volume V, Ch 5).
- Events carry the Interaction Object ID.
- Applications track interactions via events.

## 8.5 Escalation

- Low-confidence or high-impact interactions escalate to Confirmation before Executed.
- Escalation requires explicit user feedback (Chapter 10).

## 8.6 Distributed State

- Interaction state is distributed (Volume IV, Ch 12).
- If a provider fails mid-interaction, another module resumes from the current state.

## 8.7 Conformance

A conformant implementation MUST implement all states, recovery paths, events, and escalation rules.
