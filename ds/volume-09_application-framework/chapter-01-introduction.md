# Chapter 1: Introduction to the Application Framework

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 1.1 Purpose

This volume defines the architecture, runtime model, lifecycle, APIs, execution environment, packaging, deployment, security, and interoperability requirements for applications running on the Distributed Modular Wearable Ecosystem (DMWE).

Applications are written against platform abstractions — Capabilities, Interactions, Context, and MeshOS services — rather than specific hardware devices. This enables applications to execute seamlessly across dynamic collections of wearable modules.

## 1.2 Design Goals

- Hardware-independent.
- Distributed execution.
- Stable APIs.
- Abstraction of capabilities and context.
- AI-native applications.
- Offline operation.
- Scale from a single wearable to large meshes.
- Enforced security and privacy.
- Extensibility and versioning.

## 1.3 Application Philosophy

- **Human-centric:** applications serve human goals, not device features.
- **Capability-first:** applications request what, not who.
- **Distributed:** execution may span multiple modules.
- **Mesh Applications:** an application that executes across multiple modules simultaneously.

## 1.4 Differences from Traditional Mobile Apps

| Aspect | Traditional | DMWE |
|--------|-------------|------|
| Hardware | Fixed device | Dynamic mesh |
| I/O | Screen + touch | Multimodal |
| Execution | Single process | Distributed |
| Context | App-defined | Platform-provided |
| AI | Library choice | Standardized service |

## 1.5 Intent-Oriented Programming (IOP)

IOP is the defining programming paradigm of DMWE applications. Instead of addressing devices, objects, or services, applications express **what they want to accomplish**:

- "Obtain a precise pointing capability."
- "Present information to the user."
- "Capture spoken input."
- "Summarize the current meeting."
- "Authenticate the user."

The framework, together with MeshOS, resolves these requests by selecting appropriate capabilities, interaction methods, AI services, and hardware resources.

## 1.6 IOP & the Platform Graphs

IOP sits above the platform's unifying graphs:

- **Capability Graph** (Volume V).
- **Interaction Graph** (Volume VI).
- **Context Graph** (Volume VII).
- **Cognitive Graph** (Volume VII).
- **Protocol Graph** (Volume VIII).

Applications express user goals; the platform manages device selection, execution placement, adaptation, and optimization.

## 1.7 Overall Architecture

```text
Applications
        │
Application Framework APIs
        │
Application Runtime
        │
MeshOS Services
        │
Capability Framework
        │
Interaction Framework
        │
Context & Cognitive Framework
        │
Distributed Communication Protocols
        │
Hardware Modules
```

Applications interact only with the framework and never directly with hardware.

## 1.8 Conformance

A conformant application MUST target framework abstractions, support intent-oriented development, and never access hardware directly.
