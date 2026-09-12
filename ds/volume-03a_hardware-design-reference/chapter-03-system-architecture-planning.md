# Chapter 3: System Architecture Planning

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 3.1 Define the Module Before Selecting Components

Designers MUST first define:

| Parameter | Examples |
|-----------|----------|
| Module purpose | Interaction node, compute hub, gateway |
| Roles | Pointer, Vision Node, Power Node (Volume III, Ch 6) |
| Capabilities | Pointer, Gesture, Voice, Projection |
| Performance targets | Accuracy, throughput, recognition rates |
| Latency budgets | End-to-end interaction latency |
| Power budgets | mA draw, runtime targets |
| Thermal limits | Skin-contact temperature limits |
| Physical constraints | Size, weight, form factor |
| Environmental requirements | IP rating, temperature, sweat |
| Cost targets | BOM and manufacturing cost |

## 3.2 Capability-to-Hardware Design Matrix

Map desired capabilities to required hardware:

| Capability | Sensing | Compute | Output | Comms |
|------------|---------|---------|--------|-------|
| Pointer | IMU, touch | MCU | Haptics | BLE |
| Voice | Mic array | DSP/MCU | - | BLE/Wi-Fi |
| Projection | - | SoC | Projector | Wi-Fi |
| Localization | UWB | MCU | - | UWB |
| Authentication | Biometric/secure element | MCU | Haptics | NFC |

The matrix reveals trade-offs early: e.g., a Vision capability forces a camera, an accelerator, and high-bandwidth comms.

## 3.3 Latency Budgeting

- Allocate the end-to-end budget across stages: sensing → local processing → comms → cloud → response → feedback.
- Interactive class budgets (Volume III, Ch 9): keep local processing and transport well under the class ceiling.
- Identify which path (local vs remote) each capability uses.

## 3.4 Power Budgeting

- Sum active, idle, sleep draw per subsystem.
- Model duty cycles (sample rate × active time).
- Derive expected runtime: battery capacity / average draw.
- Leave margin for thermal and aging.

## 3.5 Thermal Limits

- Set a thermal budget per body location (Chapter 12).
- Continuous AI workloads are the dominant heat source; budget accordingly.

## 3.6 Physical Constraints

- The form factor dictates PCB size, battery size, antenna space, and cooling surface.
- Trade size vs battery vs performance explicitly and early.

## 3.7 Environmental Requirements

- Define IP rating, operating temperature, and exposure (sweat, water, impacts).
- These drive enclosure, sealing, and component selection.

## 3.8 Cost Targets

- Set BOM and manufacturing cost targets.
- Use the design matrix to descope capabilities if cost is exceeded.

## 3.9 Architecture Document

The planning stage SHOULD produce:

- Module purpose and roles.
- Design matrix with trade-off decisions.
- Block diagram.
- Power/latency/thermal budgets.
- Component selection candidates.

## 3.10 Summary

Early planning with explicit budgets converts vague ambitions into buildable, trade-off-aware hardware.
