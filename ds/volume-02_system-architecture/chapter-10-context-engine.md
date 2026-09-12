# Chapter 10: Context Engine

**Volume II — System Architecture · Working Draft v0.1**

This chapter defines how generic intent becomes meaningful action. Full specification: Volume VII.

## 10.1 Purpose

Intent is meaningless without context. The Context Engine maintains a continuously updated understanding of the user and environment, enabling context-aware interpretation of every interaction.

## 10.2 Context Sources

| Source | Examples |
|--------|----------|
| Application | Current app, window focus |
| User | Identity, preferences, posture, activity |
| Environment | Location, lighting, temperature, noise |
| Body pose | Gesture, orientation, gait |
| Nearby devices | What modules and IBNs are present |
| Calendar | Meetings, events |
| IoT | Smart home/environment state |
| Attention | Focus state, cognitive load |
| Privacy level | Current trust domain |
| Time | Time of day, schedule |

## 10.3 The Context Model

Context is organized into a **Context Graph** (Volume VII) where every contextual element is a node with relationships:

- Located In, Uses, Depends On, Near, Collaborates With, Assigned To, Requires

The graph evolves continuously as the user's situation changes.

## 10.4 Context Aggregation

- Collectors gather raw context from sources (sensors, apps, calendars, IoT).
- The Fusion Engine filters, normalizes, aligns temporally/spatially, resolves conflicts, and estimates confidence.
- Output is a unified context model shared with the rest of the system.

## 10.5 Context-Aware Interpretation

The same interaction means different things in different contexts:

| Swipe | Context | Meaning |
|-------|---------|---------|
| swipe right | Reading app | Next page |
| swipe right | Presentation | Next slide |
| swipe right | Music | Next track |
| swipe right | CAD | Rotate/pan |

The Context Engine provides the semantic discriminator.

## 10.6 Context Distribution

- Context is synchronized across trusted nodes (Volume VIII, CSP protocol).
- Privacy policies govern what context may be shared and with whom.
- Applications receive only authorized, relevant context views — never raw context indiscriminately.

## 10.7 Context Freshness & Confidence

- Every context value carries timestamp and freshness.
- Stale context MUST be treated as uncertain, not authoritative.
- Confidence estimates propagate through fusion.

## 10.8 Context Failure Handling

- Missing or stale context MUST NOT crash interaction.
- The system degrades interpretation (e.g., reverts to generic gesture semantics).
- Critical context-dependent actions require explicit confirmation when context is uncertain.

## 10.9 Conformance Summary

A conformant Context Engine MUST:

1. Aggregate context from multiple sources.
2. Maintain a live, versioned Context Graph.
3. Disambiguate intents using context.
4. Distribute context with privacy enforcement.
5. Handle stale/missing context gracefully.
