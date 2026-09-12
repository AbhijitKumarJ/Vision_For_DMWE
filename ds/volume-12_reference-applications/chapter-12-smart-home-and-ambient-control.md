# Chapter 12: Smart Home & Ambient Control

**Volume XII — Reference Applications · Working Draft v0.1**

## 12.1 Ambient Aura

**Problem:** Controlling lights, temperature, or scenes while hands are full or in another room.

- **Capabilities:** `Semantic Gesture`, `Voice`, `Environmental Scan`.
- **Grammar:** `Point` + `Hold` at light → Select & Dim; `Double_Nod` → Scene change.
- **Context:** Detects "Evening at Home" or "Cooking" → prioritizes discreet head gestures or voice.
- **Fusion:** Headband IMU + Hearables + optional Necklace camera for room scanning.
- **MeshOS:** Routes commands to the nearest IoT IBN.
- **Experience:** Natural, glance-free control of the environment.

## 12.2 Spatial Timer

**Problem:** Managing multiple timers while cooking or building.

- **Capabilities:** `Precision Pointer`, `Scalar`, `Spatial Anchor`.
- **Grammar:** `Point` at pot + "10 minutes" (voice) → anchored timer.
- **Context:** Kitchen activity → haptic + spatial audio alerts when timers expire.
- **Experience:** Timers exist in physical space; the system whispers "Pasta is ready" with a wrist pulse.

## 12.3 Smart Home Requirements

- Routing to IoT uses Intermediary Bridge Nodes (Volume I, Ch 8).
- Matter/Thread integration follows Volume VIII, Ch 15.
- Environmental control respects consent (Volume VII, Ch 15).

## 12.4 Common Patterns

- Spatial anchors bind commands to objects.
- Voice + gesture combine multimodally (Volume VI, Ch 7).
- Home context gates behaviors.

## 12.5 Conformance

These applications demonstrate conformant smart-home patterns: spatial control and multimodal input.
