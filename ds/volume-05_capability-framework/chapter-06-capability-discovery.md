# Chapter 6: Capability Discovery

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 6.1 Dynamic Discovery

Applications discover capabilities **dynamically** — they never assume which provider serves them.

## 6.2 Registration

- Providers register capabilities with the Capability Registry (Volume IV, Ch 6).
- Registration includes: ID, version, metadata, provider, endpoint.
- Registration is authenticated and versioned.

## 6.3 Discovery

Consumers query the registry by:

- Capability ID / category.
- Quality requirements.
- Trust class.
- Spatial/context filters.

## 6.4 Filtering

Discovery supports filters:

- Minimum accuracy/latency.
- Privacy class.
- Location (nearby vs any).
- Provider vendor (optional).

## 6.5 Subscriptions & Notifications

- Consumers MAY subscribe to capability availability.
- Subscribers are notified of: new providers, quality changes, lifecycle events.
- Subscriptions MUST be scoped and revocable.

## 6.6 Dynamic Updates

- The registry MUST keep entries current (Chapter 5 events).
- Stale entries MUST be expired.
- Consumers MUST NOT rely on a fixed provider set.

## 6.7 Capability Search

- Search by keywords, categories, capabilities.
- Results ranked by QoC (Chapter 11) and policy.
- Search MUST respect authorization (Chapter 16).

## 6.8 Discovery Scopes

| Scope | Description |
|-------|-------------|
| Mesh | Any provider in the mesh |
| Nearby | Providers physically near the consumer |
| Trusted | Providers in the consumer's trust domain |
| Local | Providers on the same node |

## 6.9 Examples

- "Find nearest projector" → nearby, Output category.
- "Find any pointer" → any provider of Pointer.
- "Find secure authentication" → trusted, Security category.
- "Find AI provider" → Compute category with quality filter.

## 6.10 Conformance

A conformant registry MUST support registration, filtered discovery, subscriptions, notifications, and dynamic updates — all authorization-aware.
