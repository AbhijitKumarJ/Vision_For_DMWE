# Chapter 3: Module Discovery Protocol (MDP)

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 3.1 Purpose

Defines how modules discover one another and enter the mesh.

## 3.2 Lifecycle

```text
Advertisement
    ↓
Discovery
    ↓
Authentication
    ↓
Descriptor Exchange
    ↓
Capability Exchange
    ↓
Registration
    ↓
Ready
```

## 3.3 Discovery Scopes

| Scope | Range |
|-------|-------|
| Local | Same transport, immediate vicinity |
| Ambient | Nearby bridging nodes |
| Mesh | All trusted mesh members |
| Managed | Enterprise/cloud directory |

## 3.4 Broadcast vs Directed Discovery

- **Broadcast:** modules announce themselves to all listeners.
- **Directed:** a known module/coordinator probes specific targets.
- Discovery MAY combine both strategies.

## 3.5 Passive Discovery

- Modules listen for advertisements without probing.
- Lowest energy (Volume IV, Ch 13).
- Used by low-power modules and rings.

## 3.6 Active Discovery

- Modules actively query for candidates.
- Used when establishing a new mesh.
- Follows rate limits to avoid channel flooding.

## 3.7 Dynamic Updates

- Advertisements update on state change.
- Modules entering/leaving propagate to the mesh.
- Changes feed the Capability Registry (Chapter 7).

## 3.8 Mesh Formation Triggers

- First power-on of a coordinator.
- User-initiated pairing.
- Proximity of known trusted devices.
- Recovery after partition (Chapter 14).

## 3.9 Authentication During Discovery

- Discovery is NOT trust establishment.
- Authentication MUST occur before Registration (Chapter 13).
- Unauthenticated modules are visible but not trusted.

## 3.10 Conformance

A conformant MDP MUST implement the lifecycle, discovery scopes, and dynamic update requirements.
