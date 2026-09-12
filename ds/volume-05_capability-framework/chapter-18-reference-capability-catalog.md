# Chapter 18: Reference Capability Catalog

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Defines the standard capability catalog (100+ capabilities). Each entry includes: purpose, interface, metadata, lifecycle, dependencies, and reference implementation.

## 18.1 Interaction

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| Pointer | Point on a surface | moveTo, scrollBy, click |
| Click | Discrete activation | press, release |
| Drag | Move objects | dragStart, dragMove, dragEnd |
| Rotate | Rotate objects | rotateBy, rotateTo |
| Select | Choose items | select, deselect |
| Scroll | Pan content | scrollBy, scrollTo |
| Zoom | Scale view | zoomBy, zoomTo |
| Manipulation | Direct object control | grab, move, release |
| Drawing | Freehand input | strokeStart, strokeMove, strokeEnd |
| Annotation | Mark up content | annotate, erase |
| Haptics | Tactile feedback | buzz, pattern, strength |

## 18.2 Input

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| Voice | Speech input | listen, transcribe |
| Gesture | Motion commands | recognize, stream |
| Text | Text entry | type, compose |
| Eye Tracking | Gaze input | track, calibrate |
| EMG | Muscle signal input | stream, recognize |
| EEG | Brain signal input | stream, classify |
| Keyboard | Typed input | keyDown, keyUp |
| Touch | Direct touch | touch, multiTouch |

## 18.3 Output

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| Projection | Spatial display | project, align |
| Display | Visual output | render, region |
| Audio | Sound output | play, stream |
| Speech | Spoken output | speak, synthesize |
| Lighting | Illumination | setColor, setIntensity |

## 18.4 Spatial

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| SLAM | Mapping + tracking | map, trackPose |
| Body Tracking | Human pose | trackBody, skeleton |
| Mapping | Environment map | buildMap, query |
| Localization | Position estimate | locate, refine |
| Depth | Range sensing | streamDepth |
| Object Tracking | Track objects | track, reacquire |

## 18.5 Compute

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| CPU | General compute | execute, schedule |
| GPU | Parallel compute | runKernel |
| AI | Inference | infer, embed |
| DSP | Signal processing | process, filter |
| Memory | Working memory | allocate, access |
| Storage | Persistence | read, write, list |

## 18.6 Communication

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| BLE | BLE link | connect, send, receive |
| Wi-Fi | Wi-Fi link | connect, send |
| UWB | Positioning/link | range, communicate |
| NFC | Short-range exchange | read, write, transact |
| Thread | IPv6 mesh | join, send |
| Matter | IoT interoperability | commission, control |

## 18.7 Security

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| Authenticate | Verify identity | authenticate, verify, enroll |
| Authorize | Control access | grant, revoke, check |
| Encrypt | Protect data | encrypt, decrypt |
| Identity | Prove identity | proveIdentity, attest |
| Trust | Trust classification | attestTrust, classify |

## 18.8 Environmental

| Capability | Purpose | Key Operations |
|------------|---------|----------------|
| Temperature | Temperature sensing | read, stream |
| Humidity | Humidity sensing | read, stream |
| Air Quality | Air sensing | read, stream |
| Pressure | Pressure sensing | read, stream |
| Light | Light sensing | read, stream |
| Noise | Noise sensing | read, stream |

## 18.9 Catalog Rules

- IDs are namespaced: `category.capability`.
- Each entry defines metadata template and lifecycle.
- Dependencies are declared per entry.
- Reference implementations are provided by the reference runtime.

## 18.10 Evolution

- The catalog grows via the Extension Framework (Chapter 19).
- Existing entries change only through deprecation (Chapter 5).
