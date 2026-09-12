# Chapter 3: System Layers

**Volume II — System Architecture · Working Draft v0.1**

This chapter formally defines every architectural layer. Each layer description covers purpose, responsibilities, inputs, outputs, dependencies, interfaces, failure handling, and security considerations.

## 3.1 Physical Modules

- **Purpose:** Provide sensing, compute, output, power, and communication resources.
- **Responsibilities:** Capture raw signals, execute local processing, render output, maintain connectivity.
- **Inputs:** Power, configuration, commands from drivers.
- **Outputs:** Sensor data, health telemetry, actuation results.
- **Dependencies:** None (base layer).
- **Interfaces:** Electrical/physical connector (Volume III), local firmware runtime.
- **Failure:** Module unavailability triggers capability fallback (Chapter 14).
- **Security:** Secure boot, module identity, secure element (Volume III).

## 3.2 Hardware Drivers

- **Purpose:** Abstract vendor hardware into uniform interfaces for the Mesh OS.
- **Responsibilities:** Initialize hardware, expose standard sensor/actuator APIs, report health.
- **Inputs:** Raw device access.
- **Outputs:** Normalized sensor streams and control interfaces.
- **Dependencies:** Physical Modules.
- **Interfaces:** Driver API to Mesh OS (kernel-level, not application-facing).
- **Failure:** Driver crash handled by node runtime; capability re-registration on restart.
- **Security:** Drivers run sandboxed; access mediated by the Security Manager.

## 3.3 Mesh Operating System

- **Purpose:** Turn many devices into one coherent computing environment.
- **Responsibilities:** Module discovery, scheduling, synchronization, resource allocation, capability registry, power management, health monitoring, communication, security enforcement, runtime services.
- **Inputs:** Driver data, application requests, context updates.
- **Outputs:** Scheduled tasks, capability state, system telemetry.
- **Dependencies:** Hardware Drivers.
- **Interfaces:** Internal APIs to Capability Manager, Resource Manager, Intent Engine, etc. (Volume IV).
- **Failure:** Node loss handled via mesh formation and fault tolerance (Chapter 14).
- **Security:** Enforces identity, authentication, permissions across all nodes.

## 3.4 Capability Manager

- **Purpose:** Maintain the Capability Registry and expose capabilities to upper layers.
- **Responsibilities:** Registration, discovery, negotiation, composition (fusion), versioning, fallback.
- **Inputs:** Module capability advertisements; application capability requests.
- **Outputs:** Capability grants, quality-of-capability reports, fusion results.
- **Dependencies:** Mesh OS.
- **Interfaces:** Capability API (Volume V).
- **Failure:** Missing capability triggers fallback or graceful app degradation.
- **Security:** Capability access controlled by permissions and trust domains.

## 3.5 Intent Engine

- **Purpose:** Transform raw sensor data into semantic intents.
- **Responsibilities:** Filtering, sensor fusion, recognition, intent classification, confidence estimation, correction.
- **Inputs:** Normalized sensor streams; context.
- **Outputs:** Intent Packets (type, confidence, origin, timestamp).
- **Dependencies:** Mesh OS, Capability Manager, Context Engine.
- **Interfaces:** Intent API (Volume VI).
- **Failure:** Low-confidence intents are withheld or flagged for confirmation.
- **Security:** Raw data used only for recognition; intent is what is shared upward.

## 3.6 Context Engine

- **Purpose:** Provide the semantic meaning around intents.
- **Responsibilities:** Context collection, fusion, persistence, distribution.
- **Inputs:** Activity, location, environment, application state, user state, calendar, IoT.
- **Outputs:** Context snapshots and change events.
- **Dependencies:** Mesh OS, Capability Manager.
- **Interfaces:** Context API (Volume VII).
- **Failure:** Stale or missing context degrades interpretation but MUST NOT crash interaction.
- **Security:** Context sharing limited by privacy policies and trust domains.

## 3.7 Interaction Runtime

- **Purpose:** Act as middleware between applications and the lower system.
- **Responsibilities:** Intent subscriptions, permission checks, session management, interaction routing, feedback generation, state synchronization, application lifecycle.
- **Inputs:** Intents, context, application subscriptions.
- **Outputs:** Interaction Objects delivered to applications; feedback commands to output capabilities.
- **Dependencies:** Intent Engine, Context Engine, Capability Manager.
- **Interfaces:** Interaction API (Volume VI), Feedback API.
- **Failure:** Subscription replays buffered intents after reconnect.
- **Security:** Enforces per-application permission and policy checks on every delivery.

## 3.8 Interaction SDK

- **Purpose:** Developer-facing surface for building applications.
- **Responsibilities:** Provide `requestCapability`, `subscribeIntent`, `renderOutput`, `requestContext`, `allocateResource`, `discoverModules`.
- **Inputs:** Application code.
- **Outputs:** Framework calls into the Interaction Runtime.
- **Dependencies:** Interaction Runtime.
- **Interfaces:** Public SDK APIs (Volume IX).
- **Failure:** SDK surfaces platform errors in a normalized form.
- **Security:** SDK enforces capability permissions and privacy views.

## 3.9 Applications

- **Purpose:** Deliver user value using platform abstractions.
- **Responsibilities:** Declare required capabilities, subscribe to intents, render adaptive output, respond to context.
- **Inputs:** Interaction Objects, context views, capability grants.
- **Outputs:** User-facing behavior; capability requests; feedback.
- **Dependencies:** Interaction SDK.
- **Interfaces:** App manifest (Volume IX).
- **Failure:** Apps MUST handle capability changes gracefully (e.g., pointer provider switched).
- **Security:** Apps run sandboxed with declared, revocable permissions.

## 3.10 Layer Interaction Rules

- Each layer MAY only depend on the layer directly below it (plus shared services via service interfaces).
- Cross-layer bypass (e.g., app talking directly to a driver) is PROHIBITED.
- Sequence diagrams in Chapter 15 illustrate typical data flows.

## 3.11 Summary Table

| Layer | Primary Role | Key Interface |
|-------|--------------|---------------|
| Applications | User value | SDK APIs |
| Interaction SDK | Developer surface | requestCapability / subscribeIntent |
| Interaction Runtime | Middleware | Interaction API |
| Intent Engine | Semantics from signals | Intent API |
| Context Engine | Meaning & situation | Context API |
| Capability Manager | Hardware abstraction | Capability API |
| Resource Manager | Pooled resources | Resource API |
| Mesh OS | Distributed kernel | Kernel internal APIs |
| Device Drivers | Hardware uniformity | Driver API |
| Physical Modules | Sensing/compute/output | Connector spec |
