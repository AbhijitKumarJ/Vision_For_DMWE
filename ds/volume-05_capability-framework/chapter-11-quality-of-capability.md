# Chapter 11: Quality of Capability (QoC)

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Capabilities are objectively evaluated through a **Quality of Capability** model.

## 11.1 QoC Metrics

| Metric | Description |
|--------|-------------|
| Accuracy | Correctness of results |
| Latency | Response time |
| Availability | Readiness fraction |
| Reliability | Consistency over time |
| Energy | Power draw per operation |
| Security | Security posture |
| Trust | Trust domain classification |
| Consistency | Determinism of outputs |
| Context suitability | Fit to current context |

## 11.2 QoC Scoring

- Each metric is normalized to a 0–1 score.
- Metrics are weighted per consumer requirement.
- A composite QoC score aggregates weighted metrics.

## 11.3 QoC in Selection

- The scheduler and negotiation use QoC during provider selection (Chapters 7, 13).
- Hard requirements are gates; QoC ranks survivors.
- Consumers MAY request a minimum QoC.

## 11.4 QoC Reporting

- Providers publish QoC with metadata (Chapter 4).
- QoC is updated dynamically.
- QoC reports MUST include measurement methodology.

## 11.5 Context Suitability

- QoC varies by context.
- Providers report per-context QoC.
- Selection weighs current context.

## 11.6 Composite QoC

- Composite capabilities derive QoC from constituents (Chapter 8).
- Fusion accumulates errors; sequences compound latency.
- Derivation rules MUST be documented per composition.

## 11.7 Trust in QoC

- QoC reports from untrusted providers are weighted lower.
- Honest reporting is a compliance requirement (Chapter 20).

## 11.8 Monitoring

- Runtime monitoring validates published QoC (Chapter 17).
- Discrepancies MUST trigger recalibration or flagging.

## 11.9 Conformance

A conformant capability MUST publish QoC metrics, update them dynamically, and report honestly.
