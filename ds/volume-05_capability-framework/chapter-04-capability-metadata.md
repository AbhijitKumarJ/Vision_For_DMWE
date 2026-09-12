# Chapter 4: Capability Metadata

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 4.1 Purpose

Every capability publishes metadata so consumers and MeshOS can evaluate and select providers objectively.

## 4.2 Example

```
Capability ID : Pointer
Version       : 2.0
Provider      : Ring
Latency       : 7 ms
Confidence    : 98%
Power Cost    : Low
Trust Level   : Personal
```

## 4.3 Metadata Fields

| Field | Description |
|-------|-------------|
| Latency | End-to-end response time |
| Accuracy | Correctness of output |
| Availability | Uptime / readiness |
| Confidence | Certainty of results |
| Bandwidth | Data throughput required/provided |
| Energy cost | Power draw profile |
| Privacy | Data handling classification |
| Quality | Composite QoC score (Chapter 11) |
| Dependencies | Required capabilities (Chapter 8) |
| Supported contexts | Contexts where it works well |

## 4.4 Latency

- Measured end-to-end (provider processing + transport).
- Reported as typical and percentile (p50/p95/p99).
- MUST satisfy the capability's latency class (Volume III, Ch 9).

## 4.5 Accuracy

- Percent correct / error rate for recognition capabilities.
- Measurement methodology MUST be documented.
- MAY vary by context (reported per supported context).

## 4.6 Availability

- Fraction of time the capability is ready.
- Updated dynamically as providers join/leave.

## 4.7 Confidence

- Per-invocation confidence for recognition/interaction.
- Consumers MUST handle low-confidence results (Volume IV, Ch 10).

## 4.8 Bandwidth & Energy Cost

- Bandwidth: MB/s required for streams.
- Energy: per-operation or per-second draw.
- The scheduler uses both for placement (Volume IV, Ch 8).

## 4.9 Privacy

- Classification: Public, Personal, Private, Restricted (Volume X).
- Consumers MUST respect the privacy class.
- Capabilities on Private data MUST run in trusted domains (Volume IV, Ch 14).

## 4.10 Quality & Dependencies

- Quality: composite QoC (Chapter 11).
- Dependencies: list of required capabilities with versions.

## 4.11 Supported Contexts

- Capabilities declare contexts where performance is validated (e.g., "indoors, seated").
- Providers MUST NOT overclaim context support.

## 4.12 Dynamic Updates

- Metadata MUST be updated dynamically as quality changes.
- Updates are published via the Capability Registry (Chapter 6).

## 4.13 Conformance

A conformant capability MUST publish complete, accurate, dynamically updated metadata.
