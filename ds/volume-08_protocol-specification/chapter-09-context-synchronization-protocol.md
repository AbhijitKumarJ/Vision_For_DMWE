# Chapter 9: Context Synchronization Protocol (CSP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 9.1 Purpose

Synchronizes context information across trusted nodes.

## 9.2 Sync Topics

- Context subscriptions.
- Incremental updates.
- Freshness.
- Expiration.
- Consistency.
- Conflict resolution.
- Selective replication.

## 9.3 Context Subscriptions

- Nodes subscribe to context topics (Volume VII, Ch 16).
- Subscriptions are consent-aware (Volume VII, Ch 15).
- Subscribers receive filtered, relevant updates.

## 9.4 Incremental Updates

- Only changed context propagates.
- Updates carry the Context Graph reference.
- Deltas minimize bandwidth and energy.

## 9.5 Freshness

- Each context fact carries a freshness window (Volume VII, Ch 5).
- Stale facts are degraded or expired.
- Consumers MUST NOT act on expired facts.

## 9.6 Expiration

- Facts expire per policy.
- Expired facts are purged from replicas.
- Refresh requires fresh acquisition.

## 9.7 Consistency

- Replicas converge to a consistent view.
- Convergence is eventual within a bound.
- Consistency state is reported to diagnostics.

## 9.8 Conflict Resolution

- Conflicts resolve by: version, timestamp, source trust.
- Deterministic arbitration rules (Volume VII, Ch 6).
- Unresolvable conflicts lower confidence.

## 9.9 Selective Replication

- Nodes replicate only relevant context.
- Replication respects privacy and trust domains.
- Minimized replication preserves energy.

## 9.10 Privacy Governance

- Privacy policies govern what context may be shared (Volume VII, Ch 15).
- Consent-gated context never leaves trusted domains.
- Synchronization MUST respect consent boundaries.

## 9.11 The Unified Meta-Model (UMM)

The Context Graph is a projection of the single Unified Meta-Model (Volume VII, Ch 3 §3.9). CSP therefore synchronizes the UMM, not a siloed context store. This section defines the **Graph-Diff Protocol** that keeps distributed sub-graphs consistent with the materialized global view on the Primary Node.

## 9.12 Graph-Diff Protocol

### 9.12.1 Semantic Triple Diffs

Nodes MUST NOT replicate full graph state. When an Entity changes, the node generates a localized triple update:

```
UPDATE: (Entity: DID_Ring_1) -> [Property: Battery] -> (Value: 39%)
```

- Each diff is a Subject-Predicate-Object triple.
- Diffs address Entities and Relationships by canonical DID (Volume XI, Ch 12 §12.7).
- Diffs are transmitted instead of serialized graph objects, minimizing bandwidth and energy.

### 9.12.2 Diff Granularity

| Diff Type | Applies To | Example |
|-----------|------------|---------|
| `ADD_ENTITY` | New node | Module joins mesh |
| `REMOVE_ENTITY` | Node removal | Ring battery exhausted |
| `ADD_EDGE` | New relationship | Intent bound to capability |
| `REMOVE_EDGE` | Relationship removal | Capability unbound |
| `UPDATE_PROPERTY` | Scalar change | battery 40% → 39% |
| `APPEND_EVENT` | Immutable event | NodeDropped |

- Property updates MUST carry a monotonic version/timestamp for ordering.
- Event diffs are append-only and immutable (Volume VII, Ch 3 §3.10.4).

### 9.12.3 Reconciliation and Convergence

- The Primary Node applies each diff mathematically to the materialized global view.
- Dependent sub-graph projections are updated in O(1) time.
- Conflicting updates resolve by version, then timestamp, then source trust (§9.8).
- Reconciliation MUST converge within the consistency bound (§9.7).
- Full-state re-synchronization is used only when version-vector divergence exceeds the tolerance threshold (Volume IV, Ch 16, F-024).

### 9.12.4 Sub-graph Synchronization

- Low-power modules (e.g., Ring) hold only their **Local Bounded Context** (Volume VII, Ch 3 §3.11.1).
- At session establishment, the Primary Node and module negotiate the required sub-graph and a subscription set (§9.3).
- The module pushes diffs for its local Entities; the Primary Node pushes diffs for the projected sub-graph the module needs.
- A module MAY request a full sub-graph snapshot on (re)connection, after which it synchronizes by diffs only.

### 9.12.5 Privacy and Consent in Diffs

- Diffs MUST NOT leak context outside consent boundaries (§9.10).
- Projections MUST be filtered by privacy class before transmission (Volume IV, Ch 14 §14.8).
- An Entity with `PrivacyClass == Restricted` MUST have its diff content redacted to consumers without authorization.

## 9.13 Conformance

A conformant CSP MUST support subscriptions, incremental sync, freshness, expiration, consistency, consent-aware replication, and the Graph-Diff Protocol with triple-level updates and bounded convergence.
