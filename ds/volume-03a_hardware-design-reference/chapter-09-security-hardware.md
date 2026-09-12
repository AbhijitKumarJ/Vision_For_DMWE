# Chapter 9: Security Hardware

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 9.1 Secure Elements

- Use dedicated secure elements or MCU security modules where feasible.
- Store keys, certificates, and biometric references in protected storage.
- Verify tamper resistance appropriate to the module's trust role (Volume IV, Ch 14).

## 9.2 TPM

- Provide hardware root of trust for attestation.
- Support sealed state for sensitive data.
- TPM useful for compute hubs and gateways.

## 9.3 Hardware Cryptography

- Use hardware crypto accelerators (AES, ECC, SHA).
- Avoid software crypto for keys; use secure peripherals.
- Ensure constant-time implementations.

## 9.4 Biometric Storage

- Store biometric templates in secure elements, never in application memory.
- Match against the template in the secure environment.
- Comply with privacy rules (Volume III, Ch 7; Volume X).

## 9.5 Secure Boot

- Implement verified boot chain (Volume III, Ch 12).
- Chain of trust: immutable boot ROM → verified bootloader → verified runtime.
- Support rollback protection.

## 9.6 Firmware Authentication

- Sign all firmware images.
- Verify before execution or update.
- Enforce version/downgrade policy.

## 9.7 Anti-Tamper Features

- Detect enclosure opening (mesh/mechanical).
- React: wipe secrets, alert mesh.
- Match tamper response to threat model.

## 9.8 Random Number Generation

- Use true RNG (TRNG) hardware for keys/nonces.
- Post-process with approved DRBG.
- Never use predictable seeds.

## 9.9 Debug Interface Protection

- Disable/authenticate SWD/JTAG in production (Volume III, Ch 12).
- Fuse-off debug access after programming.
- Keep test points from exposing key material.

## 9.10 Lifecycle Key Management

- Define key provisioning at manufacture.
- Support secure key rotation (Volume IV, Ch 14).
- Define revocation at retirement (Volume III, Ch 11).

## 9.11 Threat Models & Mitigations

| Threat | Mitigation |
|--------|------------|
| Key extraction | Secure element, anti-tamper, debug lockdown |
| Firmware attack | Secure boot, signed updates |
| Side channel | Constant-time crypto, noise |
| Physical probing | Mesh sensing, key erasure |
| Social/UX spoofing | Strong mutual auth (Volume IV, Ch 14) |

## 9.12 Summary

Security hardware is the physical root of the trust domains that define the ecosystem's privacy model.
