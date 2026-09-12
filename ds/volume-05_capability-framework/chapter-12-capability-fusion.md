# Chapter 12: Capability Fusion

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Rather than sensor fusion, DMWE performs **capability fusion** — combining whole capabilities into richer ones.

## 12.1 Examples

```
Pointer × Voice → Voice Pointer

Camera × Depth → Object Manipulation

Display × Haptics → Immersive Feedback
```

## 12.2 Fusion vs Composition

- **Composition** (Chapter 8) chains/parallels capabilities generally.
- **Fusion** is a specific composition type that merges concurrent inputs into one output stream.

Fusion produces a capability whose output is a weighted combination of inputs.

## 12.3 Fusion Rules

A fusion MUST:

1. Declare input capabilities and roles.
2. Define the fusion function (algorithm).
3. Declare output format and semantics.
4. Specify confidence combination.
5. Define conflict handling.

## 12.4 Confidence Combination

### 12.4.1 Confidence Combination Formulas

The combined confidence is computed using one of the declared fusion rules:

| Rule | Formula | When to Use |
|------|---------|-------------|
| **Weighted Average** | `C_out = Σ(w_i × C_i) / Σ(w_i)` | Normal operation; multiple reliable inputs |
| **Maximum** | `C_out = max(C_1, ..., C_n)` | When the best input should dominate |
| **Minimum** | `C_out = min(C_1, ..., C_n)` | Safety-critical; all inputs must agree |
| **Probabilistic (Bayesian)** | `C_out = P(H|E_1,...,E_n)` | When inputs are statistically independent |
| **Product** | `C_out = Π(C_i)` | When all inputs must be correct simultaneously |

### 12.4.2 Confidence Bounds

- Combined confidence MUST be bounded to [0.0, 1.0].
- If the fusion formula produces a value outside bounds, it MUST be clamped.
- Combined confidence MUST NOT exceed the maximum input confidence (no confidence amplification).
- Combined confidence MUST NOT be less than the minimum input confidence divided by the number of inputs (no confidence dilution beyond averaging).

### 12.4.3 Confidence Degradation Rules

| Input State | Action |
|-------------|--------|
| One input below threshold (0.3) | Exclude from fusion; recompute with remaining inputs |
| Multiple inputs below threshold | Degrade to single best input; notify consumer |
| All inputs below threshold | Withhold fusion output; trigger clarification |
| Input timeout (>2× expected interval) | Mark input stale; exclude from fusion |

## 12.5 Timing & Synchronization

### 12.5.1 Fusion Window

- All inputs within the **fusion window** are considered simultaneous.
- Default fusion window: 50 ms for Interactive class, 100 ms for Responsive class.
- Inputs arriving outside the window are processed as separate fusion events.

### 12.5.2 Skew Tolerance

| Fusion Type | Max Skew | Action on Exceedance |
|-------------|----------|----------------------|
| Pointer fusion | 5 ms | Drop late input; log event |
| Voice + gesture | 200 ms | Extend window; flag for review |
| Camera + depth | 10 ms | Drop late input; use last known value |
| Haptic + visual | 3 ms | Drop late input; maintain last output |

### 12.5.3 Timestamp Authority

- The fusion output timestamp is the **latest input timestamp** within the fusion window.
- This ensures the output reflects the most recent sensor state.

## 12.6 Degradation

### 12.6.1 Degradation Modes

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Graceful** | One input lost | Recompute weights; continue with reduced quality |
| **Fallback** | Two+ inputs lost | Revert to simpler capability (e.g., Voice Pointer → Pointer) |
| **Emergency** | Safety-critical input lost | Withhold output; notify user; enter safe state |

### 12.6.2 Weight Adjustment on Degradation

When an input is lost:
1. Remaining weights are renormalized: `w_i_new = w_i / Σ(w_remaining)`.
2. Combined confidence is recalculated with remaining inputs.
3. Consumer is notified of quality change via QoC update.

## 12.7 Conflict Handling

### 12.7.1 Conflict Detection

A conflict exists when two or more inputs express contradictory values for the same output dimension (e.g., two pointers disagree on position by more than the conflict threshold).

| Output Dimension | Conflict Threshold |
|------------------|-------------------|
| Position (x, y, z) | > 5 cm or > 2° angular |
| Rotation (quaternion) | > 10° angular |
| Scalar value | > 20% of range |
| Boolean | Any disagreement |

### 12.7.2 Conflict Resolution

```
RESOLVE_FUSION_CONFLICT(inputs[]):
  1. CHECK confidence
     - If max_confidence - min_confidence > 0.2
       → use highest-confidence input
  2. CHECK context relevance
     - Score each input against current context
     - Use highest-scoring input
  3. CHECK declared arbitration policy
     - PRIMARYdominates: use the input from the primary modality
     - LATESTdominates: use the most recent input
     - AVERAGE: average the conflicting values
     - ESCALATE: request user clarification
  4. If still unresolved → withhold output; log conflict
```

## 12.8 Fusion Providers

- Fusion runs on the node with best access to inputs (MeshOS placement).
- The fusion result is a new capability with its own metadata.

## 12.9 Conformance

A conformant fusion MUST declare inputs and rules, combine confidence, stay time-aligned, and degrade honestly.
