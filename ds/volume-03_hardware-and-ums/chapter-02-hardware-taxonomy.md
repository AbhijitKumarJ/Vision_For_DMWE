# Chapter 2: Hardware Taxonomy

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

Rather than listing products, DMWE classifies modules by function. A module MAY belong to multiple classes.

## 2.1 Compute Modules

**Primary role:** processing, AI acceleration, memory.

- CPU, GPU, NPU, DSP
- Memory (RAM, flash)
- AI acceleration

Examples: smartphone, pocket computer, compute necklace, desktop dock.

## 2.2 Sensor Modules

**Primary role:** observing the user and environment.

Categories:

| Category | Examples |
|----------|----------|
| Motion | IMU (accel/gyro/mag) |
| Vision | Camera (RGB/IR), LiDAR, depth, ToF |
| Bioelectric | EMG, EEG, ECG, PPG |
| Audio | Microphones |
| Positioning | GPS, UWB |
| Environmental | Temperature, pressure, humidity, air quality, light |
| Touch/Proximity | Capacitive touch, proximity |

## 2.3 Output Modules

**Primary role:** generating feedback.

- Projection (pico-projector, holographic)
- Display (micro-display, AR overlay)
- Audio (speakers, ultrasonic directional audio)
- Haptic feedback
- LEDs / ambient lighting
- Thermal actuators

## 2.4 Communication Modules

**Primary role:** providing connectivity.

- BLE, Wi-Fi, Thread, Matter, NFC, UWB
- Cellular, Satellite

## 2.5 Power Modules

**Primary role:** energy distribution.

- Battery packs
- Wireless chargers
- Energy harvesting (kinetic, solar, thermal)
- Supercapacitors

## 2.6 Security Modules

**Primary role:** trusted execution.

- Secure Element / TPM
- Biometric processor
- Cryptographic accelerator

## 2.7 Module Classes vs Digital Roles

Classes describe **hardware function**; roles describe **system contribution** (Chapter 6). A camera is a Sensor class; it may play the role of Vision Node or Localization Node. Roles are advisory for scheduling; classes are structural.

## 2.8 Composite Module Examples

| Module | Classes | Roles |
|--------|---------|-------|
| Smart Necklace | Compute + Output + Power | Compute hub, Projection module |
| Pocket Compute Unit | Compute + Comms + Power | Edge compute module |
| Smart Ring | Sensor + Security | Input module, Auth module |
| Smart Glasses | Sensor + Output | Vision module, Display module |

This taxonomy guides the design patterns in Volume III-A.
