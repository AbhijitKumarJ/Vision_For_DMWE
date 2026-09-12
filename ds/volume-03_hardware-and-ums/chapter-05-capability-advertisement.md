# Chapter 5: Capability Advertisement

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

Modules expose functionality through standardized **capabilities** rather than proprietary APIs. This chapter defines how hardware advertises capabilities; the capability model itself is specified in Volume V.

## 5.1 What a Module Advertises

Each capability advertisement MUST include:

- **Capability ID** (registered, versioned — Volume V).
- **Capability version**.
- **Quality-of-capability metadata** (latency, accuracy, energy, trust) — Volume V, Chapter 11.
- **Dependencies** on other capabilities/sensors.
- **Lifecycle state** (available, busy, suspended, etc.).

## 5.2 Advertisement Lifecycle

Capabilities follow the lifecycle defined in Volume II, Chapter 6 §6.3:

```
Registered -> Available -> Reserved -> Allocated -> Active
  -> Idle -> Suspended -> Migrated -> Deprecated -> Removed
```

The module is responsible for keeping the mesh informed of state changes via the Capability Exchange Protocol (Volume VIII, Chapter 7).

## 5.3 Example Capabilities

Standard capability categories (Volume V catalog):

- **Interaction:** Pointer, Selection, Scroll, Zoom, Manipulation, Rotation, Drawing, Annotation
- **Input:** Voice, Text, Touch, Gesture, Eye Tracking, EMG, EEG, Keyboard
- **Output:** Projection, Display, Audio, Speech, Haptics, Lighting
- **Spatial:** Localization, Mapping, Object/Body Tracking, Depth, SLAM
- **Compute:** CPU, GPU, AI, Memory, Storage
- **Communication:** BLE, Wi-Fi, UWB, NFC, Thread
- **Security:** Authentication, Authorization, Encryption, Identity, Trust
- **Environmental:** Temperature, Humidity, Air Quality, Pressure, Light

## 5.4 Composite Capabilities

A module (or the Mesh OS) MAY advertise composite capabilities:

- Ring + Eye Tracking → Precision Pointer
- Camera + Projector + SLAM → Spatial Workspace

Composite advertisement MUST declare constituent dependencies so the mesh can validate and manage them (Volume V, Chapter 8).

## 5.5 Dynamic Updates

Capability availability changes dynamically:

- Sensors go offline (battery, failure).
- Modules hot-swap on the chassis.
- Quality degrades (thermal, interference).

The module MUST:

1. Publish incremental capability updates.
2. Withdraw capabilities no longer available.
3. Notify the mesh of metadata changes.

## 5.6 Advertising Integrity

- Advertisements MUST be authenticated (signed) so they cannot be spoofed.
- Claims MUST be validated by MeshOS (Volume IV Security Manager).
- Overclaiming is a compliance violation (Chapter 15).

## 5.7 Conformance

A conformant module MUST:

1. Advertise at least one verifiable capability.
2. Maintain accurate, current capability state.
3. Publish and withdraw capabilities dynamically and securely.
4. Declare dependencies for composite capabilities.
