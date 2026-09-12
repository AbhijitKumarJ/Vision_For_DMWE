# Chapter 4: Interaction Objects

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

All interactions are represented as standardized data structures called **Interaction Objects**.

## 4.1 Purpose

Applications subscribe to Interaction Objects instead of raw events. This is the application-facing contract of the Human Interaction Language.

## 4.2 Interaction Object Fields

| Field | Description |
|-------|-------------|
| Interaction ID | Unique identifier |
| Timestamp | When it occurred |
| Intent | Verb + Modifier + Target |
| Context | Contextual snapshot (Volume VII) |
| Origin | Source capability/provider |
| Target | Interaction target |
| Confidence | Recognition certainty |
| Priority | Urgency class |
| Security Level | Trust/privacy class |
| Required Feedback | Expected acknowledgment |
| Completion State | Lifecycle state (Chapter 8) |

## 4.3 Example

```json
{
  "interactionId": "ix-2026-0001",
  "timestamp": 1735700000000,
  "intent": { "verb": "select", "modifier": "precise", "target": "current-object" },
  "origin": { "capability": "pointer", "provider": "ring-01" },
  "confidence": 0.97,
  "priority": "interactive",
  "securityLevel": "personal",
  "requiredFeedback": "acknowledge",
  "completionState": "recognized"
}
```

## 4.4 Serialization

- Interaction Objects use the canonical serialization (Volume VIII, Ch 6).
- They are versioned with the HIF.
- Fields MUST be complete and valid.

## 4.5 Delivery

- Objects are delivered to subscribed applications (Volume IV, Ch 10).
- Delivery is authenticated and ordered.
- Streaming interactions update fields incrementally.

## 4.6 Validation

- Objects MUST pass schema validation.
- Invalid objects MUST be rejected or flagged.
- Confidence below threshold triggers escalation (Chapter 8).

## 4.7 Lifecycle

Interaction Objects carry completion state (Chapter 8):

Idle → Detected → Recognized → Validated → Contextualized → Executed → Confirmed → Completed → Archived

## 4.8 Conformance

A conformant implementation MUST emit valid, complete Interaction Objects and deliver them to authorized subscribers.
