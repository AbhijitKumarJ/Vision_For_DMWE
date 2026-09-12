# Chapter 18: Reference Interaction Library

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Defines a standardized catalog of interactions.

## 18.1 Catalog

- Air Click
- Air Drag
- Air Rotate
- Pinch Select
- Hover Focus
- Voice Confirm
- Silent Accept
- Spatial Anchor
- Project Here
- Capture View
- AI Assist
- Quick Search
- Universal Back
- Universal Home

## 18.2 Entry Format

Each interaction includes:

- Semantic definition
- Supported physical expressions
- Required capabilities
- Context applicability
- Feedback recommendations
- Accessibility notes

## 18.3 Example: Air Click

| Field | Value |
|-------|-------|
| Semantic definition | Select/activate the pointed-at object |
| Physical expressions | Finger tap in air, ring button, EMG pinch, voice "click" |
| Required capabilities | Pointer (or substitute) |
| Context applicability | Any interactive surface |
| Feedback recommendations | Acknowledge: short haptic tick |
| Accessibility notes | Eye-dwell alternative |

## 18.4 Example: Spatial Anchor

| Field | Value |
|-------|-------|
| Semantic definition | Pin a virtual object to a physical location |
| Physical expressions | Point + confirm, voice "anchor here" |
| Required capabilities | Spatial mapping, localization |
| Context applicability | AR workspaces, rooms |
| Feedback recommendations | Completion: visual ring + haptic pulse |
| Accessibility notes | Voice-first workflow |

## 18.5 Example: Universal Back

| Field | Value |
|-------|-------|
| Semantic definition | Navigate to the previous screen/state |
| Physical expressions | Thumb press, swipe, voice "back" |
| Required capabilities | Any input |
| Context applicability | All applications |
| Feedback recommendations | Acknowledge: subtle audio |
| Accessibility notes | Consistent across apps |

## 18.6 Library Rules

- Standard entries MUST be recognized everywhere.
- Entries are versioned with the HIF.
- Extensions follow the Extension Framework (Volume V, Ch 19).

## 18.7 Conformance

A conformant implementation MUST support the standard library entries with defined semantics and behaviors.
