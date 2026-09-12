# Chapter 20: Update Framework

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

MeshOS supports **distributed updates** — the whole mesh upgrades as a coherent system.

## 20.1 Update Types

- **OTA updates** — runtime software updates.
- **Firmware updates** — module firmware (Volume III, Ch 12).
- **Rollback** — return to a known-good version.
- **Dependency management** — capability/service compatibility.
- **Version compatibility** — cross-node version coherence.
- **Partial updates** — subset of modules only.
- **Module replacement** — swap-in new modules.
- **Migration** — data/state migration across versions.

## 20.2 Update Lifecycle

```
Discover (new version available)
   ↓
Validate (signature, compatibility)
   ↓
Stage (download, verify)
   ↓
Coordinate (mesh-wide plan)
   ↓
Apply (A/B switching, staged)
   ↓
Verify (health check)
   ↓
Commit or Rollback
```

## 20.3 Signature & Verification

- All updates MUST be signed.
- Verification MUST cover integrity and origin.
- Unsigned/expired updates MUST be rejected.

## 20.4 Compatibility

- The framework MUST check:
  - Capability contracts unchanged.
  - Service API compatibility.
  - State format compatibility.
  - Mesh version coherence.
- Incompatible updates MUST NOT apply.

## 20.5 Mesh-Wide Coordination

- Updates coordinate across nodes to avoid split versions.
- Staged rollouts reduce risk (canary nodes first).
- The mesh MAY run mixed versions during transition.

## 20.6 Partial & Replacement Updates

- Modules may update independently when compatible.
- Replaced modules join as new nodes (Chapter 4).

## 20.7 Migration

- State MUST migrate across versions safely.
- Old state is backed up before migration.
- Migration failures trigger rollback.

## 20.8 Rollback

- If verification fails post-apply, the mesh MUST roll back.
- A/B (dual-bank) images enable instant rollback.
- Rollback preserves user data.

## 20.9 Conformance

A conformant Update Framework MUST:

1. Support OTA and firmware updates.
2. Verify signatures and compatibility.
3. Coordinate mesh-wide updates.
4. Migrate state safely.
5. Provide reliable rollback.
