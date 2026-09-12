# Chapter 19: Engineering Design Patterns

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

Reusable solutions hardware teams apply across DMWE products.

## 19.1 Always-On Low-Power Node

Ultra-low-energy sensing with event-driven wake-up.

- Always-on core at µA level.
- Wake triggers: IRQ/WAKE pin, radio, scheduled, sensor event.
- Long sleep with fast wake.
- **Use:** rings, earbuds, sensors.
- **Trade-off:** constrained compute during sleep.

## 19.2 Distributed Compute Hub

Offloading intensive tasks from constrained wearables.

- Hub node (necklace, pocket, dock) provides compute.
- Thin nodes sense and stream.
- MeshOS schedules heavy tasks to the hub (Volume IV, Ch 8).
- **Trade-off:** dependency on hub availability.

## 19.3 Sensor Fusion Module

Combining IMU, vision, and bioelectric signals into unified capabilities.

- Co-located sensors with synchronized sampling.
- Fusion in firmware or via MeshOS (Volume IV, Ch 6).
- Emits a fused capability (e.g., Precision Pointer).
- **Trade-off:** more power, more calibration.

## 19.4 Power Aggregation Node

Sharing battery capacity and optimizing charging across the mesh.

- Large battery node provides VBUS to a chassis.
- Negotiates draw limits (Volume III, Ch 8).
- **Trade-off:** needs chassis and power hardware.

## 19.5 Redundant Capability Pattern

Multiple modules providing the same capability for fault tolerance.

- Two IMUs, two pointers, etc.
- MeshOS arbitrates and migrates (Volume IV, Ch 16).
- **Trade-off:** cost and size of redundancy.

## 19.6 Privacy Isolation Pattern

Keeping sensitive biometric processing within trusted hardware domains.

- Bio data (EMG/EEG/PPG) processed on-device.
- Only derived intent leaves the trust domain (Volume III, Ch 7).
- **Trade-off:** constrained model size on-device.

## 19.7 Field Upgrade Pattern

Safe firmware updates with rollback and version compatibility.

- A/B images, signed updates.
- Mesh-coordinated rollout (Volume IV, Ch 20).
- **Trade-off:** double flash storage cost.

## 19.8 Pattern Selection Guide

- Choose Always-On for peripheral sensors.
- Choose Compute Hub for AI-heavy use cases.
- Combine Privacy Isolation + Redundant Capability for sensitive, reliable sensing.

## 19.9 Summary

Patterns encode proven solutions; combine them to accelerate robust module design.
