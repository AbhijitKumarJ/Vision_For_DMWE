# Chapter 14: Reference Module Designs

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

This chapter introduces reference designs that serve as conformity baselines. Detailed engineering (schematics, BOMs, layouts) is in Volume III-A.

## 14.1 Purpose of Reference Designs

- Prove the UMS (Chapter 1) is implementable.
- Give vendors a starting point.
- Provide conformance test targets.
- Demonstrate the ecosystem's breadth of form factors.

## 14.2 Reference Module Catalog

| Reference | Form Factor | Roles | Core Capabilities |
|-----------|-------------|-------|-------------------|
| DMWE-Ring | Ring | Compute, Localization | Pointer, Selection, Gesture, Haptics |
| DMWE-Projector | Necklace bead | Output | Projection, Lighting, Spatial display |
| DMWE-Audio | Earbud | Audio | Voice input, Audio output, Noise handling |
| DMWE-Camera | Headband | Vision | Visual sensing, Spatial tracking |
| DMWE-Gateway | Desk hub | Gateway | Network bridging, Power hub, Charging |
| DMWE-Auth | Ring/key | Security | Authentication, Identity |
| DMWE-Battery | Chassis bead | Power | Energy storage, Charging, Sharing |
| DMWE-Env | Belt/band | Environmental | Temperature, Air quality, Motion |
| DMWE-AI | Belt/band | Compute, AI | AI inference accelerator |

## 14.3 Example: DMWE-Ring Reference

| Item | Specification |
|------|---------------|
| MCU | Low-power Arm Cortex-M with BLE |
| Sensors | IMU, capacitive touch |
| Outputs | Haptic motor, LED indicator |
| Battery | Rechargeable, > 1 day typical |
| Charging | USB-C / wireless |
| Comms | BLE (UWB optional) |
| Form factor | Circular, water-resistant |
| Certification | CE, FCC, RoHS (Volume X) |

## 14.4 Design Compliance

Reference designs MUST:

- Implement the Module Descriptor (Chapter 4).
- Advertise capabilities correctly (Chapter 5).
- Pass conformance tests (Chapter 15).
- Match the form factor's environmental rating.
- Support the module lifecycle (Chapter 11).

## 14.5 Validation Strategy

Each reference design ships with:

- Test plan for conformance.
- Known capability quality metrics.
- Known power/thermal profiles.
- Reference firmware (Chapter 12).

## 14.6 Custom Modules

Vendors MAY build custom modules; they:

- MUST remain UMS-compatible (connector, descriptor).
- MUST pass conformance (Chapter 15).
- MAY exceed reference quality.

## 14.7 Conformance

A reference design MUST be reproducible and certifiable, providing a concrete baseline for the ecosystem.
