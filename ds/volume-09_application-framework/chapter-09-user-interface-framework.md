# Chapter 9: User Interface Framework

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 9.1 Purpose

Defines interaction surfaces independent of physical displays.

## 9.2 Supported Surfaces

- Projection.
- Smart glasses.
- External displays.
- Audio.
- Haptics.
- Ambient lighting.
- Voice-only interfaces.

## 9.3 Surface Abstraction

- Applications render to a logical surface.
- The framework maps to available output capabilities.
- Presentation adapts automatically.

## 9.4 Adaptive Presentation

- The framework encourages adaptive presentation based on available output capabilities.
- A notification renders as visual, audio, haptic, or light — per context.
- Adaptation follows Volume VII, Ch 10.

## 9.5 Declarative UI

- UI is declared in terms of information and actions.
- Layout is resolved by the framework.
- Applications never target a specific display.

## 9.6 Voice-Only Interfaces

- Supported without a screen.
- Conversational flows via Volume VI, Ch 11.
- Fallback paths are mandatory.

## 9.7 Haptics & Lighting

- Standard haptic patterns (Volume III, Ch 7).
- Ambient lighting semantics.
- Feedback integrates with Volume VI, Ch 9.

## 9.8 Consistency

- Interaction consistency is enforced (Volume X).
- UI components share the standard library.
- Accessibility is default (Volume VI, Ch 14).

## 9.9 Conformance

A conformant implementation MUST abstract surfaces, adapt presentation, and support voice-only flows.
