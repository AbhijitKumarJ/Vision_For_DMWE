# Chapter 9: Interaction Grammar Schemas

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 9.1 Purpose

The **Human Interaction Language (HIL)** is expressed as a finite grammar of verbs, modifiers, and targets (Volume VI, Ch 2–3). These enums are the vocabulary every application compiles against.

## 9.2 Grammar Enums (`dmwe_interaction.proto`)

```protobuf
syntax = "proto3";
package dmwe.interaction;

enum Verb {
  VERB_UNKNOWN = 0;
  VERB_SELECT = 1;
  VERB_MOVE = 2;
  VERB_ROTATE = 3;
  VERB_SCROLL = 4;
  VERB_PROJECT = 5;
  VERB_AUTHENTICATE = 6;
  VERB_UNDO = 7;
  VERB_GRAB = 8;
  VERB_RELEASE = 9;
  VERB_PINCH = 10;
  VERB_SPREAD = 11;
  VERB_SWIPE = 12;
  VERB_DWELL = 13;
  VERB_AIR_TAP = 14;
  VERB_PINCH_DRAG = 15;
  VERB_WRIST_TWIST = 16;
  VERB_HEAD_NOD = 17;
  VERB_HEAD_SHAKE = 18;
  VERB_EYE_GAZE = 19;
  VERB_VOICE_COMMAND = 20;
  VERB_SQUEEZE = 21;
  VERB_FINGER_SPREAD = 22;
  VERB_ARM_SWEEP = 23;
  VERB_POINT = 24;
  VERB_WAVE = 25;
}

enum Modifier {
  MOD_UNKNOWN = 0;
  MOD_NONE = 1;
  MOD_PRECISE = 2;
  MOD_CONTINUOUS = 3;
  MOD_SILENT = 4;
  MOD_SHARED = 5;
  MOD_FORCEFUL = 6;
  MOD_GENTLE = 7;
  MOD_RAPID = 8;
  MOD_SLOW = 9;
  MOD_DOUBLE = 10;
  MOD_TRIPLE = 11;
  MOD_LONG_PRESS = 12;
  MOD_DOUBLE_AIR_TAP = 13;
  MOD_PINCH_AND_HOLD = 14;
}

enum Target {
  TARGET_UNKNOWN = 0;
  TARGET_CURRENT_OBJECT = 1;
  TARGET_WORKSPACE = 2;
  TARGET_ROOM = 3;
  TARGET_IOT_DEVICE = 4;
  TARGET_APPLICATION = 5;
  TARGET_SYSTEM_CONTROL = 6;
  TARGET_MEDIA_PLAYER = 7;
  TARGET_COMMUNICATION = 8;
  TARGET_FILE_SYSTEM = 9;
  TARGET_DISPLAY = 10;
  TARGET_AUDIO_OUTPUT = 11;
  TARGET_HAPTIC_ACTUATOR = 12;
  TARGET_NETWORK_SERVICE = 13;
  TARGET_CLOUD_RESOURCE = 14;
}

enum PriorityClass {
  PRIORITY_UNKNOWN = 0;
  PRIORITY_BACKGROUND = 1;
  PRIORITY_INTERACTIVE = 2;
  PRIORITY_CRITICAL = 3;
}

enum FeedbackLevel {
  FEEDBACK_UNKNOWN = 0;
  FEEDBACK_ACKNOWLEDGE = 1;
  FEEDBACK_PROGRESS = 2;
  FEEDBACK_CONFIRMATION = 3;
}

enum Lifecycle {
  LIFECYCLE_UNKNOWN = 0;
  LIFECYCLE_RECOGNIZED = 1;
  LIFECYCLE_EXECUTED = 2;
  LIFECYCLE_COMPLETED = 3;
}
```

## 9.3 Verb Semantics

