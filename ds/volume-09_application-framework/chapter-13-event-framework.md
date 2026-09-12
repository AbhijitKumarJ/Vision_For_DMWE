# Chapter 13: Event Framework

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 13.1 Purpose

Applications communicate through events. The event model supports loosely coupled application components.

## 13.2 Event Topics

- Event publication.
- Subscriptions.
- Priorities.
- Filtering.
- Ordering.
- Reliability.
- Replay.
- Dead-letter handling.

## 13.3 Event Publication

- Components publish typed events.
- Events use the canonical serialization (Volume VIII, Ch 6).
- Events carry provenance and timestamps.

## 13.4 Subscriptions

- Components subscribe to event topics.
- Subscriptions are pattern-based.
- Delivery is push or pull (Volume VIII, Ch 5).

## 13.5 Priorities

- Events carry a priority.
- High-priority events preempt processing.
- Priority MUST NOT be altered by hops.

## 13.6 Filtering

- Subscribers filter by type, source, context.
- Filtering at the source reduces traffic.
- Filters are deterministic.

## 13.7 Ordering

- Per-subscriber ordering is guaranteed.
- Global ordering via mesh time (Volume VIII, Ch 11).
- Causal order preserved for dependent events.

## 13.8 Reliability

- Reliability follows QoS classes (Volume VIII, Ch 12).
- Durable events survive disconnects.
- Reliable delivery retransmits on loss.

## 13.9 Replay

- Durable events MAY be replayed.
- Replay is bounded and consent-aware.
- Replay supports audit (Volume VII, Ch 15).

## 13.10 Dead-Letter Handling

- Undeliverable events route to a dead-letter queue.
- Dead letters are surfaced to diagnostics (Volume VIII, Ch 16).
- Poison events are quarantined.

## 13.11 Conformance

A conformant implementation MUST support publication, subscriptions, ordering, reliability, replay, and dead-letter handling.
