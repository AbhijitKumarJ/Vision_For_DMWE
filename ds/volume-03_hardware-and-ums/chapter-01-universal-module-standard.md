# Chapter 1: Universal Module Standard (UMS)

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

## 1.1 Purpose

This volume defines the physical, electrical, logical, and software requirements for hardware modules that participate in the Distributed Modular Wearable Ecosystem (DMWE). It is the equivalent of the USB Device Specification or PCI Express Base Specification — but for wearable and ambient modules.

It standardizes how modules identify themselves, communicate with the Mesh Operating System, expose capabilities, manage power, report health, and cooperate with other modules. This specification intentionally **avoids restricting hardware innovation**: it defines the minimum interfaces and behaviors required for interoperability.

## 1.2 The Universal Module

A **Universal Module** is the smallest independently functioning hardware participant within the DMWE ecosystem. Every module is treated as a distributed computing node regardless of its physical size.

Examples include:

- Smart Ring
- Bracelet
- Necklace
- Headband
- Smart Glasses
- Earbuds
- Belt Module
- Pocket Compute Unit
- Smart Clothing
- Ambient Dock
- Vehicle Hub

## 1.3 Mandatory Module Properties

Every module MUST expose:

1. **Unique identity** — a globally unique Module ID.
2. **Secure boot** — verified boot chain.
3. **Communication interface** — at least one mesh transport.
4. **Capability advertisement** — what the module can do.
5. **Health reporting** — operational telemetry.
6. **Firmware versioning** — versioned, updatable firmware.
7. **Authentication support** — secure element for identity and session keys.

## 1.4 The Module Descriptor

The **Module Descriptor** is the digital identity every module MUST expose to the Mesh OS. It is the primary contract between hardware and the platform (specified in Chapter 4).

## 1.5 Interoperability, Not Uniformity

This standard does NOT dictate:

- Specific processors, sensors, or vendors.
- Physical size or industrial design.
- Number of capabilities or performance level.

It DOES dictate:

- Electrical and logical interfaces (Chapter 3, Volume III-A).
- The connector specification (Chapter 3, §3.2).
- Identity, discovery, and capability advertisement.
- Power, health, and update behaviors.

## 1.6 Compliance Levels

Modules are certified at three levels (detailed in Chapter 15):

- **Core** — power, ground, control bus, ID, basic descriptor.
- **Enhanced** — adds high-speed data, UWB, SPI/UART.
- **Full** — all pins and reserved lines utilized.

## 1.7 Module Mechanical Specification

### 1.7.1 Form Factor Envelopes

| Module Type | Max Width | Max Depth | Max Weight | Notes |
|-------------|-----------|-----------|------------|-------|
| Ring | 12 mm | 12 mm | 8 g | Finger-worn; must clear knuckle bend |
| Bracelet bead | 14 mm | 14 mm | 12 g | Wrist-worn; standard bead size |
| Necklace bead | 16 mm | 16 mm | 15 g | Neck-worn; slightly larger envelope |
| Headband module | 20 mm | 15 mm | 10 g | Head-worn; lightweight critical |
| Glasses module | 18 mm | 12 mm | 8 g | Temple-mounted; ultra-compact |
| Earbud module | 10 mm | 10 mm | 6 g | In-ear; smallest envelope |
| Dock module | 50 mm | 50 mm | 200 g | Desk/vehicle; no weight constraint |

### 1.7.2 Mechanical Tolerances

| Property | Tolerance |
|----------|-----------|
| Connector alignment (lateral) | ±0.3 mm |
| Connector alignment (vertical) | ±0.2 mm |
| Mated connector height | 2.5 mm ±0.1 mm |
| Magnetic retention force | 1.5–3.0 N |
| Insertion/extraction force | 0.5–2.0 N |
| Pin contact resistance | ≤ 50 mΩ initial; ≤ 100 mΩ after 10k cycles |

### 1.7.3 Environmental Requirements

| Property | Requirement |
|----------|-------------|
| Operating temperature | 0°C to 45°C |
| Storage temperature | -20°C to 60°C |
| Humidity (non-condensing) | 10% to 90% |
| Ingress protection (mated) | IPx6 minimum |
| Shock resistance | 1 m drop onto hard surface, 3 axes |
| Vibration resistance | 5–500 Hz, 2g RMS, 3 axes |
| Sweat resistance | ISO 105-E04 artificial sweat, 8 hours |

## 1.8 Module Power States

Every module MUST implement the following power states:

