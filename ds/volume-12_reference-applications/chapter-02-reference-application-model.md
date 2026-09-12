# Chapter 2: Reference Application Model

**Volume XII — Reference Applications · Working Draft v0.1**

## 2.1 Anatomy of a Reference Application

Every reference application in this volume is described with a consistent structure:

- **Problem** — the friction it removes.
- **Capabilities Requested** — via the Capability API (Volume IX, Ch 5).
- **Interaction Grammar** — the semantic interactions used (Volume VI, Ch 3).
- **Context** — the context that gates behavior (Volume VII, Ch 3).
- **Fusion & Flow** — how inputs fuse and flow to execution.
- **Hardware** — minimal and enhanced configurations.
- **Experience** — the user-facing outcome.

## 2.2 Intent-First Design

- Applications declare **high-level intents** rather than hardware commands.
- Intent-Oriented Programming (Volume IX, Ch 1) is the authoring model.
- The platform resolves intents to capabilities, interaction methods, AI services, and hardware resources.

## 2.3 Capability Requests

- Applications request by capability type and quality (Volume V, Ch 7).
- Quality requirements are declarative.
- Providers are selected by the Capability Framework.

## 2.4 Interaction Grammar

- Interactions are semantic: verb + modifier + target + context (Volume VI, Ch 2).
- Applications subscribe to semantic events, not raw sensors.
- The same intent may arrive via different modalities (Volume VI, Ch 7).

## 2.5 Context Gating

- Context determines when an interaction is appropriate.
- Safety, privacy, and ergonomics constraints come from context (Volume VII, Ch 3).
- Applications adapt to context via the Adaptation Engine (Volume VII, Ch 10).

## 2.6 Fusion & Execution Flow

1. Sensors capture input (Volume III).
2. Inputs fuse into semantic events (Volume VIII, Ch 8).
3. Events carry context references (Volume VII).
4. Intents resolve to capabilities (Volume IV, Ch 10).
5. MeshOS schedules and routes execution (Volume IV, Ch 8).

## 2.7 Trust & Privacy

- Sensitive actions stay in the Private trust domain (Volume IV, Ch 14).
- Permissions are granular and revocable (Volume IX, Ch 14).
- Sensitive flows MUST follow Volume VII, Ch 15.

## 2.8 Graceful Degradation

- Removing a module triggers fallback (Volume VIII, Ch 14).
- Example: Ring removed → eye tracking substitutes.
- Degradation never breaks safety.

## 2.9 Conformance

A conformant reference application MUST follow intent-first design and the flow described in this chapter.
