# Chapter 15: Interaction Profiles

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Users define reusable profiles that shape interaction behavior.

## 15.1 Profile Examples

- Office Mode
- Gaming Mode
- Industrial Mode
- Medical Mode
- Presentation Mode
- Driving Mode
- Outdoor Mode
- Workout Mode
- Sleep Mode

## 15.2 What Profiles Influence

- Recognition thresholds (sensitivity).
- Feedback channel selection (Chapter 10).
- Context interpretation weighting (Chapter 9).
- Modality weighting (Chapter 7).
- Default qualifiers.
- Permission behaviors.

## 15.3 Profile Model

A profile defines:

- **Sensitivity** — recognition thresholds per modality.
- **Feedback** — channel preferences per level.
- **Context maps** — interpretation mappings.
- **Modalities** — preferred/disabled modalities.
- **Shortcuts** — custom interaction shortcuts.
- **Accessibility** — assistive settings (Chapter 14).

## 15.4 Switching

- Profiles switch automatically by context or manually.
- Switching MUST be immediate and non-destructive.
- In-flight interactions complete under the originating profile.

## 15.5 Profile Example

**Presentation Mode**

- Sensitivity: high for pointer, low for ambient gestures.
- Feedback: silent haptics + visual.
- Context: focuses on projector/scene.
- Modalities: pointer + voice primary.

**Driving Mode**

- Sensitivity: voice + head-gesture priority.
- Feedback: audio + haptics.
- Context: navigation focus.
- Modalities: touch disabled for safety.

## 15.6 User Control

- Users MAY edit, create, and share profiles.
- Profiles are privacy-protected (on-device by default).
- Cloud sync requires consent.

## 15.7 Conformance

A conformant implementation MUST support profile definition, automatic/manual switching, and per-profile settings.
