# Chapter 9: Service Model

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Capabilities are **implemented as services**. The Service Model defines how implementations are exposed, versioned, and orchestrated.

## 9.1 Service Lifecycle

```
Register
   ↓
Advertise
   ↓
Bind
   ↓
Execute
   ↓
Monitor
   ↓
Release
```

| State | Description |
|-------|-------------|
| Register | Service enters the registry |
| Advertise | Capabilities backed by the service published |
| Bind | Consumer bound to the service |
| Execute | Invocations processed |
| Monitor | Health/quality tracked |
| Release | Binding/resources released |

## 9.2 Service Interfaces

- A service exposes one or more capability interfaces (Chapter 10).
- Interface versions MUST match capability versions.
- Service endpoints are logical (routed by MeshOS).

## 9.3 Service Discovery

- Services are discovered via the Capability Registry.
- Consumers discover capabilities; MeshOS resolves to service endpoints.
- Direct service discovery is for platform developers (Volume IV, Ch 23).

## 9.4 Service Contracts

- A service contract defines: capabilities provided, QoS guarantees, data formats, failure semantics.
- Contracts MUST be machine-checkable where possible.

## 9.5 Versioning

- Services are versioned with their capabilities.
- Version negotiation is backward compatible (Volume VIII, Ch 7).
- Breaking changes require deprecation (Chapter 5).

## 9.6 Dependencies

- Services declare dependencies on other services/capabilities.
- Dependencies MUST be satisfied before binding.
- Dependency failures trigger fallback.

## 9.7 Isolation

- Services MUST run in sandboxes (Volume IV, Ch 14).
- Service failure MUST NOT affect other services.
- Resource limits MUST be enforced (Volume IV, Ch 7).

## 9.8 Health

- Services report health metrics (Volume IV, Ch 15).
- Health feeds QoC (Chapter 11) and scheduling.

## 9.9 Conformance

A conformant service MUST implement its capabilities' contracts, follow the lifecycle, enforce isolation, and report health.
