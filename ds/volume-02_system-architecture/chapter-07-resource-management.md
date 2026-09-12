# Chapter 7: Resource Management

**Volume II — System Architecture · Working Draft v0.1**

This chapter defines how hardware resources are pooled and allocated across the mesh. Full specification: Volume IV, Chapter 7.

## 7.1 The Pooling Model

Instead of treating wearables independently, all resources become a shared pool managed by the Mesh Resource Manager — like cloud computing or Kubernetes, not Bluetooth peripherals.

```
Ring:      CPU 5%, Battery 2%, IMU, Touch
Necklace:  Battery 40%, Camera, Projector, Storage
Headband:  Depth, Eye Tracking, Microphones
```

MeshOS pools everything.

## 7.2 Resource Types

| Category | Resources |
|----------|-----------|
| Compute | CPU, GPU, NPU, DSP, Memory |
| Energy | Battery, harvesting, power budget |
| Storage | Local, distributed, persistent |
| Sensing | Cameras, IMUs, microphones, depth, touch |
| Output | Displays, projectors, haptics, audio |
| Network | BLE, Wi-Fi, UWB, cellular bandwidth |

## 7.3 Resource Discovery

- Every module reports its available resources in its Module Descriptor.
- Resources are refreshed dynamically (battery drains, sensors go offline).
- The Resource Graph (Volume VII) maintains a live picture of resource availability.

## 7.4 Resource Allocation

Allocation considers:

- **Priority** — interaction-critical tasks over background sync.
- **Ownership** — who reserved the resource.
- **Reservation** — guaranteed access for critical capabilities.
- **Quotas** — limits per application/tenant.
- **Load balancing** — avoid hotspot modules.
- **Dynamic reallocation** — migrate on demand.

## 7.5 Virtualization

Resources MAY be virtualized:

- Compute on phone exposed as a virtual CPU to the mesh.
- A display elsewhere exposed as a virtual output.
- Applications cannot distinguish local vs remote resources.

## 7.6 Energy as a Shared Resource

Power management (Volume IV, Chapter 13) treats energy as a first-class pooled resource:

- **Battery monitoring** across all modules.
- **Power budgeting** — the mesh schedules tasks within an energy budget.
- **Task migration** — move work away from low-battery nodes.
- **Sleep scheduling** — coordinate low-power states.
- **Charging coordination** — charge the most useful modules first.
- **Power sharing** — VBUS can share power across the chassis (Volume III).

## 7.7 Failure Recovery

- A resource disappearing (battery dead, node lost) triggers reallocation.
- Reserved resources are released and re-allocated gracefully.
- Predictions (Volume VII) allow proactive reallocation before failure.

## 7.8 Conformance Summary

A conformant implementation MUST:

1. Pool resources across all nodes (§7.1).
2. Support discovery and dynamic refresh (§7.3).
3. Implement priority/ownership/reservation allocation (§7.4).
4. Manage energy as a shared budget (§7.6).
5. Recover from resource loss without terminating applications (§7.7).
