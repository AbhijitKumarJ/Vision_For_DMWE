# Chapter 1: Introduction to Capabilities

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 1.1 The Problem with Device-Centric Programming

Conventional platforms force applications to program against devices:

```
Ring API
Watch API
Camera API
Glasses API
```

This couples software to specific hardware, vendors, and form factors. When hardware changes, applications break.

## 1.2 The Capability-First Solution

DMWE inverts this: applications program against **capabilities**:

```
Pointer
Select
Project
Authenticate
Track
Speak
Display
Locate
Compute
```

This mirrors how cloud applications request resources (compute, storage) instead of specific servers.

## 1.3 What Is a Capability?

A **capability** is an abstract function that can be provided by one or more hardware modules or software services.

Examples:

- Pointer
- Text Input
- Voice Recognition
- Projection
- Authentication
- Spatial Mapping
- Object Recognition
- Gesture Recognition
- Haptic Feedback
- Navigation

## 1.4 Stability Through Abstraction

Unlike devices, **capabilities remain stable even as hardware changes**:

- A Ring Pointer and an Eye-Tracked Pointer both provide the same `Pointer` capability.
- Replacing hardware does not break applications.
- Adding new hardware only adds providers, not new APIs.

## 1.5 The Capability Contract

A capability defines:

1. **Identity** — a unique, versioned ID.
2. **Interface** — the operations it supports.
3. **Metadata** — quality, trust, cost (Chapter 4).
4. **Lifecycle** — states and transitions (Chapter 5).
5. **Dependencies** — what it requires (Chapter 8).

## 1.6 Who Consumes Capabilities

- **Applications** request capabilities by name and quality.
- **MeshOS** manages discovery, negotiation, and execution.
- **The Capability SDK** gives developers a stable API.

## 1.7 The Capability-First Philosophy

1. Applications never communicate with hardware directly.
2. Everything happens through capabilities.
3. Capabilities are the primary contract between hardware, MeshOS, and applications.
4. Capabilities are first-class OS objects (Volume IV, Chapter 6).

## 1.8 Summary

Capabilities decouple software from hardware, giving the ecosystem stability, portability, and extensibility.
