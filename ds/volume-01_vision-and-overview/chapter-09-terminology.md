# Chapter 9: Terminology (Normative)

This chapter defines the core terms used throughout the specification. These definitions become **normative references** for all later volumes. A full glossary is maintained in Volume I as it matures; additions and revisions require governance approval (Volume X).

## 9.1 Core Terms

- **Module** — The smallest independently functioning hardware participant in the ecosystem (e.g., a ring, a necklace, a bead). Every module is treated as a distributed computing node regardless of physical size.

- **Capability** — An abstract function exposed to the system by one or more modules or services (e.g., Pointer, Silent Dictation, Projection, Authentication). Applications depend on capabilities, never on specific hardware.

- **Intent** — A semantic representation of what the user is trying to do, independent of the physical gesture that produced it.

- **Intent Packet** — A structured message carrying semantic intent (type, confidence, origin, timestamp) instead of raw sensor data.

- **Interaction** — A complete human-system exchange expressed as an Interaction Object (Volume VI).

- **Interaction Object** — A standardized data structure representing an interaction: intent, context, origin, target, confidence, priority, security level, and completion state.

- **Mesh / Personal Interaction Mesh** — A dynamic collection of cooperating modules that functions as a single logical interaction system.

- **MeshOS (Mesh Operating System)** — The distributed operating system that manages resources, capabilities, scheduling, trust, and communication across mesh nodes (Volume IV).

- **Intermediary Bridge Node (IBN)** — An ambient device (phone, laptop, hub, vehicle, POS) that bridges the personal mesh to local IoT, proprietary ecosystems, or the cloud.

## 9.2 Structural Terms

- **Node** — Any active participant in the mesh, whether wearable or ambient.
- **Provider** — A module or service that exposes one or more capabilities.
- **Consumer** — An application or subsystem that requests and uses capabilities.
- **Role** — A digital role a module advertises (Compute Node, Vision Node, Power Node, Gateway Node, etc.).
- **Session** — A scoped period of communication between mesh members.
- **Workspace** — A persistent spatial or logical context shared by one or more users.

## 9.3 Trust & Governance Terms

- **Trust Domain / Trust Level** — A classification (Private, Personal, Family, Shared, Enterprise, Public, Temporary) governing what data may be shared and with whom.
- **Authority** — An entity with rights to certify, register, or administer parts of the ecosystem.
- **Digital Twin** — A privacy-protected, continuously evolving representation of the user's state (physical, interaction, cognitive, resource).

## 9.4 Resource Terms

- **Resource** — A pooled asset across the mesh: CPU, GPU/NPU, memory, storage, battery, sensors, displays, projectors, network.
- **Service** — A concrete implementation of one or more capabilities with a defined lifecycle and interface (Volume V).

## 9.5 Spatial & Semantic Terms

- **Spatial Identity** — A module's awareness of its placement relative to the body, other modules, and the room (body space, device space, world space, workspace space).
- **Semantic Event** — A message that references higher-level entities (capabilities, interactions, context, trust) rather than opaque device-specific commands.
- **Capability Fusion** — The composition of multiple capabilities into a higher-level capability (Ring + Eye Tracking → Precision Pointer).
- **Context** — The aggregated state of user, activity, location, environment, application, and privacy that gives meaning to an intent.

## 9.6 Relationship Notes

- **Capability vs Service**: a *capability* is the abstract contract; a *service* is its concrete implementation.
- **Intent vs Interaction**: an *intent* is the meaning; an *interaction* is the full exchange (intent + context + target + feedback) as an Interaction Object.
- **Mesh vs Network**: the *mesh* is logical (the cooperating set of modules); the *network* is physical (the transports connecting them).
