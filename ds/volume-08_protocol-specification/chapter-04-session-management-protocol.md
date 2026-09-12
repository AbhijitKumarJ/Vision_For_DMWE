# Chapter 4: Session Management Protocol (SMP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 4.1 Purpose

Defines communication sessions between modules.

## 4.2 Session Kinds

| Kind | Use |
|------|-----|
| Persistent | Long-lived trusted connections |
| Temporary | Short-lived request/response exchanges |

## 4.3 Session Creation

- Initiated by a peer or by a coordinator.
- Requires mutual authentication (Chapter 13).
- Returns a unique Session ID.

## 4.4 Session Identifiers

- Unique within the mesh.
- Bound to the authenticated peer identities.
- Used in message headers (Chapter 5).

## 4.5 Keep-Alive & Heartbeats

- Persistent sessions send periodic heartbeats.
- Heartbeat interval is negotiated.
- Heartbeats also carry liveness/health signals.

## 4.6 Timeout Handling

- Missing heartbeats trigger timeout escalation.
- Timeout thresholds are transport- and profile-dependent (Chapter 18).
- On timeout, the session enters reconnection.

## 4.7 Reconnection

- Re-establish authenticated connection.
- Resume session state where possible.
- State reconciliation per Chapter 14.

## 4.8 Session Migration

- Sessions may migrate to another module (Volume IV, Ch 12).
- Migration preserves session identity and state.
- Only trusted nodes may receive migrations.

## 4.9 Graceful Termination

- Explicit teardown message.
- Resources released deterministically.
- Associated subscriptions removed (Chapter 9).

## 4.10 Conformance

A conformant SMP MUST support session creation, IDs, keep-alive, timeout, reconnection, migration, and graceful termination.
