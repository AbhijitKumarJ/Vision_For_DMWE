# Chapter 14: Accessibility Framework

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Interactions must be inclusive. Accessibility is a **first-class design principle**, not an add-on.

## 14.1 Accessibility Support

- **One-handed operation** — all interactions reachable one-handed.
- **Voice-only workflows** — full workflows without touch.
- **Eye-only interaction** — control via gaze.
- **EMG control** — muscle-signal input.
- **Switch devices** — assistive switches.
- **Adjustable sensitivity** — per-user thresholds.
- **Custom interaction profiles** — personalized mappings.

## 14.2 Principle: Equivalent Access

- Every interaction MUST have at least one alternative physical expression (Chapter 6).
- No capability-dependent interaction may be inaccessible to a user.
- Substitution MUST be transparent (Chapter 11).

## 14.3 Accessibility Modes

| Mode | Description |
|------|-------------|
| Reduced mobility | Switch/voice/eye priority |
| Vision impaired | Audio/haptic feedback priority |
| Hearing impaired | Visual/haptic feedback priority |
| Cognitive | Simplified workflows, confirmations |
| Temporary | Injury recovery, dominant-hand switch |

## 14.4 Implementation

- The system detects/selects an accessibility profile.
- Recognizer thresholds adjust per mode.
- Feedback channels substitute (Chapter 10).
- Interaction profiles reflect the mode (Chapter 15).

## 14.5 Guarantees

1. All core interactions accessible via ≥ 2 modalities.
2. Feedback available in ≥ 2 channels.
3. Timing allows slower inputs (adjustable timeouts).
4. No interaction is blocked by physical limitation.

## 14.6 Conformance

A conformant implementation MUST provide equivalent access, support accessibility modes, and honor adjustable sensitivity.
