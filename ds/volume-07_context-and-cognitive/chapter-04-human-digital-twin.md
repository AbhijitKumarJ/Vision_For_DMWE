# Chapter 4: Human Digital Twin

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

The **Human Digital Twin** is a defining DMWE concept: a living, privacy-aware representation of the user maintained continuously by the mesh.

## 4.1 Purpose

Instead of querying dozens of services, applications interact with a unified Digital Twin through MeshOS. It is one of DMWE's defining innovations.

## 4.2 Components

### Physical Twin
Body posture, wearable placement, movement, health metrics.

### Interaction Twin
Current interactions, workflow history, habits, shortcuts.

### Cognitive Twin
Goals, attention, focus, mental workload.

### Resource Twin
Available compute, battery, network, capabilities.

### Environmental Twin
Workspace, nearby devices, IoT systems, lighting, noise.

## 4.3 Twin Integration

- The twins are maintained together as one coherent model.
- Each twin is a projection of the Cognitive Graph (Chapter 3, §3.8).
- Updates propagate across twins with consistent timestamps.

## 4.4 Lifecycle

- Twin is created at onboarding.
- Continuously updated from context (Chapter 2).
- Persisted per Memory Framework (Chapter 12).
- Retired on account removal (Volume X).

## 4.5 Privacy

- The twin is **privacy-aware**:
  - Data minimized to what is needed.
  - Stored on trusted devices by default.
  - Synchronized only across trusted devices.
  - Access granted per permission (Chapter 15).

## 4.6 Consumers

- **Applications** — context-aware UI via APIs (Chapter 16).
- **MeshOS** — scheduling and adaptation.
- **AI** — reasoning substrate.
- **User** — visibility into their own data.

## 4.7 Conformance

A conformant implementation MUST maintain a Human Digital Twin with the five components, synchronized across trusted devices, with privacy enforcement.
