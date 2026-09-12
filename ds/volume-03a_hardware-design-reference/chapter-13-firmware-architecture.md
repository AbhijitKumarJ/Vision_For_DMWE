# Chapter 13: Firmware Architecture

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 13.1 Recommended Layering

```
Bootloader
   ↓
HAL
   ↓
Drivers
   ↓
RTOS
   ↓
Capability Services
   ↓
Communication
   ↓
Diagnostics
   ↓
Update Manager
```

## 13.2 Bootloader

- Verified boot with rollback protection (Volume III, Ch 12).
- Recovery mode for corrupt images.
- A/B image support.

## 13.3 HAL (Hardware Abstraction Layer)

- Uniform interfaces for MCU, sensors, radios.
- Enable portability across vendors.
- Abstract power states.

## 13.4 Drivers

- Driver interfaces per Volume III, Ch 12.
- Data formats per Volume III, Ch 7.
- Driver self-test hooks.

## 13.5 RTOS

- Preemptive scheduling, priority-based.
- Bounded interrupt latency.
- Memory protection between tasks.

## 13.6 Capability Services

- Implement capabilities as services (Volume IV, Ch 5–6).
- Register with the Module Descriptor (Volume III, Ch 4).
- Report quality metadata.

## 13.7 Communication

- Transport adapters (Volume IV, Ch 11).
- Coexistence scheduling for multi-radio.
- Mesh client (join, discovery, descriptor).

## 13.8 Diagnostics

- Health metrics (Volume IV, Ch 15).
- Logging, fault codes (Volume III, Ch 13).
- Self-test support.

## 13.9 Update Manager

- Signed OTA (Volume III, Ch 12; Volume IV, Ch 20).
- A/B switching, rollback.
- Version compatibility checks.

## 13.10 Implementation Topics

- **Interrupts:** minimize critical sections; use deferred processing.
- **Real-time scheduling:** meet latency classes (Volume III, Ch 9).
- **Memory management:** static allocation preferred; guard stacks.
- **Watchdogs:** independent + application watchdogs.
- **Power states:** idle, sleep, deep sleep with documented wake latencies.
- **Logging:** structured, non-blocking, privacy-safe.
- **Crash recovery:** watchdog reset, checkpoint restore, health reporting.

## 13.11 Summary

A layered firmware architecture with security, updates, and diagnostics built in produces dependable ecosystem nodes.
