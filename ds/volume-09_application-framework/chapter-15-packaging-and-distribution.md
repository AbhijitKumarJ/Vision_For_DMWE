# Chapter 15: Packaging & Distribution

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 15.1 Purpose

Defines application packages and their distribution. The package format supports modular deployment across the mesh.

## 15.2 Packaging Topics

- Application packages.
- Dependencies.
- Signing.
- Metadata.
- Compatibility.
- Updates.
- Rollback.
- Version management.

## 15.3 Application Packages

- Packages contain components, resources, and metadata.
- Packages target framework abstractions (Chapter 1).
- Packages are hardware-independent.

## 15.4 Dependencies

- Packages declare dependencies and versions.
- Dependencies resolve before install.
- Unresolvable dependencies block install.

## 15.5 Signing

- Packages MUST be cryptographically signed.
- Signatures verify before install (Volume VIII, Ch 13).
- Unsigned packages are rejected.

## 15.6 Metadata

- Metadata includes: identity, version, permissions, profile.
- Metadata is machine-readable (Volume VIII, Ch 6).
- Metadata drives compatibility checks.

## 15.7 Compatibility

- Packages declare compatible framework versions.
- Compatibility checking MUST be enforced (Volume VIII, Ch 7).
- Incompatible packages are rejected.

## 15.8 Updates

- Updates follow the Firmware Update Protocol (Volume VIII, Ch 17).
- Updates are staged and validated.
- Update state is reported.

## 15.9 Rollback

- Failed updates roll back.
- Previous version is retained until stable.
- Rollback is automatic on boot failure.

## 15.10 Version Management

- Semantic versioning is required.
- Major/minor/patch semantics enforced.
- Version history is retained.

## 15.11 Conformance

A conformant package MUST be signed, declare dependencies/metadata, pass compatibility checks, and support updates and rollback.
