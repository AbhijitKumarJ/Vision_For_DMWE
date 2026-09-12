# Chapter 17: Testing Framework

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 17.1 Purpose

Defines testing strategies. Reference test scenarios help validate application behavior.

## 17.2 Test Types

- Unit testing.
- Integration testing.
- Distributed testing.
- Interaction testing.
- Context simulation.
- Performance testing.
- Accessibility testing.
- Security testing.

## 17.3 Unit Testing

- Tests isolated components.
- Mocks framework services.
- Fast and deterministic.

## 17.4 Integration Testing

- Tests component interactions.
- Uses real framework services.
- Validates API contracts.

## 17.5 Distributed Testing

- Tests multi-module behavior.
- Simulates partitions and failures (Volume VIII, Ch 14).
- Validates state convergence.

## 17.6 Interaction Testing

- Validates semantic interaction handling (Chapter 6).
- Replays recorded flows.
- Checks gesture-independent behavior.

## 17.7 Context Simulation

- Drives context scenarios (Volume VII).
- Validates adaptation (Volume VII, Ch 10).
- Tests edge cases and conflicts.

## 17.8 Performance Testing

- Measures latency, energy, throughput.
- Validates QoS classes (Volume VIII, Ch 12).
- Sets regression baselines.

## 17.9 Accessibility Testing

- Validates accessibility support (Volume VI, Ch 14).
- Tests alternative modalities.
- Mandatory for certification (Chapter 20).

## 17.10 Security Testing

- Validates permissions (Chapter 14).
- Tests revocation and audit.
- Fuzzes package/event inputs.

## 17.11 Conformance

A conformant application MUST pass the applicable test types before certification.
