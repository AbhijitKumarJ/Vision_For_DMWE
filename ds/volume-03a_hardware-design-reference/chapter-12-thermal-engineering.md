# Chapter 12: Thermal Engineering

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 12.1 Heat Sources

- **Compute** — CPU/GPU/NPU under load (continuous AI is dominant).
- **Radio** — transmit power.
- **Charging** — charge current losses.
- **Sensors** — active illumination (ToF, camera).

## 12.2 Passive Cooling

- Use copper pours and thermal vias for spreading.
- Enclosure as a heatsink (with skin-safe surface temperature).
- Gap fillers to hot components.

## 12.3 Heat Spreading

- Spread heat over larger area to stay below skin limits.
- Use the chassis as a thermal bus where possible.
- Keep hot spots away from skin-contact surfaces.

## 12.4 Thermal Simulation

- Model steady-state and transient loads.
- Simulate charging and AI workloads.
- Validate with thermocouple measurements (Chapter 15).

## 12.5 Surface Temperature Limits

- Skin-contact surfaces MUST stay within safe limits (IEC/ISO contact temperature standards).
- Non-contact surfaces have higher allowable limits.
- Define limits per body location.

## 12.6 Charging Heat

- Charge rates should be derated at temperature.
- Communicate thermal state to the mesh (Volume IV, Ch 13).

## 12.7 Continuous AI Workloads

- Size cooling for sustained inference.
- The mesh should migrate hot workloads (Volume IV, Ch 8).
- Provide thermal throttle in firmware.

## 12.8 Environmental Conditions

- Ambient temperature affects dissipation.
- Validate in hot environments (up to 85 °C operating, Volume III, Ch 3).

## 12.9 Thermal Budgets by Body Location

| Body Location | Recommended Skin-Limit Margin | Notes |
|---------------|-------------------------------|-------|
| Finger (ring) | Strictest | Small surface, direct contact |
| Wrist (band) | Strict | Limited dissipation |
| Neck (chassis) | Moderate | Larger surface |
| Headband | Strict | Near eyes/face |
| Belt/waist | Moderate | Clothing may insulate |
| Pocket/hub | Loosest | Not skin-contact |

## 12.10 Summary

Thermal engineering protects users and keeps sustained performance possible in real workloads.
