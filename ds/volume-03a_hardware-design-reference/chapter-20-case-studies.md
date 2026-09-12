# Chapter 20: Case Studies

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

Complete engineering examples from concept to deployment, applying the guidance in this volume.

## 20.1 Smart Ring in Six Months

- **Requirements:** pointer + selection + auth; 1-day battery; IPx6.
- **Architecture:** ultra-low MCU, IMU + touch, haptics, BLE, secure element.
- **Electronics:** 4-layer rigid-flex ring PCB; connector per Volume III, Ch 3.
- **Firmware:** layered, mesh client, A/B update.
- **Mechanical:** resin enclosure, skin-safe materials.
- **Testing:** finger thermal budget; drop and sweat tests (Ch 15).
- **Manufacturing:** identity provisioning at line.
- **Capabilities:** Pointer, Selection, Authentication.
- **Lessons:** RF detuning on finger required antenna tuning on body phantom; thermal budget constrained continuous haptics.

## 20.2 Projection Necklace with AI Acceleration

- **Requirements:** projection + voice + AI hub; moderate battery; chassis power sharing.
- **Architecture:** balanced SoC + NPU; mic array, projector, BLE+Wi-Fi.
- **Power:** large battery; VBUS sharing to chassis beads.
- **Thermal:** neck budget; heat spreading to chassis.
- **Firmware:** compute-hub pattern (Ch 19); distributed scheduler offloads heavy tasks.
- **Testing:** projection alignment on body (Volume III, Ch 10).
- **Capabilities:** Projection, Voice, AI Inference, Compute.
- **Lessons:** sustained AI raised surface temps; needed throttle + mesh migration.

## 20.3 Vision Headband for Industrial Environments

- **Requirements:** object recognition, safety alerts; rugged IPx6; on-site privacy.
- **Architecture:** vision SoC + camera/ToF; BLE+Wi-Fi; edge inference.
- **Privacy:** Privacy Isolation pattern (Ch 19) — raw video stays on-device/edge.
- **Testing:** thermal in hot environment; vibration; safety alert latency < 100 ms.
- **Capabilities:** Vision, Object Recognition, Spatial, Safety.
- **Lessons:** edge server placement critical for latency; glasses-face thermal strictest.

## 20.4 Pocket Compute Module for Mobile AI

- **Requirements:** heavy AI, high-capacity battery, cellular, USB.
- **Architecture:** high-performance MPU/SoC + NPU; cellular + Wi-Fi + USB-C.
- **Power:** large battery, power sharing.
- **Firmware:** gateway + AI inference provider.
- **Testing:** continuous inference thermal; battery runtime.
- **Capabilities:** AI Inference, Gateway, Compute, Storage.
- **Lessons:** thermals on continuous LLM workloads drive chassis thermal budget.

## 20.5 Smart Home Dock Integrated into the DMWE Mesh

- **Requirements:** power, expansion, high-bandwidth bridging; always-on.
- **Architecture:** hub SoC; Ethernet + Wi-Fi + Thread + USB; AC-powered.
- **Firmware:** Primary-capable node (Volume IV, Ch 4); gateway services.
- **Testing:** coexistence of radios; QoS across bridge.
- **Capabilities:** Gateway, Power, Expansion, Hub.
- **Lessons:** thread/matter bridging needed careful coexistence scheduling.

## 20.6 Case Study Structure

Each case study covers: requirement analysis, hardware selection, firmware architecture, mechanical design, testing, manufacturing considerations, and expected interaction capabilities.

## 20.7 Summary

These cases demonstrate that the guidance in this volume yields real, certifiable, ecosystem-ready modules.
