# Chapter 7: Sensor & Actuator Standardization

**Volume III — Hardware & Universal Module Specification · Working Draft v0.1**

This chapter defines common representations for sensor and actuator interfaces so that capabilities behave identically across vendors.

## 7.1 Sensor Categories

| Category | Examples |
|----------|----------|
| Motion | Accelerometer, gyroscope, magnetometer |
| Vision | RGB, IR, depth, ToF |
| Audio | MEMS microphones |
| Bioelectric | EMG, EEG, PPG, ECG |
| Environmental | Temperature, pressure, humidity, air quality |
| Positioning | GPS, UWB |
| Touch | Capacitive touch, pressure |
| Proximity | Proximity sensors |

## 7.2 Sensor Data Requirements

For each sensor type, the specification defines:

1. **Data format** — standardized units and encoding.
2. **Timestamp requirements** — synchronized, precise timestamps (Volume VIII, Ch 11).
3. **Sampling modes** — one-shot, continuous, event-driven, low-power.
4. **Calibration** — required calibration and metadata.
5. **Synchronization** — alignment across multiple sensors.
6. **Accuracy metrics** — published accuracy/resolution.
7. **Confidence reporting** — per-sample confidence where relevant.

## 7.3 Actuator Interfaces

Actuators follow a similar model with:

- **Standardized command interfaces** (e.g., haptic patterns, audio cues, projection commands).
- **Feedback reporting** — actuator state and completion.
- **Capability metadata** — what patterns/levels are supported.

Examples: haptic motors (strength, duration, pattern), LEDs (color, intensity, pattern), audio (volume, spatialization), projection (region, content reference).

## 7.4 Motion Sensor Standard

Illustrative requirements (motion category):

| Property | Requirement |
|----------|-------------|
| Units | SI (m/s², rad/s) |
| Range | Vendor-defined, reported in descriptor |
| Sampling | Configurable rates; default 100 Hz |
| Timestamp | µs precision, mesh-synchronized |
| Calibration | Factory + runtime auto-calibration |
| Confidence | Reported per sample or window |

## 7.5 Bioelectric Sensor Standard

Sensitive category — requires care:

- EMG/EEG/PPG data MUST be tagged with privacy class (Private).
- Raw bioelectric data MUST NOT be shared outside trusted domains.
- Only derived intent (gestures, stress level) crosses trust boundaries (Volume VII).
- Sampling and filtering conform to medical-grade standards where used clinically.

## 7.6 Vision Sensor Standard

- Depth/IR/RGB unified in a single view model (Volume VIII).
- Exposure/calibration metadata accompanies frames.
- Privacy rules for camera data per trust domains.

## 7.7 Conformance

A conformant sensor/actuator implementation MUST:

1. Provide data in the standardized format.
2. Attach synchronized timestamps.
3. Support required sampling modes.
4. Report calibration and accuracy.
5. Enforce privacy classification for sensitive data.
