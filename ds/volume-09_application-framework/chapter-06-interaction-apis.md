# Chapter 6: Interaction APIs

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 6.1 Purpose

Applications consume semantic interactions.

## 6.2 API Operations

- Interaction subscriptions.
- Filters.
- Gesture-independent events.
- Intent objects.
- Feedback requests.
- Interaction history.
- Custom interaction registration.

## 6.3 Interaction Subscriptions

- Subscribe to semantic events (Volume VIII, Ch 8).
- Events carry Interaction Objects (Volume VI, Ch 6).
- Applications respond to intent, not raw sensor data.

## 6.4 Filters

- Filter by verb, target, context, confidence.
- Filters reduce processing load.
- Filtering happens at the source where possible.

## 6.5 Gesture-Independent Events

- Applications receive semantic meaning regardless of input gesture.
- The same intent may arrive via voice, gesture, or button.
- Applications need not know the input modality.

## 6.6 Intent Objects

- Intents carry: goal, parameters, priority, confidence.
- Intents are IOP-level (Chapter 1).
- Intent resolution selects providers (Volume IV, Ch 9).

## 6.7 Feedback Requests

- Request feedback via the Feedback Framework (Volume VI, Ch 9).
- Feedback adapts to available outputs.
- Feedback is non-blocking.

## 6.8 Interaction History

- Query past interactions (Volume VI, Ch 16).
- Used for undo, replay, learning.
- History access is consent-aware.

## 6.9 Custom Interaction Registration

- Register custom recognizers (Volume VI, Ch 15).
- Custom interactions become first-class semantic events.
- Registration is validated and versioned.

## 6.10 Conformance

A conformant implementation MUST support the interaction API operations with semantic event delivery.
