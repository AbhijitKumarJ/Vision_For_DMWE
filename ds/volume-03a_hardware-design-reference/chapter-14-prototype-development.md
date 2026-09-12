# Chapter 14: Prototype Development

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 14.1 Prototype Generations

```
Breadboard
   ↓
Development Kit
   ↓
Alpha PCB
   ↓
Beta PCB
   ↓
Engineering Validation Test (EVT)
   ↓
Design Validation Test (DVT)
   ↓
Production Validation Test (PVT)
   ↓
Mass Production
```

## 14.2 Breadboard

- Validate processor, sensors, and radio concepts.
- Verify electrical interfaces and power draws.
- Prove the Module Descriptor and capability flows early.

## 14.3 Development Kit

- Use vendor dev kits for radios and SoCs.
- Prototype firmware on dev boards.
- Validate RF range and body detuning with a reference antenna.

## 14.4 Alpha PCB

- First integrated layout (Chapter 10).
- Bring-up: power, boot, sensors, radios.
- Validate the 18-pin connector mating (Volume III, Ch 3).

## 14.5 Beta PCB

- Incorporate alpha learnings.
- Near-final mechanical integration.
- Start conformance-aligned testing (Volume III, Ch 15).

## 14.6 Engineering Validation Test (EVT)

- Functional validation per Chapter 15.
- Firmware milestones: boot, update, diagnostics.
- Fix electrical/mechanical issues.

## 14.7 Design Validation Test (DVT)

- Full validation suite (Chapter 15).
- Certification pre-testing.
- User studies on comfort and ergonomics.

## 14.8 Production Validation Test (PVT)

- Manufacturing-line pilot (Chapter 16).
- Factory programming and calibration.
- Quality gate before mass production.

## 14.9 Mass Production

- Ramp manufacturing.
- Maintain traceability and QA.

## 14.10 Stage Checklists

- **Breadboard:** interfaces proven, power budget validated.
- **DevKit:** firmware runs, RF measured.
- **Alpha:** boot, sensors, radios working.
- **Beta:** mechanical integration, conformance-aligned.
- **EVT:** functionality pass, fixes logged.
- **DVT:** validation pass, certification evidence.
- **PVT:** manufacturing yield, factory flow.

## 14.11 Summary

Iterate from concept to mass production with explicit gates; each generation de-risks the next.
