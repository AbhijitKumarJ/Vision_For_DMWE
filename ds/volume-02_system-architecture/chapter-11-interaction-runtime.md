# Chapter 11: Interaction Runtime

**Volume II — System Architecture · Working Draft v0.1**

This chapter defines the middleware between applications and the underlying system. Full specification: Volume VI and Volume IX.

## 11.1 Purpose

The Interaction Runtime is the bridge between the semantic layers (Intent, Context, Capability) and the applications. It mediates every interaction delivered to an application and every feedback command issued back to output capabilities.

## 11.2 Responsibilities

The Interaction Runtime MUST provide:

1. **Intent subscriptions** — applications subscribe to interaction categories.
2. **Permission checks** — every delivery is permission- and policy-checked.
3. **Session management** — scoped interaction sessions.
4. **Interaction routing** — deliver Interaction Objects to the right subscribers.
5. **Feedback generation** — route feedback commands to output capabilities.
6. **State synchronization** — keep interaction state consistent across nodes.
7. **Application lifecycle** — activate, suspend, resume, migrate applications (Volume IX).

## 11.3 Subscription Model

- Applications subscribe by interaction category, capability, or context filter.
- Subscriptions are re-evaluated when capabilities or context change.
- Buffered intents are replayed to reconnecting subscribers (§9.6).

## 11.4 Interaction Objects

The runtime delivers standardized **Interaction Objects**:

```
Interaction ID, Timestamp, Intent, Context, Origin,
Target, Confidence, Priority, Security Level,
Required Feedback, Completion State
```

Applications subscribe to Interaction Objects instead of raw events (Volume VI, Chapter 4).

## 11.5 Feedback Loop

Every interaction should generate appropriate feedback:

- Haptic, audio, visual, projection, voice, ambient lighting, wearable indicators.
- Feedback levels: acknowledgment, progress, warning, error, completion, confirmation.
- Feedback commands flow from the runtime to output capabilities via the Capability Manager.

## 11.6 Session Management

- A **session** scopes a set of interactions (e.g., a presentation, a gesture sequence).
- Sessions carry context, permissions, and target bindings.
- Sessions survive node migration where state is replicated (Chapter 5 §5.7).

## 11.7 Security & Privacy Enforcement

- Every interaction delivery is checked against the application's permissions.
- Sensitive interactions (authentication, biometrics) are gated by trust domain (Volume I, Chapter 9).
- Audit trails record which applications received which interactions (Volume X).

## 11.8 State Synchronization

The runtime participates in the **Distributed Interaction State**:

- Local state per node.
- Shared state across cooperating nodes.
- Replicated state for resilience.
- Consistency models defined in Volume IV, Chapter 12.

## 11.9 Conformance Summary

A conformant Interaction Runtime MUST:

1. Deliver Interaction Objects (not raw events) to subscribed applications.
2. Enforce permission and policy checks on every delivery.
3. Manage sessions and their lifecycle.
4. Generate and route feedback.
5. Synchronize interaction state and recover on reconnect.
