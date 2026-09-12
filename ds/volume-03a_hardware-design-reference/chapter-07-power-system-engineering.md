# Chapter 7: Power System Engineering

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 7.1 Battery Chemistry

| Chemistry | Energy Density | Cycle Life | Notes |
|-----------|----------------|------------|-------|
| Li-ion | High | Medium | Standard wearables |
| LiPo | High | Medium | Flexible form factors |
| LiFePO4 | Lower | High | Safety-critical/industrial |
| Solid-state | (future) | Very high | Emerging |

Match chemistry to form factor, safety class, and lifetime requirements.

## 7.2 Battery Sizing

- Compute required capacity from the power budget (Chapter 3).
- Add margin for aging (typically 20% capacity fade), self-discharge, and low-temp operation.
- Reserve energy for critical shutdown (Volume III, Ch 8).

## 7.3 Fuel Gauging

- Use coulomb-counting plus voltage/OCV correction.
- Report level, health, temperature, and charge state (Volume III, Ch 8).
- Calibrate empty/full thresholds.

## 7.4 Power Path Management

- Prefer a power-path architecture: load runs from charger when present, battery otherwise.
- Enable **power sharing** on a chassis (VBUS, up to 2 A shared — Volume III, Ch 3).

## 7.5 Charging ICs

- Support the negotiated charging model (Volume IV, Ch 13).
- Include termination, over-voltage, over-temperature protection.
- Wireless charging (Qi) where form factor allows.

## 7.6 Wireless Charging

- Coil placement and alignment matter for efficiency.
- Account for eddy currents in metal enclosures (use ferrite shields).
- Report charge state through the power service.

## 7.7 Energy Harvesting

- Kinetic, solar, thermal, RF harvesting may top up the shared budget.
- Harvesting hardware MUST report availability/energy contributed.

## 7.8 Dynamic Voltage Scaling

- Scale core/radio voltage to workload.
- Use multiple sleep states (active, idle, deep sleep, off).

## 7.9 Sleep Architecture

- Design an always-on, ultra-low-power subsystem for wake triggers.
- Wake via IRQ/WAKE connector pin, radio wake, scheduled wake, sensor event.
- Document wake latency per state.

## 7.10 Peak Current Handling

- Radios and haptic drivers draw large pulses.
- Size input capacitance (bulk + ceramic) to avoid droop and brownout.
- Validate against connector VBUS limits.

## 7.11 Thermal Effects

- Charging and AI workloads generate heat (Chapter 12).
- Derate battery charge rate at temperature.

## 7.12 Runtime Calculations

- Expected runtime = usable capacity / average current.
- Model per-scenario (interaction, standby, streaming).

## 7.13 Charging Safety

- Over-charge, over-discharge, and over-temperature protection are mandatory.
- Safety-critical modules fail-safe (Volume III, Ch 8).

## 7.14 Reference Power Architectures

- **Single-battery module:** Battery → Charger → PMIC → rails; VBUS in/out.
- **Power Node (chassis bead):** Large battery + sharing control to VBUS.
- **Harvesting module:** Harvester → boost → PMIC → battery.

## 7.15 Summary

Sizing, gauging, protection, and sharing make power the mesh's most dependable pooled resource.
