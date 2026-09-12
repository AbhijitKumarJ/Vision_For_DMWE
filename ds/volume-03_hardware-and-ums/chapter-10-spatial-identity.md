# Chapter 10: Spatial Identity

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

Every module maintains awareness of its physical placement. Spatial identity enables consistent interaction and spatial rendering across the mesh.

## 10.1 What Spatial Identity Enables

- **Projection alignment** — a projector bead knows it sits 15 cm below the chin on the neck.
- **Pointing vector** — a ring knows it is on the left index finger, giving gesture vectors correct orientation.
- **Spatial rendering** — the mesh places holograms/audio relative to the body.
- **Body-relative context** — activity inference (which hand moved, head tilt, etc.).

## 10.2 Placement Examples

| Module | Placement |
|--------|-----------|
| Ring | Left index finger |
| Ring (alt) | Right middle finger |
| Projector | Neck, 15 cm below chin |
| Headband | Forehead center |
| Earbud | Left ear |
| Belt Module | Waist, front-left |
| Desk Hub | Desktop |
| Vehicle Hub | Vehicle dashboard |

## 10.3 Coordinate Systems

The specification defines four coordinate frames:

| Frame | Reference | Use |
|-------|-----------|-----|
| Body Space | User's body (torso origin) | Wearable placement, body gestures |
| Device Space | Module-local origin | Sensor-local readings |
| World Space | Fixed world origin (SLAM) | Room/environment anchoring |
| Workspace Space | Task/application origin | Interaction targets (screen, desk) |

## 10.4 Declaring Spatial Identity

- Default spatial placement is declared in the Module Descriptor (Chapter 4, `spatial`).
- Dynamic positioning refines it:
  - UWB anchors track module position in World Space.
  - IMU + SLAM estimate relative placement.
  - On-chassis position can be sensed via connector order.
- The mesh maintains a live **body model** (Volume VII, Human Digital Twin — Physical Twin).

## 10.5 Transform Consistency

- All transforms between frames MUST be consistent and versioned.
- Timestamped transforms avoid drift (Volume VIII, Time Sync).
- The mesh MUST reconcile conflicting spatial observations (confidence-weighted).

## 10.6 Privacy

- Precise spatial tracking is sensitive.
- Body/world tracking data MUST respect trust domains.
- Location tracking requires user consent (Volume X).

## 10.7 Conformance

A conformant module MUST:

1. Declare a default spatial placement.
2. Provide transforms to Body Space where applicable.
3. Support dynamic spatial refinement (UWB/IMU) when capable.
4. Respect spatial-data privacy policies.
