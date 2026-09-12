# Chapter 2: Application Architecture

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 2.1 Modular Components

Applications consist of modular components.

## 2.2 Typical Layers

```text
Presentation Layer
    ↓
Interaction Layer
    ↓
Application Logic
    ↓
Capability Requests
    ↓
Framework Services
    ↓
MeshOS
```

## 2.3 Presentation Layer

- Renders information via the UI Framework (Chapter 9).
- Chooses surfaces by available outputs.
- Adaptive to device context.

## 2.4 Interaction Layer

- Consumes semantic interactions (Chapter 6).
- Responds to intent, not raw sensor data.
- Feeds feedback to the user (Volume VI, Ch 9).

## 2.5 Application Logic

- Core business logic.
- Expressed via intents (IOP, Chapter 1).
- Hardware-agnostic.

## 2.6 Capability Requests

- Requests capabilities by type/quality (Chapter 5).
- Requests are resolved by the Capability Framework (Volume V).
- Quality requirements are declarative.

## 2.7 Framework Services

- Context, memory, personalization, AI (Volume VII).
- Accessed through stable APIs.
- Permission-mediated.

## 2.8 Loose Coupling

- Business logic decouples from hardware capabilities.
- Components communicate via events (Chapter 13).
- Components may migrate independently (Chapter 4).

## 2.9 Conformance

A conformant application MUST follow the layered architecture and interact with hardware only through framework services.
