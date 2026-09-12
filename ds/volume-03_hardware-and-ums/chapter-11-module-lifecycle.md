# Chapter 11: Module Lifecycle

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

This chapter defines the states a module passes through from manufacture to retirement, and the system-level lifecycle of the mesh.

## 11.1 Module States

```
Manufactured -> Certified -> Paired -> Provisioned -> Ready
  -> Active -> Idle/Sleep -> Suspended -> Removed -> Retired
```

| State | Description |
|-------|-------------|
| Manufactured | Hardware produced, identity seeded |
| Certified | Passed compliance (Chapter 15) |
| Paired | Bound to a user's ecosystem |
| Provisioned | Trust, keys, profiles configured |
| Ready | Discoverable, advertising capabilities |
| Active | Executing tasks |
| Idle/Sleep | Powered but inactive |
| Suspended | Temporarily unavailable (battery, thermal) |
| Removed | Unpaired / unbound |
| Retired | End-of-life, data wiped, recycled |

## 11.2 Manufacture-to-Certify

- Modules MUST be manufactured with a unique identity and key material (secure element).
- Certification validates conformance before pairing (Chapter 15).

## 11.3 Pairing & Provisioning

- Pairing uses Out-of-Band (OOB) binding (Volume VIII, Security).
- Trust domains and profiles are provisioned (Volume X).
- The module MUST be reset-able to factory state securely.

## 11.4 Mesh Lifecycle

At the system level (Volume II, Chapter 11):

- **Formation** — first module starts the mesh; others join.
- **Growth** — modules join, capabilities registered.
- **Stable operation** — normal operation.
- **Contraction** — modules leave (battery, removal).
- **Recovery** — mesh reconfigures after loss.
- **Dissolution** — last module shuts down.

Modules MUST handle any mesh-lifecycle transition gracefully.

## 11.5 Hot-Plug & Removal

- Modules MAY be removed/inserted while powered (hot-plug protection, Chapter 3).
- On removal, the mesh MUST gracefully migrate tasks and free resources.
- Modules MUST finalize or roll back in-flight transactions on removal.

## 11.6 Battery Depletion

- On low battery, the module transitions through Degraded → Suspended → Removed.
- Critical modules (safety, medical) MUST preserve shutdown energy.

## 11.7 Re-Pairing

- Modules MAY transfer between ecosystems.
- Transfer requires secure un-pairing and re-provisioning.
- Trust must not leak between ecosystems (Volume X).

## 11.8 End of Life

- Retired modules MUST have data securely erased.
- Recyclable materials per Volume X stewardship policy.
- Cloud accounts and keys MUST be revoked.

## 11.9 Conformance

A conformant module MUST:

1. Implement the full state model.
2. Support secure pairing, provisioning, un-pairing, and factory reset.
3. Gracefully handle hot-plug removal.
4. Manage battery depletion with safe shutdown.
5. Support secure end-of-life data erasure.