- `VERB_SELECT` — choose a target.
- `VERB_MOVE` / `VERB_ROTATE` — spatial transformation; require a `spatial_vector`.
- `VERB_SCROLL` — continuous value change; requires a `scalar_delta`.
- `VERB_PROJECT` — direct a view or beam at a target.
- `VERB_AUTHENTICATE` — user verification; resolved via auth capabilities.
- `VERB_UNDO` — reverse the last executed interaction.
- `VERB_GRAB` — initiate manipulation of an object; hand tracking context.
- `VERB_RELEASE` — terminate object manipulation.
- `VERB_PINCH` — two-finger compression gesture; pinch-to-zoom context.
- `VERB_SPREAD` — two-finger expansion gesture; zoom-out context.
- `VERB_SWIPE` — directional gesture; navigation or dismissal.
- `VERB_DWELL` — gaze-based selection; gaze held on target for threshold duration.
- `VERB_AIR_TAP` — single finger tap in air; hand tracking context.
- `VERB_PINCH_DRAG` — pinch gesture with spatial movement; object repositioning.
- `VERB_WRIST_TWIST` — wrist rotation; quick settings or volume control.
- `VERB_HEAD_NOD` — affirmative head gesture; confirmation input.
- `VERB_HEAD_SHAKE` — negative head gesture; dismissal input.
- `VERB_EYE_GAZE` — continuous gaze direction; gaze-contingent rendering.
- `VERB_VOICE_COMMAND` — spoken command; resolved via voice capabilities.
- `VERB_SQUEEZE` — grip pressure gesture; force-sensitive interaction.
- `VERB_FINGER_SPREAD` — open hand gesture; dismissal or reveal.
- `VERB_ARM_SWEEP` — large arm motion; panoramic or multi-object selection.
- `VERB_POINT` — directed finger or hand position; spatial targeting.
- `VERB_WAVE` — greeting or acknowledgment gesture; social interaction.

## 9.4 Modifier Semantics

- `MOD_PRECISE` — sub-degree / high-accuracy intent.
- `MOD_CONTINUOUS` — streaming intent; target receives incremental updates.
- `MOD_SILENT` — no feedback required.
- `MOD_SHARED` — intent is observable by collaborative peers.
- `MOD_FORCEFUL` — high-intensity execution; e.g., force grab, hard press.
- `MOD_GENTLE` — low-intensity execution; e.g., soft touch, careful manipulation.
- `MOD_RAPID` — fast execution; acceleration or speed emphasis.
- `MOD_SLOW` — deliberate execution; precision emphasis.
- `MOD_DOUBLE` — double-tap or double-gesture; selection confirmation.
- `MOD_TRIPLE` — triple-tap; special action trigger.
- `MOD_LONG_PRESS` — sustained hold; context menu or extended action.
- `MOD_DOUBLE_AIR_TAP` — two air taps in quick succession; confirmation input.
- `MOD_PINCH_AND_HOLD` — sustained pinch; locking or persistent state change.

## 9.5 Target Semantics

- `TARGET_CURRENT_OBJECT` — the currently focused or manipulated object.
- `TARGET_WORKSPACE` — the user's active workspace or document.
- `TARGET_ROOM` — the physical room environment; smart home context.
- `TARGET_IOT_DEVICE` — a connected IoT device; actuator or sensor.
- `TARGET_APPLICATION` — a running application or service.
- `TARGET_SYSTEM_CONTROL` — system-level controls; volume, brightness, network.
- `TARGET_MEDIA_PLAYER` — media playback; play, pause, skip.
- `TARGET_COMMUNICATION` — messaging or call; send, receive, hang up.
- `TARGET_FILE_SYSTEM` — file or folder; open, save, move.
- `TARGET_DISPLAY` — output display; projection, screen, overlay.
- `TARGET_AUDIO_OUTPUT` — audio output device; speaker, headphones.
- `TARGET_HAPTIC_ACTUATOR` — haptic feedback device; vibration, force.
- `TARGET_NETWORK_SERVICE` — network service; API endpoint, cloud function.
- `TARGET_CLOUD_RESOURCE` — cloud storage or compute resource.

## 9.6 Extensibility

- New verbs, modifiers, and targets are additive and MUST be registered through the Schema Registry (Chapter 20).
- Consumers MUST ignore unknown enum values rather than fail.
- A grammar extension MUST be accompanied by an Interaction Profile (Volume VI, Ch 15).

## 9.6 Conformance

A conformant implementation MUST encode interaction intents using the canonical grammar enums and MUST tolerate unknown values for forward compatibility.
