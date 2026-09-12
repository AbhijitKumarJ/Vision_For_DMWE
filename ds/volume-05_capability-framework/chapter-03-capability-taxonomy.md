# Chapter 3: Capability Taxonomy

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

## 3.1 Standardized Categories

Capabilities are organized into standardized categories. Each category defines common interfaces and metadata.

### Interaction
Pointer, Selection, Scroll, Zoom, Manipulation, Rotation, Drawing, Annotation

### Input
Voice, Text, Touch, Gesture, Eye Tracking, EMG, EEG, Keyboard

### Output
Projection, Display, Audio, Speech, Haptics, Lighting

### Spatial
Localization, Mapping, Object Tracking, Body Tracking, Depth, SLAM

### Compute
CPU, GPU, AI, DSP, Memory, Storage

### Communication
BLE, Wi-Fi, UWB, NFC, Thread, Matter

### Security
Authentication, Authorization, Encryption, Identity, Trust

### Environmental
Temperature, Humidity, Air Quality, Pressure, Light, Noise

## 3.2 Category Purpose

Categories provide:

- **Naming:** capability IDs are namespaced by category.
- **Interfaces:** each category defines standard operations.
- **Metadata:** each category defines common quality metadata.
- **Discovery:** consumers search within categories.

## 3.3 Example: Interaction Category

| Capability | Operations | Metadata |
|-----------|------------|----------|
| Pointer | moveTo, scrollBy, click | latency, accuracy, modality |
| Selection | select, deselect | modality, confidence |
| Scroll | scrollBy, scrollTo | direction, momentum |
| Zoom | zoomBy, zoomTo | scale limits |
| Manipulation | grab, move, release | transform support |
| Rotation | rotateBy, rotateTo | axis support |
| Drawing | strokeStart, strokeMove, strokeEnd | pressure, tilt |
| Annotation | annotate, erase, select | markup types |

## 3.4 Example: Security Category

| Capability | Operations | Metadata |
|-----------|------------|----------|
| Authentication | authenticate, verify, enroll | method, strength |
| Authorization | grant, revoke, check | policy, scope |
| Encryption | encrypt, decrypt | algorithm, strength |
| Identity | proveIdentity, attest | method |
| Trust | attestTrust, classify | level |

## 3.5 Cross-Category Capabilities

- A capability belongs to one primary category.
- It MAY declare secondary category memberships for discovery.
- Composite capabilities (Chapter 8) inherit category tags of constituents.

## 3.6 Category Evolution

- New categories MAY be added via the Extension Framework (Chapter 19).
- Adding a category MUST NOT break existing categories.

## 3.7 Conformance

A conformant capability MUST belong to exactly one primary category and follow that category's interface/metadata templates.