| State | Description | Power Draw | Wake Time |
|-------|-------------|------------|-----------|
| **OFF** | No power; disconnected from chassis | 0 µA | N/A |
| **STANDBY** | Minimal monitoring; listening for wake | ≤ 50 µA | ≤ 100 ms |
| **IDLE** | Powered, authenticated, no active task | ≤ 5 mA | ≤ 10 ms |
| **ACTIVE** | Executing capability; sensor/actuator engaged | 5–50 mA | 0 ms (already active) |
| **BOOST** | High-performance mode; max throughput | 50–200 mA | 0 ms |
| **EMERGENCY** | Safety-critical only; minimal functions | ≤ 10 mA | 0 ms |
| **SUSPEND** | Deep sleep; retains volatile state | ≤ 10 µA | ≤ 500 ms |

### 1.8.1 State Transition Rules

- STANDBY → IDLE: triggered by chassis connection, BLE advertisement, or button press.
- IDLE → ACTIVE: triggered by capability invocation or sensor threshold.
- ACTIVE → BOOST: triggered by scheduler request for high-throughput task.
- Any → EMERGENCY: triggered by safety event or tamper detection.
- Any → SUSPEND: triggered by energy budget exhaustion or user command.
- EMERGENCY → IDLE: only after safety condition cleared and health check passed.

## 1.9 Thermal Management

| Property | Requirement |
|----------|-------------|
| Maximum skin-contact temperature | 41°C (per IEC 62368-1) |
| Thermal throttling threshold | 45°C junction temperature |
| Thermal shutdown threshold | 60°C junction temperature |
| Thermal time constant | ≥ 30 seconds (slow ramp to allow user response) |
| Thermal reporting interval | Every 5 seconds when above 40°C |

- Modules MUST report thermal state via TelemetrySample (Volume XI, Ch 15).
- When thermal throttling triggers, the module MUST reduce to ACTIVE state and notify the scheduler.

## 1.10 Compliance Test Procedures

Every module MUST pass the following test suite before certification (Chapter 15):

### 1.10.1 Electrical Tests

| Test | Procedure | Pass Criteria |
|------|-----------|---------------|
| VBUS voltage range | Apply 3.0–5.5 V; measure regulation | Output within ±5% of nominal |
| Current limit | Draw increasing current on VBUS | Limits at 2 A ±10% |
| ESD protection | ±8 kV contact; ±15 kV air (IEC 61000-4-2) | No damage; full functionality after |
| Hot-plug surge | Insert/extract under load 1000× | No damage; no data corruption |
| Logic level compatibility | Apply 1.8 V and 3.3 V signals | Correct interpretation at both levels |

### 1.10.2 Mechanical Tests

| Test | Procedure | Pass Criteria |
|------|-----------|---------------|
| Insertion endurance | 10,000 mate/demate cycles | Contact resistance ≤ 100 mΩ |
| Retention force | Measure force to demate | 1.5–3.0 N |
| Drop test | 1 m drop, 6 faces, 3× each | No structural damage; full function |
| Flex test | Chassis flex 10,000× at 15° | No conductor break; full function |
| Connector alignment | Misalign ±0.5 mm; attempt mate | Self-aligns; no pin damage |

### 1.10.3 Environmental Tests

| Test | Procedure | Pass Criteria |
|------|-----------|---------------|
| Thermal cycling | -20°C to 60°C, 100 cycles | No cracking; full function |
| Humidity | 85°C/85% RH, 1000 hours | No corrosion; full function |
| Sweat resistance | ISO 105-E04, 8 hours at 37°C | No corrosion; full function |
| IPx6 water jet | 12.5 mm nozzle, 100 L/min, 3 min | No water ingress |

### 1.10.4 Protocol Tests

| Test | Procedure | Pass Criteria |
|------|-----------|---------------|
| Descriptor compliance | Verify all mandatory fields present | 100% field coverage |
| Capability advertisement | Verify correct advertisement format | Matches Volume V schema |
| Authentication handshake | Complete mutual authentication | Session established within 2 s |
| Firmware version query | Query version; compare to descriptor | Consistent version reporting |
| Health telemetry | Verify telemetry sample format | All mandatory fields populated |

## 1.11 Relationship to Other Volumes

| Topic | Where specified |
|-------|-----------------|
| Electrical connector & pinout | This volume, Chapter 3 |
| Engineering guidance | Volume III-A |
| Module lifecycle states | This volume, Chapter 11 |
| Capability model | Volume V |
| Firmware internals | This volume, Chapter 12 |
| Certification process | This volume, Chapter 15; Volume X |

## 1.8 Normative Conventions

MUST / SHOULD / MAY are used as defined in Volume I, Chapter 1.
