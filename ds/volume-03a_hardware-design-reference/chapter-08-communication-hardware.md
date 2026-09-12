# Chapter 8: Communication Hardware

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 8.1 Radio Technologies

| Tech | Band | Use | Notes |
|------|------|-----|-------|
| BLE | 2.4 GHz | Input streaming, near-body links | Low power |
| Wi-Fi | 2.4/5/6 GHz | High bandwidth | Power hungry |
| UWB | 3–10 GHz | Sub-cm positioning | Spatial (Volume III, Ch 10) |
| Thread | 2.4 GHz | Smart-home mesh | IPv6 mesh |
| Matter | — | IoT interoperability | App layer |
| NFC | 13.56 MHz | Pairing, payments | Short range |
| USB | Wired | Docking, data, charging | 18-pin connector |

## 8.2 Antenna Placement

- Keep antennas away from metal, batteries, and body tissue.
- Ring and small modules: PCB or 3D antennas; verify detuning on the body.
- Necklace/headband: use the chassis as a reflector carefully; measure.
- UWB needs good spatial separation from other radios.

## 8.3 RF Isolation

- Shield radios from digital noise (ground planes, shields).
- Separate antenna keep-out zones in layout (Chapter 10).
- Verify isolation between co-located radios.

## 8.4 Coexistence

- BLE/Wi-Fi/UWB share 2.4/5 GHz; plan scheduling (Volume III, Ch 9).
- Use coexistence pins between radio ICs where available.
- Implement multi-radio scheduling in firmware (Volume IV, Ch 11).

## 8.5 Latency

- Choose radios and stack configuration to meet class budgets:
  - Real-time interaction < 10–20 ms.
  - Audio < 50 ms, Video < 150 ms.
- BLE connection interval tuning matters for latency.

## 8.6 Power Consumption

- Radio dominates active power; duty-cycle aggressively.
- Use short connection events, fast wake.
- Wi-Fi/UWB are power-hungry — use only when needed.

## 8.7 Throughput

- Size for vision/audio streams.
- USB and Wi-Fi for bulk; BLE for events.

## 8.8 Roaming

- Support seamless handoff between infrastructure (home, vehicle, office).
- Mesh handoff per Volume IV, Ch 4.

## 8.9 Interference Mitigation

- Adaptive frequency hopping.
- Retry and channel diversity.
- Coexistence scheduling with high-bandwidth radios.

## 8.10 Body-Worn RF

- SAR compliance and RF exposure limits (Volume X).
- Antenna performance varies with body contact — characterize on a body phantom.
- Sweat/water ingress protection for RF openings (IPx6, Volume III, Ch 3).

## 8.11 Reference RF Architectures

- **BLE-only module:** SoC radio + matching + antenna.
- **Multi-radio module:** BLE + Wi-Fi + UWB with coexistence and separate antennas.
- **Gateway module:** Wi-Fi/Ethernet + Thread + BLE bridging.

## 8.12 Summary

Reliable body-worn communication requires disciplined antenna, isolation, coexistence, and power engineering.
