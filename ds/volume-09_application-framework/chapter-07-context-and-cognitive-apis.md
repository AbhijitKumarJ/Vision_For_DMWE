# Chapter 7: Context & Cognitive APIs

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 7.1 Purpose

Applications access context and cognitive services through standardized APIs. Access is mediated by permissions and user consent.

## 7.2 API Operations

- Query current context.
- Subscribe to context changes.
- Request predictions.
- Access Digital Twin views.
- Receive adaptation events.
- Respect privacy policies.

## 7.3 Query Current Context

- Query the Context Graph (Volume VII, Ch 3).
- Filter by layer, entity, time, confidence.
- Responses are typed and timestamped.

## 7.4 Subscribe to Context Changes

- Receive incremental updates (Volume VIII, Ch 9).
- Subscriptions are consent-aware.
- Updates arrive via framework events (Chapter 13).

## 7.5 Request Predictions

- Request confidence-scored predictions (Volume VII, Ch 9).
- Specify prediction horizon.
- Side effects are confidence-gated.

## 7.6 Access Digital Twin Views

- Read the Human Digital Twin (Volume VII, Ch 4).
- Views are privacy-filtered.
- Twin access requires explicit consent.

## 7.7 Receive Adaptation Events

- Applications are notified of adaptations (Volume VII, Ch 10).
- Applications may override adaptations.
- Adaptation history is available.

## 7.8 Respect Privacy Policies

- All access follows permissions (Chapter 14).
- Consent is granular and revocable.
- Raw context never leaves trusted domains without consent.

## 7.9 Conformance

A conformant implementation MUST mediate all context/cognitive access through permissions and consent.
