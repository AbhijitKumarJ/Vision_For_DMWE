# Chapter 6: Module Descriptor Schema

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 6.1 Purpose

When a module physically connects to the mesh, it MUST broadcast its **Module Descriptor** (Volume III, Ch 4). This is the primary contract between hardware and MeshOS.

## 6.2 Wire Format (`dmwe_hardware.proto`)

```protobuf
syntax = "proto3";
package dmwe.hardware;

enum ModuleClass {
  CLASS_UNKNOWN = 0;
  CLASS_SENSOR = 1;
  CLASS_COMPUTE = 2;
  CLASS_OUTPUT = 3;
  CLASS_POWER = 4;
  CLASS_COMMUNICATION = 5;
  CLASS_STORAGE = 6;
}

enum DigitalRole {
  ROLE_UNKNOWN = 0;
  ROLE_VISION_NODE = 1;
  ROLE_AUTH_NODE = 2;
  ROLE_OUTPUT_NODE = 3;
  ROLE_COMPUTE_NODE = 4;
  ROLE_BRIDGE_NODE = 5;
}

message BatteryState {
  float level = 1;          // 0.0 to 1.0
  uint32 capacity_mah = 2;  // milliamp-hours
  float health = 3;         // 0.0 to 1.0
}

message ComputeCapacity {
  uint32 mips = 1;
  bool has_npu = 2;
  uint32 ram_mib = 3;
}

message SecurityProfile {
  bool has_secure_element = 1;
  TrustLevel trust_level = 2;
  repeated string crypto_algorithms = 3; // e.g. "aes-256-gcm"
}

enum TrustLevel {
  TRUST_UNKNOWN = 0;
  TRUST_PUBLIC = 1;
  TRUST_PERSONAL = 2;
  TRUST_PRIVATE = 3;
}

message SpatialPose {
  string default_placement = 1; // e.g. "LEFT_INDEX_FINGER"
  repeated float transform = 2; // 4x4 column-major, if known
}

message ModuleDescriptor {
  string module_id = 1;           // e.g. "DMWE-RNG-9942"
  string manufacturer = 2;
  string product_family = 3;
  string hardware_revision = 4;
  string firmware_version = 5;
  string schema_version = 6;

  repeated ModuleClass classes = 7;
  repeated DigitalRole roles = 8;

  BatteryState battery = 9;
  ComputeCapacity compute = 10;
  SecurityProfile security = 11;
  SpatialPose spatial_identity = 12;
}
```

## 6.3 TypeScript SDK View

```typescript
/** Volume III, Ch 4: Module Descriptor */
interface ModuleDescriptor {
  moduleId: string;               // e.g. "DMWE-RNG-9942"
  manufacturer: string;
  productFamily: string;
  hardwareRevision: string;
  firmwareVersion: string;

  classes: ModuleClass[];         // SENSOR, COMPUTE, OUTPUT, POWER, ...
  roles: DigitalRole[];           // VISION_NODE, AUTH_NODE, ...

  resources: {
    battery: BatteryState;        // { level: 0.95, capacityMAh: 120 }
    compute: ComputeCapacity;     // { mips: 150, hasNpu: false }
  };

  security: SecurityProfile;      // { hasSecureElement: true, trustLevel: "PERSONAL" }
  spatialIdentity: SpatialPose;   // { defaultPlacement: "LEFT_INDEX_FINGER" }
}
```

## 6.4 Descriptor Exchange

1. Module advertises presence (Volume VIII, Ch 3).
2. Mesh requests the descriptor.
3. Descriptor is transmitted in a `TYPE_DESCRIPTOR` envelope.
4. Mesh validates, authenticates, and registers capabilities (Volume III, Ch 4).

## 6.5 Trust & Integrity

- The descriptor MUST be signed or MAC-protected so it cannot be spoofed.
- Claims MUST be verifiable against the secure element where applicable.
- A module MUST NOT claim capabilities it cannot provide.

## 6.6 Conformance

A conformant module MUST publish a complete, signed `ModuleDescriptor`, keep it current, and notify the mesh of changes (Volume VIII, Ch 7).
