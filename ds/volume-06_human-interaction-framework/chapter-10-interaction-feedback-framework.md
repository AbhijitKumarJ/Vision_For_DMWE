# Chapter 10: Interaction Feedback Framework

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Every interaction should generate appropriate feedback so the user always knows the system's state.

## 10.1 Feedback Channels

- Haptic
- Audio
- Visual
- Projection
- Voice
- Ambient lighting
- Wearable indicators

## 10.2 Feedback Levels

| Level | Meaning |
|-------|---------|
| Acknowledgment | Input received |
| Progress | Work in progress |
| Warning | Attention needed |
| Error | Action failed |
| Completion | Action finished |
| Confirmation | Requires/confirms consent |

## 10.3 Level Semantics

- **Acknowledgment:** immediate, low intensity (e.g., haptic tick).
- **Progress:** ongoing indication (e.g., subtle pulse).
- **Warning:** elevated intensity, interrupts.
- **Error:** distinct pattern, clear failure.
- **Completion:** positive confirmation.
- **Confirmation:** requires explicit user consent (high-impact actions).

## 10.4 Channel Selection

- Choose channels by context (no sound in meetings → haptics).
- Prefer least-intrusive channel that conveys the level.
- Channel availability depends on capabilities (Volume V).

## 10.5 Feedback Latency

- Acknowledgment MUST be near-instant (< 50 ms where possible).
- Progress updates MUST be continuous for long actions.
- Feedback MUST align with interaction lifecycle (Chapter 8).

## 10.6 Adaptive Feedback

- Feedback intensity adapts to: profile (Chapter 15), fatigue, environment.
- Feedback is customizable by the user.
- Accessibility modes may substitute channels (Chapter 14).

## 10.7 Conformance

A conformant implementation MUST provide feedback at all levels, select channels contextually, and meet feedback latency.
