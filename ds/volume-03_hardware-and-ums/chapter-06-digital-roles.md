# Chapter 6: Digital Roles

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

Every module advertises one or more **roles** describing its contribution to the ecosystem. Roles guide scheduling and resource allocation without constraining hardware design.

## 6.1 Defined Roles

| Role | Meaning |
|------|---------|
| Compute Node | Provides CPU/GPU/NPU compute |
| Vision Node | Provides camera/visual sensing |
| Audio Node | Provides microphones/speakers |
| Display Node | Provides visual output |
| Storage Node | Provides persistent storage |
| Power Node | Provides battery/energy |
| Gateway Node | Bridges to external networks/IBNs |
| Localization Node | Provides UWB/spatial positioning |
| AI Inference Node | Provides ML inference |
| Authentication Node | Provides secure identity/verification |
| Environmental Node | Provides environmental sensing |
| Safety Node | Provides safety-critical monitoring |

## 6.2 Multiple Roles per Module

A module MAY expose multiple roles simultaneously:

- A necklace may be Compute Node + Power Node + Display Node.
- A headband may be Vision Node + Audio Node + Localization Node.

Roles are **advisory metadata** — the capability contract remains primary. A role without a backing capability has no effect.

## 6.3 Role and Scheduling

The scheduler (Volume II, Chapter 8) uses roles to:

- Place AI inference on AI Inference Nodes.
- Prefer Gateway Nodes for external traffic.
- Balance power draw across Power Nodes.
- Select localization providers for spatial tasks.

## 6.4 Role Discovery

- Roles are published in the Module Descriptor (Chapter 4).
- Roles update dynamically as modules change.
- The Capability Registry indexes by role for discovery queries.

## 6.5 Role vs Capability

| Aspect | Role | Capability |
|--------|------|-----------|
| Question | "What is this module?" | "What can it do?" |
| Example | Vision Node | Object Recognition |
| Used by | Scheduler, resource planning | Applications |
| Granularity | Coarse | Fine |
