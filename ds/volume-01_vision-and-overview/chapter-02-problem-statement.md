# Chapter 2: Problem Statement

Today's wearable and interaction technology suffers from fundamental structural limitations. These problems fragment the user experience, waste hardware, lock in developers, and keep interaction models screen- and device-bound.

## 2.1 Device Fragmentation

Each wearable product is designed as a standalone, closed ecosystem:

- Smart rings expose ring-specific APIs.
- Smartwatches use their own interaction model.
- Smart glasses ship with independent SDKs.
- Fitness bands often cannot cooperate with any other wearable.

The result is a fragmented user experience: a user wearing a ring, a watch, and glasses manages three different apps, three pairing flows, and three overlapping feature sets.

## 2.2 Redundant & Underutilized Hardware

Multiple devices on the same body frequently duplicate the same components — accelerometers, gyroscopes, batteries, radios, and processors — yet they cannot share these resources. A wristband's IMU and a ring's IMU measure the same hand movement independently, wasting energy and producing conflicting data.

## 2.3 Hardware-Centric Development

Applications are tightly coupled to specific devices:

- Code written for one ring vendor does not run on another.
- Adding or replacing a device requires changing application logic.
- Developers must target "the ring" instead of expressing what the user wants to do.

This makes applications fragile and discourages innovation in new hardware modalities (EMG, subvocalization, projection, neural interfaces).

## 2.4 High Cognitive & Physical Friction

Users must constantly:

- Reach for, unlock, and stare at a phone or watch.
- Switch between devices depending on the task.
- Perform explicit, non-natural actions to accomplish simple goals.

Interaction remains **screen-bound and device-bound** rather than following the user's natural intent.

## 2.5 Limited Extensibility

Most wearable ecosystems are closed. Third-party hardware cannot seamlessly integrate, new capabilities cannot be added without vendor cooperation, and open standards are the exception rather than the rule.

## 2.6 Privacy & Agency Issues

Sensitive data — biometrics, gaze, neural signals, movement patterns — often flows to clouds or untrusted devices by default. Users have little control over where their most personal data is processed or stored.

## 2.7 Why This Matters

These problems block the promise of ambient, ubiquitous computing:

- Interaction should be natural and continuous, not punctuated by device operations.
- Hardware should be a replaceable commodity, not the center of the experience.
- Applications should be written once and run across any valid hardware configuration.
- Privacy should be the default, not an opt-in afterthought.

DMWE addresses these issues by introducing **standardized capabilities**, **semantic interaction**, and **distributed resource management** — described in this specification.
