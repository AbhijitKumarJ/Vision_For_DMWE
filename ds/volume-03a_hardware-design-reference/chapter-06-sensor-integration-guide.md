# Chapter 6: Sensor Integration Guide

**Volume III-A — Hardware Design Reference Manual · Working Draft v0.1**

## 6.1 Motion Sensors

Accelerometers, gyroscopes, magnetometers.

- **Placement:** align sensor axes with body frame; document orientation in the Module Descriptor (Volume III, Ch 10).
- **Calibration:** factory calibration + runtime auto-calibration (gyro bias, magnetometer hard/soft iron).
- **Synchronization:** timestamp at the sensor, not the MCU read (Volume III, Ch 7).
- **Shielding:** keep away from loud switching rails and radios.
- **Sampling:** select rate per capability; oversampling with decimation for noise.
- **Failure modes:** stuck readings, bias drift — detect via self-test and plausibility checks.

## 6.2 Vision Sensors

RGB, IR, depth, ToF.

- **Placement:** optical axis must match intended use (headband forward, ring downward).
- **Calibration:** intrinsic/extrinsic; store calibration in descriptor metadata.
- **Synchronization:** frames aligned to mesh time.
- **Shielding:** light seals, IR filter choices.
- **Sampling:** balance resolution/rate vs power/bandwidth.
- **Failure modes:** occlusion, saturation, lens fog.

## 6.3 Audio Sensors

MEMS microphones.

- **Placement:** acoustic ports away from wind and friction; multi-mic arrays for beamforming.
- **Calibration:** per-mic sensitivity matching.
- **Synchronization:** mic buffers aligned (critical for array processing).
- **Shielding:** acoustic seals against vibration coupling.
- **Failure modes:** clogged ports, solder stress.

## 6.4 Biometric Sensors

EMG, EEG, PPG, ECG.

- **Placement:** electrode-to-skin contact quality is paramount; document body placement.
- **Calibration:** baseline per user; motion-artifact compensation.
- **Synchronization:** precise sampling clocks; cross-module sync (Volume VIII, Ch 11).
- **Shielding:** extremely low-level signals; guard rings, driven shields.
- **Sampling:** Nyquist-aware; anti-alias filtering.
- **Privacy:** hardware SHOULD keep raw bio data within a trusted domain (Volume III, Ch 7).

## 6.5 Environmental Sensors

Temperature, pressure, humidity, air quality.

- **Placement:** away from body heat for ambient readings; near skin for skin temp.
- **Calibration:** offset per placement.
- **Synchronization:** low-rate, aligned timestamps.
- **Failure modes:** contamination, drift, condensation.

## 6.6 Placement Diagrams

- Create reference placement diagrams per form factor.
- Document achievable performance for each placement (e.g., ring IMU at finger tip vs base).
- Share diagrams to guide MeshOS spatial reasoning (Volume IV, Ch 9).

## 6.7 Sensor Data Contracts

- Data MUST follow Volume III, Chapter 7 formats.
- Emit confidence and accuracy metadata.
- Provide calibration data to the mesh.

## 6.8 Summary

Placement, calibration, synchronization, and shielding are the four pillars of reliable sensing in DMWE modules.
