# Chapter 4: Module Descriptor

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

Every module publishes a structured **Module Descriptor** during discovery. It is the primary contract between hardware and the Mesh OS.

## 4.1 Descriptor Purpose

The descriptor enables the Mesh OS to:

- Identify and authenticate the module.
- Understand its capabilities and resources.
- Determine placement, role, and trust.
- Plan scheduling and power management.

## 4.2 Required Fields

The Module Descriptor MUST include:

| Field | Description |
|-------|-------------|
| Module ID | Globally unique identifier |
| Manufacturer | Vendor ID |
| Product family | Model/product line |
| Firmware version | Current firmware |
| Hardware revision | Board revision |
| Serial number | Per-unit identity |
| Supported capabilities | Capability IDs + versions |
| Resource availability | CPU, battery, sensors, output, storage |
| Battery state | Charge level, health |
| Trust level | Claimed trust classification |
| Security features | Secure element, crypto, biometrics |
| Communication methods | Transports + capabilities |
| Spatial location | Default position / spatial identity |
| Health status | Current operational health |

## 4.3 Descriptor Encoding

- **Canonical form:** a versioned schema (binary for mesh traffic; JSON for debug/profile). Serialization framework: Volume VIII, Chapter 6.
- **Schema evolution:** descriptors MUST be forward/backward compatible via version negotiation (Volume VIII, Chapter 7).

## 4.4 Example Descriptor (Illustrative)

```json
{
  "schemaVersion": "1.0",
  "moduleId": "DMWE-xxxx-0001",
  "manufacturer": "ExampleCorp",
  "productFamily": "SmartRing",
  "firmware": "2.1.0",
  "hwRevision": "B",
  "serial": "SN-…",
  "capabilities": [
    { "id": "pointer", "version": "2.0" },
    { "id": "selection", "version": "1.0" },
    { "id": "authentication", "version": "1.0" }
  ],
  "resources": {
    "cpu": { "mips": 120 },
    "battery": { "level": 0.82, "health": "good" },
    "sensors": ["imu", "touch"]
  },
  "trustLevel": "personal",
  "security": { "secureElement": true, "crypto": ["aes-256"] },
  "comms": ["ble", "uwb"],
  "spatial": { "defaultPosition": "left_index" },
  "health": { "status": "ok" }
}
```

## 4.5 Descriptor Exchange Flow

During discovery (Volume VIII, Chapter 3):

1. Module advertises presence (ID via 1-Wire/ID pin or radio).
2. Mesh requests the descriptor.
3. Descriptor is transmitted and validated.
4. Capabilities and resources registered.
5. Module enters Ready state.

## 4.6 Trust & Integrity

- The descriptor MUST be signed or MAC-protected so it cannot be spoofed.
- Claims (capabilities, trust level) MUST be verified against the secure element where applicable.
- A module MAY NOT claim capabilities it cannot actually provide.

## 4.7 Conformance

A conformant module MUST:

1. Provide a complete, signed Module Descriptor.
2. Keep the descriptor current (health, battery, capabilities updated).
3. Notify the mesh of descriptor changes (Volume VIII, CEP).
