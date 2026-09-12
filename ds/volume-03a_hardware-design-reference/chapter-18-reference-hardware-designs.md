# Chapter 18: Reference Hardware Designs

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

Rather than full schematics, this chapter presents architectural reference designs for the catalog in Volume III, Chapter 14.

## 18.1 Smart Ring

Focus: ultra-low-power interaction node, gesture sensing, secure authentication.

- **Processor:** ultra-low-power MCU (Chapter 5).
- **Sensors:** IMU, capacitive touch.
- **Outputs:** haptics, LED.
- **Comms:** BLE (UWB optional).
- **Power:** small LiPo, USB-C/wireless charge.
- **Security:** secure element, biometric option.
- **Thermal:** strict finger limits.
- **Firmware:** layered with mesh client.
- **Capabilities:** Pointer, Selection, Gesture, Auth.
- **Resource budget:** tens of KB RAM, µA sleep.

## 18.2 Smart Necklace

Focus: distributed compute hub, projection, audio, large battery.

- **Processor:** balanced SoC with DSP/NPU.
- **Sensors:** mic array, IMU, environmental.
- **Outputs:** projector, speakers.
- **Comms:** BLE + Wi-Fi (+ UWB).
- **Power:** large battery, power sharing (chassis).
- **Thermal:** moderate neck budget.
- **Firmware:** node + capability services.
- **Capabilities:** Projection, Voice, Audio, Compute.
- **Resource budget:** MB-class RAM, AI acceleration.

## 18.3 Smart Glasses

Focus: vision, spatial awareness, display.

- **Processor:** balanced SoC + vision accelerator.
- **Sensors:** camera, ToF/depth, IMU.
- **Outputs:** display, audio.
- **Comms:** BLE + Wi-Fi + UWB.
- **Thermal:** strict face limits.
- **Capabilities:** Vision, Spatial, Localization, Display.

## 18.4 Earbuds

Focus: voice, audio, IMU.

- **Processor:** ultra-low MCU + DSP.
- **Sensors:** MEMS mics, IMU, PPG (optional).
- **Outputs:** speakers.
- **Comms:** BLE.
- **Capabilities:** Voice input, Audio output, Hearable sensing.

## 18.5 Pocket Compute Module

Focus: AI processing, networking, high-capacity battery.

- **Processor:** high-performance MPU/SoC + NPU.
- **Comms:** Wi-Fi, cellular, USB.
- **Power:** large battery, power sharing.
- **Capabilities:** AI inference, Gateway, Storage, Compute.

## 18.6 Ambient Dock

Focus: power, expansion, high-bandwidth communication.

- **Processor:** high-performance hub class.
- **Comms:** Ethernet, Wi-Fi, USB-C, Thread.
- **Power:** AC-powered, charges and powers the mesh.
- **Capabilities:** Gateway, Power, Expansion, Hub.

## 18.7 Design Deliverables

Each design includes:

- Block diagram.
- Recommended processor class.
- Sensor selection.
- Power architecture.
- Thermal strategy.
- Firmware structure.
- Expected capabilities.
- Estimated resource budget.

## 18.8 Summary

These references are baselines; custom modules must remain UMS-compatible (Volume III, Ch 1).
