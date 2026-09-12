# Chapter 5: Processor Selection Guide

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 5.1 MCU vs MPU vs SoC

| Type | Strengths | Use For |
|------|-----------|---------|
| MCU | Low power, deterministic, simple | Sensing, pointers, haptics |
| MPU | General-purpose OS, rich I/O | Compute hubs, gateways |
| SoC | Integrated radios/accelerators | Multi-function modules |
| MCU + NPU | AI at low power | On-device inference |

## 5.2 Selection Criteria

- **CPU architecture** — ecosystem maturity, toolchain, power.
- **AI accelerator** — TOPS/W for inference tasks.
- **DSP integration** — audio/voice processing.
- **Memory requirements** — RAM for runtime + models.
- **External flash** — firmware + state storage.
- **Boot time** — time to mesh-ready.
- **Real-time performance** — interrupt latency, scheduling.

## 5.3 Design Classes

### Ultra-Low Power
Ring, bracelet, earbuds.

- MCU class, sub-mA average draw.
- Small RAM (tens–hundreds of KB).
- Event-driven wake-up.
- Example: Cortex-M0+/M4 MCU with BLE.

### Balanced
Necklace, headband, glasses.

- Mid-range MCU/SoC with more RAM and radio.
- DSP or small accelerator for audio/vision.
- Example: MCU+BLE/NFC or entry SoC.

### High Performance
Pocket module, desktop hub, vehicle hub, edge node.

- MPU/SoC with OS support.
- NPU/GPU for heavy AI.
- High-bandwidth comms (Wi-Fi, USB).
- Example: application SoC running Linux-class runtime.

## 5.4 Decision Table

| Module Role | Class | Compute | Memory | AI | Radio |
|-------------|-------|---------|--------|----|-------|
| Pointer ring | Ultra-low | MCU | Small | Optional | BLE |
| Voice earbud | Ultra-low | MCU+DSP | Small | Optional | BLE |
| Necklace hub | Balanced | SoC | Medium | Small NPU | BLE+Wi-Fi |
| Vision headband | Balanced | SoC+DSP | Medium | NPU | BLE+Wi-Fi |
| Pocket AI | High | MPU/SoC | Large | NPU/GPU | Wi-Fi+Cellular |
| Desk hub | High | MPU/SoC | Large | Optional | Ethernet+Wi-Fi+USB |

## 5.5 Power vs Performance Trade-offs

- Higher performance raises thermals (Chapter 12) and battery drain.
- Right-size compute to the capability set; over-provisioning wastes energy.
- Consider heterogeneous cores: low-power always-on core + high-performance burst core.

## 5.6 Longevity & Availability

- Choose parts with long availability windows.
- Avoid single-sourced exotic parts for critical roles.
- Plan for second-source alternatives (Chapter 16).

## 5.7 Boot & Secure Boot

- Verify secure boot capability (Volume III, Ch 12).
- Account for boot time in latency budgets.
- Ensure rollback and recovery modes exist.

## 5.8 Summary

Match processor class to module role and budgets; verify availability and security features before committing.
