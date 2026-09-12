# Chapter 3: Cross-Cutting Patterns

**Volume XII — Reference Applications · Working Draft v0.1**

## 3.1 Purpose

Patterns shared by all reference applications.

## 3.2 Zero Hardware Coupling

- Developers write against capabilities and intents.
- Applications never address hardware directly.
- The same application runs on any valid mesh.

## 3.3 Graceful Degradation

- Removing a module → the system falls back.
- Capability Registry provides alternatives (Volume V, Ch 2).
- Example: Ring gone → eye tracking substitutes for pointing.

## 3.4 Dynamic Fusion

- MeshOS handles dynamic fusion of inputs.
- Multiple modules combine into a single capability.
- Fusion is transparent to the application.

## 3.5 Context-Appropriate Interaction

- The Context Engine ensures interactions are appropriate.
- Safety, privacy, and ergonomics gate behavior.
- Inappropriate interactions are suppressed or adapted.

## 3.6 Digital Twin Continuity

- The Human Digital Twin maintains continuous user state (Volume VII, Ch 4).
- Applications read twin views (Volume IX, Ch 7).
- Twin state persists across sessions and devices.

## 3.7 Privacy & Trust

- Sensitive actions stay in the Private trust domain.
- Payment, biometrics, and health data are gated.
- Consent is granular and revocable.

## 3.8 Personalization

- The Digital Twin learns preferences over time (Volume VII, Ch 13).
- Learned settings are proposed, not silently applied.
- Users can view and reset preferences.

## 3.9 Multi-User Meshes

- Collaborative apps (Holo-Forge, Lucid Construct) support multi-user meshes.
- Shared spaces follow Volume VII, Ch 14.
- Ownership and permissions govern modification.

## 3.10 Accessibility by Default

- Alternative modalities are always available (Volume VI, Ch 14).
- Apps work eyes-free or hands-free where relevant.
- Accessibility is verified in certification (Volume X, Ch 6).

## 3.11 Conformance

A conformant reference application MUST implement the applicable cross-cutting patterns.
