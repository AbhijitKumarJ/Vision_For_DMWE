# Chapter 5: Capability Lifecycle

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 5.1 Lifecycle States

```
Registered
   ↓
Available
   ↓
Reserved
   ↓
Allocated
   ↓
Active
   ↓
Idle
   ↓
Suspended
   ↓
Migrated
   ↓
Deprecated
   ↓
Removed
```

## 5.2 State Definitions

| State | Description |
|-------|-------------|
| Registered | Entered the registry |
| Available | Ready for binding |
| Reserved | Held for a consumer |
| Allocated | Assigned to a consumer |
| Active | Currently executing |
| Idle | Allocated but not active |
| Suspended | Temporarily unavailable |
| Migrated | Moved to another provider |
| Deprecated | Scheduled for removal |
| Removed | No longer available |

## 5.3 Transitions

- Registered → Available (validation complete).
- Available → Reserved (consumer reservation).
- Reserved → Allocated (binding confirmed).
- Allocated → Active (invocation).
- Active → Idle (work completed, binding retained).
- Any → Suspended (provider loss, battery, thermal).
- Suspended → Available (recovery).
- Active/Allocated → Migrated (Chapter 8; Volume IV, Ch 8).
- Deprecated → Removed (retirement).
- Any state → Removed (provider removed).

## 5.4 Lifecycle Events

Each transition MUST publish a lifecycle event:

- `registered`, `available`, `reserved`, `allocated`, `active`, `idle`, `suspended`, `migrated`, `deprecated`, `removed`.

Events are consumed by:

- MeshOS Capability Manager (Volume IV, Ch 6).
- Scheduler (re-planning).
- Applications (UI state).
- Monitoring (Chapter 17).

## 5.5 Rules

- Only the owner/provider MAY transition a capability.
- Consumers MUST NOT observe skipped states.
- Suspension MUST preserve binding where possible.
- Migration MUST be transparent to consumers.
- Deprecation MUST give advance notice (policy-defined window).

## 5.6 Conformance

A conformant capability MUST implement the full lifecycle and publish all events.
