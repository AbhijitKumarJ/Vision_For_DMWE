# Chapter 3: Module Architecture

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

This chapter defines the common internal architecture of a DMWE module and the physical connector that links modules to a chassis and to each other.

## 3.1 Common Internal Architecture

Every hardware module follows a common layered architecture:

```
Application Services
────────────────────
Capability Services
────────────────────
Module Runtime
────────────────────
Hardware Drivers
────────────────────
Sensors & Actuators
────────────────────
Communication Stack
────────────────────
Power Management
────────────────────
Secure Boot
```

| Layer | Responsibility |
|-------|----------------|
| Application Services | Vendor or mesh applications running on the module |
| Capability Services | Standardized capability implementations |
| Module Runtime | Local OS/RTOS runtime, scheduler |
| Hardware Drivers | Uniform driver interfaces (Volume II, Ch 3) |
| Sensors & Actuators | Physical transducers |
| Communication Stack | Mesh transports |
| Power Management | Energy state, charging |
| Secure Boot | Verified boot chain |

## 3.2 The Universal Connector (18-Pin)

Modules attach to a conductive chassis (necklace, wristband, headband) or dock via the **Universal Connector** — a compact, hot-swappable magnetic connector.

### Design Goals

- Miniaturized yet robust (≤ 8–10 mm diameter or equivalent).
- Hot-swappable with magnetic alignment and retention.
- Power + high-speed data.
- Future-proof: reserved pins, multi-protocol capability.
- Reliable under body movement, sweat, and flex.
- Supports daisy-chaining / e-thread backplane.

### Physical Connector Specification

| Property | Specification |
|----------|---------------|
| Form factor | Circular magnetic pogo-pin (preferred, 360° tolerance) or rectangular keyed |
| Retention force | 1.5–3 N with alignment guides |
| IP rating | IPx6 minimum when mated |
| Insertion cycles | ≥ 10,000 |
| Mated height | ≤ 2.5 mm |
| Orientation | Blind-mate, magnetic self-alignment + keying |
| Operating temp | Up to 85 °C |

### 18-Pin Pinout (Bead/Male side)

| Pin | Name | Direction | Function | Spec | Notes |
|-----|------|-----------|----------|------|-------|
| 1 | VBUS | In/Out | Main power delivery | 3.0–5.5 V (nom 3.7–4.2 V) | High current, up to 2 A shared |
| 2 | GND | - | Power & signal ground | - | Multiple ground pads recommended |
| 3 | VBAT_SENSE | Out | Battery voltage monitoring | 0–5.5 V analog | Power management |
| 4 | 3V3 | Out | Regulated 3.3 V rail | 3.3 V ±5% | Low-power peripherals |
| 5 | 1V8 | Out | Regulated 1.8 V rail (optional) | 1.8 V | Future low-power logic |
| 6 | I2C_SDA | Bi-dir | I²C data | 3.3 V logic | Primary control bus |
| 7 | I2C_SCL | Out | I²C clock | 3.3 V logic | |
| 8 | SPI_MOSI / UART_TX | Bi-dir | SPI MOSI or UART TX | 3.3 V | Multi-protocol |
| 9 | SPI_MISO / UART_RX | Bi-dir | SPI MISO or UART RX | 3.3 V | Multi-protocol |
| 10 | SPI_SCK / UART_CTS | Out | SPI clock or UART CTS | 3.3 V | |
| 11 | SPI_CS / UART_RTS | Out | SPI CS or UART RTS | 3.3 V | |
| 12 | USB_D+ / HS_DATA+ | Bi-dir | High-speed differential | USB 2.0 HS | High bandwidth |
| 13 | USB_D- / HS_DATA- | Bi-dir | High-speed differential | USB 2.0 HS | |
| 14 | UWB_ANT | RF | UWB antenna / positioning | 3–10 GHz | Spatial awareness |
| 15 | IRQ / WAKE | In | Interrupt / wake line | 3.3 V | Low-latency events |
| 16 | RESERVED_1 | - | Future expansion (PCIe, MIPI) | - | |
| 17 | RESERVED_2 | - | Future expansion | - | |
| 18 | ID / ONE-WIRE | Bi-dir | Module identification + 1-Wire | 3.3 V | Unique ID + basic comms |

### Electrical Specifications

- **Power delivery:** up to 2 A continuous on VBUS (shared across chassis); beads negotiate budgets via MeshOS.
- **Data:** I²C up to 1 MHz; SPI up to 50 MHz; USB 2.0 HS 480 Mbps (or future alt modes).
- **Logic level:** 3.3 V standard (1.8 V tolerant where needed).
- **Hot-plug protection:** current limiting, ESD protection, debounce on all lines.
- **Power sequencing:** defined in Volume IV — beads power up in safe mode until authenticated.

### Compliance Subsets

- **Core:** Power, GND, I²C, ID pin, basic descriptor.
- **Enhanced:** + high-speed data, UWB, SPI/UART.
- **Full:** all 18 pins + reserved lines.

## 3.3 The Chassis (Backplane)

The chassis (necklace, wristband, headband) provides:

- **E-threads:** flexible, micro-woven conductive threads for power + data.
- **Connectors:** magnetic snap-on rails with pogo pins or inductive/capacitive coupling.
- **Internal bus:** I²C/SPI over the threads (hardwired, low latency).
- **Mechanical:** strain relief, flex accommodation.

Chassis behavior is defined in Volume III-A; electrical characteristics follow this chapter's connector spec.

## 3.4 Module-Centric Design Rules

- Modules MUST work standalone (battery + radio) and in a chassis (shared power/data).
- Modules MUST tolerate insertion/removal while powered (hot-plug protection).
- Reserved pins MUST NOT be used by non-conformant features.
