# Chapter 4: Electronic System Design

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 4.1 Reusable Subsystems

Break the electrical architecture into reusable subsystems:

- **Processing** — MCU/MPU/SoC and support.
- **Sensors** — transducers and conditioning.
- **Memory** — RAM and storage.
- **Power** — battery, charging, regulation.
- **Communication** — radios and wired interfaces.
- **Security** — secure element, crypto.
- **User Interface** — haptics, LEDs, buttons.
- **Debug Interfaces** — SWD/JTAG, UART, test points.

## 4.2 Subsystem Design Criteria

For each subsystem consider:

- **Component selection** — availability, longevity, power, size.
- **Signal integrity** — routing, termination, impedance.
- **Interface standards** — match Volume III pinout and protocols.
- **Noise considerations** — isolation, decoupling, shielding.
- **Expandability** — reserved pins and test points.

## 4.3 Reference Block Diagrams

Common integration patterns:

**Processing Core**
```
Power → MCU/SoC → Flash/SRAM
              ↑      ↓
           Sensors  Comms
```

**Power System**
```
Battery → Charger → VBUS (connector)
   ↓
Fuel Gauge → PMIC → 3V3 / rails → Loads
```

**RF Subsystem**
```
Radio SoC → Matching → Antenna
   ↑
Coexistence pins
```

## 4.4 Processing

- Select class per role (Chapter 5).
- Provide decoupling per vendor guidance.
- Include boot configuration (straps), clock, and reset supervision.

## 4.5 Sensors

- Follow Chapter 6 placement/calibration guidance.
- Provide proper bias, filtering, and ESD protection.
- Use I²C/SPI per Volume III connector mapping.

## 4.6 Memory

- RAM sizing by runtime requirements.
- External flash for firmware/state with write protection.
- Storage class per module role (Volume II, Ch 7).

## 4.7 Power

- Follow Chapter 7 architecture.
- Ensure hot-plug protection at the connector (Volume III, Ch 3).

## 4.8 Communication

- Follow Chapter 8 RF guidance.
- Implement transport adapters in firmware (Volume IV, Ch 11).

## 4.9 Security

- Follow Chapter 9 recommendations (secure element, secure boot).
- Never expose keys in debug interfaces.

## 4.10 User Interface

- Haptics, LEDs, and buttons with standardized capability services.
- Feedback MUST be honest (e.g., LED reflects real state).

## 4.11 Debug Interfaces

- Include SWD/JTAG and UART for development.
- Disable or authenticate debug access in production (Volume III, Ch 12).

## 4.12 Review Checklist

- Schematics reviewed for power, signal integrity, protection.
- All connector pins honored (Volume III, Ch 3).
- Decoupling complete.
- Test points present for validation.

## 4.13 Summary

Reusable subsystems with consistent criteria produce reliable, maintainable modules.
