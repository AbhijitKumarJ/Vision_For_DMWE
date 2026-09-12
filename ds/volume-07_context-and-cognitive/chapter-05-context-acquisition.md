# Chapter 5: Context Acquisition

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

## 5.1 Sources

Context is gathered from:

- Wearable sensors
- Ambient devices
- Applications
- Calendars
- Maps
- IoT
- Enterprise systems
- AI models
- User preferences
- External APIs

## 5.2 Acquisition Topics

| Topic | Requirement |
|-------|-------------|
| Sampling | Rate appropriate to context layer |
| Fusion | Combine multiple sources (Chapter 6) |
| Timestamping | Mesh time sync (Volume VIII, Ch 11) |
| Confidence | Per-fact certainty |
| Data freshness | Expiry policies per layer |
| Provenance | Origin and derivation record |

## 5.3 Sampling

- Sensor context: hardware-native rates.
- Device context: on-change events.
- Higher layers: policy-defined intervals.
- Sampling MUST balance freshness vs energy (Volume IV, Ch 13).

## 5.4 Timestamping

- Every context fact carries a mesh-synchronized timestamp.
- Stale facts are degraded or expired.
- Latency of acquisition is recorded.

## 5.5 Confidence

- Each fact has a confidence score.
- Confidence combines: source reliability, freshness, agreement.
- Low-confidence facts are downgraded or withheld.

## 5.6 Data Freshness

- Each context layer defines freshness windows.
- Expired facts MUST NOT be used for decisions.
- Refresh is triggered on demand for critical context.

## 5.7 Provenance

- Every fact records: source, transformation, timestamp chain.
- Provenance enables audit and explainability (Chapter 15).

## 5.8 Consent & Minimization

- Sources MUST respect consent (Chapter 15).
- Only necessary context is acquired.
- Raw data is minimized at acquisition.

## 5.9 Conformance

A conformant acquisition MUST timestamp, score, freshness-bound, and attribute provenance to every context fact.
