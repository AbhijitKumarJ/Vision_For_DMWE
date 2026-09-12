# Chapter 9: Context-Aware Interpretation

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

The same interaction can have different meanings depending on context.

## 9.1 Context-Dependent Meaning

```
Swipe → Reading        → Next Page
Swipe → Presentation   → Next Slide
Swipe → Music          → Next Track
```

The physical gesture is identical; the intent differs by context.

## 9.2 Context Sources

| Source | Examples |
|--------|----------|
| Application context | Current app, focused element |
| User activity | Walking, driving, presenting |
| Environmental context | Location, lighting, noise |
| Social context | Alone, meeting, collaborating |
| Device state | Battery, available capabilities |
| Time | Time of day, schedule |
| Privacy | Current privacy posture |

## 9.3 Interpretation Pipeline

1. Recognition produces an interaction candidate.
2. Context snapshot is attached (Volume VII).
3. Candidate is disambiguated by context.
4. If ambiguous, clarification is requested (Chapter 8).
5. Result is a contextualized Interaction Object.

## 9.4 Context Weighting

- Contexts have weights per interaction type.
- The most relevant context dominates interpretation.
- Conflicts between contexts resolve by priority (activity > app > environment).

## 9.5 Application Context

- The focused application/scene scopes interpretation.
- Applications register context mappings (Chapter 19).
- Unmapped contexts use defaults.

## 9.6 Privacy

- Context interpretation MUST respect privacy classes (Volume V, Ch 16).
- Sensitive context (location, bio) requires consent.
- Context is aggregated on-device where possible (Volume VII).

## 9.7 Conformance

A conformant implementation MUST interpret interactions contextually, resolve ambiguity with clarification, and preserve context privacy.
