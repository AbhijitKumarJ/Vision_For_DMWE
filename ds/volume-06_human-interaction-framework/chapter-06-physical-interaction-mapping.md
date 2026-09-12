# Chapter 6: Physical Interaction Mapping

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

This chapter deliberately separates **physical input** from **semantic intent**.

## 6.1 Possible Physical Inputs

- Hand gestures
- Finger movement
- Touch
- EMG
- EEG
- Eye tracking
- Voice
- Facial expressions
- Head movement
- Body posture
- Foot input
- Wearable buttons
- Air gestures

## 6.2 One Intent, Many Expressions

Multiple physical expressions MAY produce the same semantic interaction:

- "Select" may be expressed by: air click, pinch, voice, eye dwell, or button.
- "Scroll" may be expressed by: swipe, ring rotation, voice, or EMG.

This is the core enabler of substitution and accessibility.

## 6.3 Mapping Model

Each mapping defines:

- Physical expression (source).
- Semantic intent (verb + modifiers + target).
- Recognition requirements (capabilities).
- Context constraints.
- Confidence expectations.

## 6.4 Mapping Table Example

| Intent | Ring | Voice | Eye | EMG | Touch |
|--------|------|-------|-----|-----|-------|
| Select | Air Click | "select" | Dwell | Pinch | Tap |
| Scroll | Rotation | "scroll" | - | Squeeze | Swipe |
| Zoom | Pinch (air) | "zoom in" | - | - | Pinch |
| Confirm | Thumb press | "yes" | Double blink | - | Long press |
| Cancel | Shake | "no" | - | - | Swipe-back |

## 6.5 Mapping Rules

1. Mappings MUST be declared in the Interaction Registry.
2. Mappings MUST reference required capabilities.
3. Mappings MUST be validated for context applicability.
4. Conflicting mappings MUST be resolved by context and priority (Chapter 9).

## 6.6 Recognizers

- Recognizers convert physical signals to interaction candidates (Volume IV, Ch 10).
- Recognizers are capability providers.
- Each recognizer reports confidence and latency.

## 6.7 Substitution

- If a physical input becomes unavailable (e.g., ring battery dies), the intent is re-expressed via another mapping (Chapter 11).

## 6.8 Conformance

A conformant implementation MUST declare physical mappings, support multiple expressions per intent, and enforce mapping rules.
