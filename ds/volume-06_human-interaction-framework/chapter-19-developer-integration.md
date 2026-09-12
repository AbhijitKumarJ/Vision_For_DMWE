# Chapter 19: Developer Integration

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Explains how applications consume interactions — insulated from hardware.

## 19.1 Developer APIs

| API | Purpose |
|-----|---------|
| Subscribe to Interaction Objects | Receive interactions |
| Filter by interaction category | Select relevant types |
| Request interaction profiles | Choose behavior mode |
| Register custom interactions | Extend the grammar |
| Define context mappings | Scope interpretation |
| Provide feedback | Emit acknowledgment |
| Handle interaction lifecycle | Track states |

## 19.2 Subscribe to Interaction Objects

- Applications subscribe to Interaction Objects (Chapter 4).
- Subscriptions filter by category, verb, target, priority.
- Delivery is ordered and authenticated.

## 19.3 Filtering

- By category (Navigation, Selection, etc.).
- By verb (Select, Move, ...).
- By target (Current Object, Workspace, ...).
- By priority and security level.

## 19.4 Interaction Profiles

- Applications MAY request a profile for their session (Chapter 15).
- Applications MUST handle profile switches gracefully.

## 19.5 Custom Interactions

- Apps MAY register custom verbs/mappings (Volume V, Ch 19).
- Custom interactions MUST document grammar entries.
- Conflicts with standard entries are rejected.

## 19.6 Context Mappings

- Apps register mappings from context to interpretation (Chapter 9).
- Mappings are scoped to the app's focus.
- Unmapped contexts use defaults.

## 19.7 Feedback

- Apps emit feedback via the feedback framework (Chapter 10).
- Feedback MUST reflect real state, not intent.

## 19.8 Lifecycle Handling

- Apps track interaction lifecycle (Chapter 8).
- Apps MUST handle cancellation, timeout, and interruption.
- In-flight interactions resume across device change (Volume IV, Ch 12).

## 19.9 Insulation Guarantee

- Developers NEVER see hardware-specific events.
- All input arrives as standard Interaction Objects.
- Device substitution is invisible (Chapter 11).

## 19.10 Conformance

A conformant integration MUST consume Interaction Objects, honor profiles and context mappings, and handle lifecycle events.
