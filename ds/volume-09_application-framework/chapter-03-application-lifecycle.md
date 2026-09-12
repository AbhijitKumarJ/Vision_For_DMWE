# Chapter 3: Application Lifecycle

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 3.1 Lifecycle States

```text
Installed
    ↓
Registered
    ↓
Activated
    ↓
Running
    ↓
Suspended
    ↓
Migrated
    ↓
Paused
    ↓
Resumed
    ↓
Stopped
    ↓
Removed
```

## 3.2 Installed

- Package present on device (Chapter 15).
- Not yet registered.

## 3.3 Registered

- Declared to the framework.
- Permissions validated (Chapter 14).
- Dependencies resolved.

## 3.4 Activated

- Ready to run.
- Resources allocated.
- Awaiting first launch trigger.

## 3.5 Running

- Executing normally.
- Responds to context and interactions.
- Consumes resources under budget.

## 3.6 Suspended

- Paused due to context change, capability loss, or resource pressure.
- State preserved.
- Resumable without restart.

## 3.7 Migrated

- Moved to another module (Chapter 4).
- State transferred.
- Identity preserved.

## 3.8 Paused / Resumed

- User-initiated pause.
- Resumed explicitly or by context.
- Resource use minimal while paused.

## 3.9 Stopped

- Graceful shutdown.
- Resources released.
- State saved.

## 3.10 Removed

- Uninstalled.
- Data deleted per policy (Volume VII, Ch 12).
- Dependencies notified.

## 3.11 Transition Triggers

Transitions are triggered by:

- Context changes (Volume VII).
- Capability availability (Volume V).
- Resource constraints (Volume IV, Ch 7).
- User action.
- Application requests.

## 3.12 Conformance

A conformant application MUST implement all lifecycle states and honor transition triggers.
