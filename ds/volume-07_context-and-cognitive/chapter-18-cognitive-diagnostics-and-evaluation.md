# Chapter 18: Cognitive Diagnostics & Evaluation

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

## 18.1 Purpose

Measures how well the framework understands and serves its user.

## 18.2 Evaluation Dimensions

| Dimension | Definition |
|-----------|-----------|
| Accuracy | Correctness of conclusions |
| Precision | Relevance of outputs |
| Recall | Coverage of relevant facts |
| Latency | Speed of responses |
| Energy | Cost per decision |
| Privacy | Data exposure footprint |
| User satisfaction | Perceived quality |

## 18.3 Accuracy Metrics

- Prediction hit rate (Chapter 9).
- Reasoning agreement with ground truth.
- Activity recognition correctness.

## 18.4 Latency Metrics

- Query response time.
- Prediction horizon accuracy.
- Adaptation reaction time.

## 18.5 Energy Metrics

- Decisions per joule.
- Pre-warming waste rate (Chapter 9).

## 18.6 Privacy Metrics

- Records per consent scope.
- Unauthorized access attempts.
- Exposure surface size.

## 18.7 User Satisfaction

- Friction score (Volume VI, Ch 11).
- Override rate.
- Explicit feedback.

## 18.8 Diagnostic Process

1. Instrument the framework (telemetry, Volume IV, Ch 17).
2. Collect metrics continuously.
3. Report to user and developer.
4. Drive improvement loops.

## 18.9 Privacy-Preserving Telemetry

- Diagnostics are anonymous by default.
- Raw context NEVER leaves the trusted domain.
- Reports aggregate only.

## 18.10 Conformance

A conformant implementation MUST measure the evaluation dimensions and report privacy-preserving metrics.
