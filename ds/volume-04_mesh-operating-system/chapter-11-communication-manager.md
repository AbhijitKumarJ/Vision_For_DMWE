# Chapter 11: Communication Manager

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

The Communication Manager handles **internal communication inside MeshOS**. Wire-level packet formats live in Volume VIII; this chapter defines communication behavior.

## 11.1 Responsibilities

The Communication Manager provides:

- **Messaging** — request/response and streaming.
- **Routing** — node-to-node delivery.
- **Broadcast** — one-to-many.
- **Streaming** — continuous data flows.
- **Synchronization** — state alignment.
- **Compression** — bandwidth efficiency.
- **Retries** — reliability on lossy links.
- **Acknowledgments** — delivery guarantees.
- **QoS** — class-based service.
- **Prioritization** — traffic ordering.
- **Serialization** — encoding of messages.

## 11.2 Messaging Model

- Messages are addressed by logical endpoint (service/capability), not hardware.
- The manager maps logical endpoints to physical nodes.
- Delivery modes: fire-and-forget, acknowledged, guaranteed.

## 11.3 Routing

- The manager maintains routing tables (Volume VIII, Chapter 12).
- Routing MUST adapt to topology changes (node join/leave).
- Multi-link and multi-hop routing supported.

## 11.4 Broadcast

- Broadcast MUST be scoped (mesh-local, domain-local, application-local).
- Broadcast storms MUST be prevented.

## 11.5 Streaming

- High-volume streams (vision, audio) use dedicated flow control.
- Streams MUST reserve capacity (Chapter 7).
- Backpressure MUST be applied to protect nodes.

## 11.6 Synchronization

- Time synchronization per Volume VIII, Chapter 11.
- State synchronization per Chapter 12.

## 11.7 Compression

- The manager MAY compress traffic.
- Compression MUST NOT increase latency for interactive classes.

## 11.8 Retries & Acknowledgments

- Reliability semantics per delivery mode.
- Retry budgets MUST be bounded.
- Failed delivery MUST escalate to Health Manager and Scheduler.

## 11.9 QoS & Prioritization

| Class | Purpose | Latency Budget |
|-------|---------|----------------|
| Real-time interaction | Input/intent | < 10–20 ms |
| Audio | Voice/media | < 50 ms |
| Video | Vision streams | < 150 ms |
| AI inference | Model requests | 100 ms–2 s |
| Background | Sync/backup | relaxed |

- Higher classes preempt lower classes.
- Classes MUST match Volume III, Chapter 9.

## 11.10 Serialization

- Messages use the canonical serialization (Volume VIII, Chapter 6).
- Cross-version compatibility MUST be maintained.

## 11.11 Security

- All communication MUST be authenticated and authorized (Chapter 14).
- Sensitive payloads MUST be encrypted end-to-end.

## 11.12 Conformance

A conformant Communication Manager MUST:

1. Provide messaging, streaming, broadcast, and sync.
2. Route adaptively and prevent broadcast storms.
3. Enforce QoS classes and prioritization.
4. Provide bounded retries and escalation.
5. Secure all traffic per security policy.
