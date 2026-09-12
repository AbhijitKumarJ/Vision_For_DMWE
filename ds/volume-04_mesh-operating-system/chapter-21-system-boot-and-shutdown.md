# Chapter 21: System Boot & Shutdown

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

## 21.1 Boot Sequence

```
Boot
   ↓
Authentication
   ↓
Discovery
   ↓
Mesh Formation
   ↓
Capability Registration
   ↓
Synchronization
   ↓
Ready
   ↓
Running
```

| Phase | Responsibility |
|-------|----------------|
| Boot | Secure boot, local runtime (Volume III, Ch 12) |
| Authentication | Trust establishment (Chapter 14) |
| Discovery | Find neighbors (Volume III, Ch 9) |
| Mesh Formation | Elect Primary (Chapter 4) |
| Capability Registration | Register services/capabilities (Chapter 6) |
| Synchronization | Align state/time (Chapter 12) |
| Ready | System available |
| Running | Normal operation |

## 21.2 Startup Rules

- The first module becomes Primary by default.
- Subsequent nodes join the existing mesh.
- Boot MUST NOT block on missing nodes (degraded startup).
- Critical capabilities MUST register first.

## 21.3 Power Saving

```
Running
   ↓
Idle
   ↓
Coordinated Sleep
   ↓
(partial mesh sleep)
   ↓
Wake (event/radio/schedule)
```

- Nodes enter coordinated sleep when idle (Chapter 13).
- At least one node stays awake for critical listening.

## 21.4 Shutdown Sequence

```
Running
   ↓
Drain (finish/suspend tasks)
   ↓
Save state (checkpoint)
   ↓
Notify mesh (graceful leave)
   ↓
Release resources
   ↓
Power down
```

- Graceful shutdown MUST preserve interaction state.
- Abrupt power loss MUST be recoverable (Chapter 16).

## 21.5 Recovery Sequences

- **Boot failure** → retry from last known-good state.
- **Post-crash restart** → restore checkpoints, re-form mesh.
- **Partition merge** → reconcile state (Chapter 12).
- **Primary loss** → re-elect (Chapter 4).

## 21.6 Conformance

A conformant MeshOS MUST:

1. Implement the full boot sequence.
2. Support degraded startup.
3. Enter/exit coordinated sleep correctly.
4. Shut down gracefully with state preservation.
5. Recover from boot/crash/partition failures.
