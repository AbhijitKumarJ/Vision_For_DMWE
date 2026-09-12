# Chapter 5: Service-Oriented Architecture

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

## 5.1 Services

Every module exposes **services** — well-defined, discoverable units of function.

Example services:

- Pointer Service
- Gesture Service
- Projection Service
- Battery Service
- Localization Service
- Camera Service
- Storage Service
- Authentication Service
- AI Service

Services are the execution layer beneath capabilities (Chapter 6). A capability maps to one or more services.

## 5.2 Service Lifecycle

```
Registered
   ↓
Available
   ↓
Bound
   ↓
Invoked (running)
   ↓
Unbound
   ↓
Unavailable
   ↓
Removed
```

## 5.3 Service Registration

- Services MUST register with the node's Service Registry on startup.
- Registration includes: service ID, version, capabilities backed, resources required, endpoint.
- Registration is authenticated and versioned.

## 5.4 Discovery

- Applications and the Capability Manager discover services via the registry.
- Discovery queries filter by capability, role, quality, location.
- Discovery MUST return only services the requester is authorized to use.

## 5.5 Binding

- Binding associates a consumer with a service instance.
- Binding includes access rights and resource reservations.
- A consumer MAY bind multiple services; a service MAY serve multiple consumers within resource limits.

## 5.6 Invocation

- Invocation is remote by default (cross-node), local when co-located.
- All invocations MUST be authenticated and authorized.
- Invocation supports request/response and streaming (Chapter 11).

## 5.7 Dependencies

- Services declare dependencies on other services/capabilities.
- The kernel MUST resolve dependencies at bind time.
- A service MUST NOT be invoked if its dependencies are unsatisfied.

## 5.8 Versioning

- Services MUST be versioned.
- Consumers MUST declare the versions they accept.
- Version negotiation MUST be backward compatible (Volume VIII, Ch 7).

## 5.9 Service Quality

- Services MUST report quality metadata (latency, accuracy, availability).
- Quality feeds scheduler and capability decisions.

## 5.10 Conformance

A conformant service MUST:

1. Register with correct metadata.
2. Support discovery and binding.
3. Enforce authorization on all invocations.
4. Declare and satisfy dependencies.
5. Report quality and honor versioning.
