# Chapter 4: Physical Module Architecture

**Volume II — System Architecture · Working Draft v0.1**

This chapter explains how hardware is represented logically in the architecture. It remains conceptual; electrical specifications belong in Volume III.

## 4.1 Module Identity

Every module MUST expose a unique identity:

- **Module ID** — globally unique, assigned at manufacturing.
- **Manufacturer & Product Family** — for versioning and certification.
- **Firmware / Hardware revision** — for compatibility and updates.
- **Serial number** — per-unit tracking and provisioning.

Identity is established at boot (secure element) and published in the Module Descriptor (Volume III).

## 4.2 Module Classes

Modules are classified by their primary contribution:

| Class | Contribution | Examples |
|-------|--------------|----------|
| Compute | CPU/GPU/NPU, memory, AI | Necklace hub, pocket module |
| Sensor | Observation | IMU, camera, LiDAR, EMG, microphone |
| Output | Feedback/rendering | Projector, display, haptics, audio |
| Communication | Connectivity | BLE/UWB/Wi-Fi/Thread radios |
| Power | Energy | Battery, harvesting, wireless charging |
| Security | Trusted execution | Secure element, biometric processor |

A single module MAY belong to multiple classes (e.g., a necklace is compute + output + power).

## 4.3 Module Roles

Modules also advertise **digital roles** that guide scheduling and resource allocation (Volume I, Chapter 9):

- Compute Node, Vision Node, Audio Node, Display Node
- Storage Node, Power Node, Gateway Node, Localization Node
- AI Inference Node, Authentication Node, Environmental Node, Safety Node

Roles are advisory metadata; capabilities remain the primary contract.

## 4.4 Internal Firmware Structure

Every module runs a local firmware stack (specified in Volume III, Chapter 12):

```
Bootloader -> Secure Boot -> HAL -> Device Drivers -> RTOS
  -> Capability Services -> Communication -> Diagnostics -> Update Manager
```

The firmware is responsible for:

- Presenting standardized capability services.
- Maintaining local state and caches.
- Handling authentication and secure updates.
- Reporting health and diagnostics.

## 4.5 Local Services

Each module may host local services reachable by other mesh members:

- Pointer Service, Gesture Service, Projection Service, Battery Service
- Localization Service, Camera Service, Storage Service, Authentication Service, AI Service

Services follow the service-oriented rules of Chapter 5 (discovery, binding, invocation, versioning).

## 4.6 Driver Interfaces

Drivers expose uniform interfaces to the Mesh OS:

- **Sensor drivers:** standardized sampling, calibration, timestamping, accuracy reporting.
- **Actuator drivers:** standardized command interfaces and feedback reporting.
- **Health drivers:** battery, thermal, signal quality, error logs.

## 4.7 Module Capability Categories

Modules contribute capabilities across these categories (detailed in Volume V):

- Interaction: Pointer, Selection, Scroll, Zoom, Rotation, Drawing
- Input: Voice, Text, Touch, Gesture, Eye Tracking, EMG, EEG
- Output: Projection, Display, Audio, Speech, Haptics, Lighting
- Spatial: Localization, Mapping, Object/Body Tracking, Depth, SLAM
- Compute: CPU, GPU, AI, Memory, Storage
- Communication: BLE, Wi-Fi, UWB, NFC, Thread
- Security: Authentication, Authorization, Encryption, Identity, Trust
- Environmental: Temperature, Humidity, Air Quality, Pressure, Light

## 4.8 Example Module Categories

| Module | Likely Classes | Likely Roles |
|--------|---------------|--------------|
| Smart Ring | Sensor, Security | Input node, Authentication node |
| Smart Necklace | Compute, Output, Power | Compute hub, Projection node |
| Headband | Sensor | Vision/Localization node |
| Wristband | Sensor, Output | Gesture/Haptic node |
| Earbuds | Sensor, Output | Audio/Input node |
| Pocket Compute Module | Compute, Power, Comms | Edge compute node |
| Ambient Node | Comms, Power | Gateway node |

## 4.9 Design Constraints

- Modules MUST publish a Module Descriptor before registering capabilities (Volume III).
- Modules MUST be independently replaceable without affecting the mesh contract.
- Modules MUST support secure authentication and firmware update (Volumes III, IV).

This chapter's conceptual model is made concrete in Volume III (Universal Module Standard) and Volume III-A (Design Reference Manual).
