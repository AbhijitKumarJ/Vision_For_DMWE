# Chapter 16: Manufacturing Guidelines

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 16.1 Design for Manufacturing (DFM)

- Standard footprints, reasonable tolerances.
- Panelization-friendly layout.
- Fiducials and tooling holes.
- Avoid exotic processes.

## 16.2 Design for Assembly (DFA)

- Fewer, simpler assemblies.
- Poka-yoke (mistake-proof) connectors and enclosures.
- Serviceable sub-assemblies.

## 16.3 Component Sourcing

- Confirm availability at prototype AND production volumes.
- Prefer multi-source parts.
- Establish long-term supply agreements for key parts.

## 16.4 Supply Chain Resilience

- Second sources for critical components.
- Buffer stock for long-lead parts.
- Monitor obsolescence (Chapter 17).

## 16.5 PCB Panelization

- Optimize panels for yield and cost.
- Include test coupons.
- V-score or tab-routing per assembly line.

## 16.6 Assembly Processes

- SMT line qualification.
- Underfill for flex/impact areas.
- Conformal coating for sweat/water resistance.

## 16.7 Factory Programming

- Provision identity and keys at manufacture (Volume III, Ch 11).
- Flash firmware and calibration.
- Fuse-off debug access (Chapter 9).

## 16.8 Calibration

- Calibrate sensors on the line.
- Store calibration data in the Module Descriptor store.

## 16.9 Quality Assurance

- Incoming inspection, in-process checks, final test.
- Statistical process control for critical params.
- Sample reliability testing from each batch.

## 16.10 Packaging

- ESD-safe packaging.
- Moisture barrier where needed.
- Labeling with serial and certification marks.

## 16.11 Serialization & Traceability

- Unique serial per unit (Volume III, Ch 4).
- Batch and material traceability.
- Link serial to calibration and factory data.

## 16.12 Summary

Manufacturing discipline (DFM/DFA, sourcing, calibration, traceability) makes conformance reproducible at scale.
