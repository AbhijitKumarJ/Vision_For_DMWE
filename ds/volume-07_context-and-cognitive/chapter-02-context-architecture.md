# Chapter 2: Context Architecture

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

## 2.1 Layers of Contextual Understanding

Context is organized into layers, each contributing to the overall cognitive model.

### Sensor Context
Raw observations from hardware (motion, bio, audio, vision).

### Device Context
State of modules and services (battery, health, availability).

### User Context
Identity, posture, activity, preferences, abilities.

### Task Context
Current goals and workflow stage.

### Environmental Context
Location, lighting, temperature, nearby objects.

### Social Context
People, collaboration, presence.

### Organizational Context
Projects, teams, enterprise policies.

### Global Context
Weather, traffic, events, internet services.

## 2.2 Layer Hierarchy

- Lower layers (Sensor, Device) are high-frequency, local, precise.
- Upper layers (Social, Organizational, Global) are lower-frequency, distributed, approximate.
- Higher layers aggregate and interpret lower layers.

## 2.3 Layer Responsibilities

| Layer | Sources | Updates |
|-------|---------|---------|
| Sensor | Wearables | Continuous |
| Device | Modules | On change |
| User | Fusion + profiles | Continuous |
| Task | Apps, calendars | On change |
| Environmental | Ambient/IoT | Periodic |
| Social | Presence, collaboration | On change |
| Organizational | Enterprise systems | Policy-defined |
| Global | External APIs | Periodic |

## 2.4 Aggregation

- Each layer aggregates data from below.
- Aggregation adds confidence and provenance (Chapter 5).
- Cross-layer consistency MUST be maintained.

## 2.5 Access Rules

- Applications access context through authorized views (Chapter 16).
- Higher layers are more sensitive; access requires consent.
- Privacy rules apply at every layer (Chapter 15).

## 2.6 Conformance

A conformant implementation MUST model all context layers, aggregate with confidence, and enforce layer-appropriate access.
