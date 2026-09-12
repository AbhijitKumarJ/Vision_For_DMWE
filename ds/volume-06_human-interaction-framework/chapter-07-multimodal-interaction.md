# Chapter 7: Multimodal Interaction

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Multiple modalities combine into richer interactions.

## 7.1 Examples

```
Voice × Pointer → Select Object by Voice

Eye Tracking × Ring → Precision Pointer

Voice × Head Gesture → Silent Confirmation

Camera × EMG → Micro-Manipulation
```

## 7.2 Why Multimodal

- Each modality has strengths and weaknesses.
- Combination improves accuracy, speed, and expressiveness.
- Modalities compensate for each other (fatigue, noise, occlusion).

## 7.3 Modality Roles

| Role | Description |
|------|-------------|
| Primary | Dominant signal for the intent |
| Confirmatory | Validates the primary signal |
| Redundant | Same info via another channel |
| Augmenting | Adds detail/qualifiers |
| Alternative | Backs up when primary fails |

## 7.4 Synchronization

- Modalities MUST be time-aligned (Volume VIII, Ch 11).
- A synchronization window bounds acceptable skew.
- Out-of-window inputs are treated as separate interactions.

## 7.5 Weighting

- Each modality contributes a weight per interaction.
- Weights depend on: confidence, context, profile.
- Combined confidence is computed from weighted inputs (Volume V, Ch 12).

## 7.6 Conflict Resolution

- Conflicting modality interpretations resolve by:
  - Confidence.
  - Context (Chapter 9).
  - Modality role (primary outranks augmenting).
  - Profile preferences (Chapter 15).
- Unresolvable conflicts trigger clarification feedback (Chapter 10).

## 7.7 Fallback

- If a modality degrades, the multimodal interaction:
  - Adjusts weights.
  - Falls back to remaining modalities.
  - Or escalates for confirmation.
- Fallback MUST be transparent to the application.

## 7.8 Rules

1. Multimodal interactions MUST declare their modalities and roles.
2. Combined output MUST be an Interaction Object (Chapter 4).
3. Latency MUST meet class budgets (Volume III, Ch 9).
4. Privacy of each modality MUST be preserved.

## 7.9 Conformance

A conformant multimodal implementation MUST synchronize, weight, resolve conflicts, and fall back per these rules.
