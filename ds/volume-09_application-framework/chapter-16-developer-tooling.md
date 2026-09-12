# Chapter 16: Developer Tooling

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 16.1 Purpose

Describes recommended tools that reduce development complexity.

## 16.2 Recommended Tools

- Simulator.
- Device emulator.
- Debugger.
- Profiler.
- Interaction recorder.
- Context simulator.
- Capability inspector.
- Log viewer.
- Test harness.

## 16.3 Simulator

- Simulates mesh behavior.
- Simulates modules and capabilities.
- Runs applications without hardware.

## 16.4 Device Emulator

- Emulates specific module hardware.
- Exercises the module descriptor (Volume III, Ch 4).
- Supports firmware-level testing.

## 16.5 Debugger

- Debugs distributed components.
- Tracks state across modules.
- Supports breakpoints and stepping.

## 16.6 Profiler

- Measures CPU, energy, memory, latency.
- Profiles per capability (Volume VIII, Ch 16).
- Identifies hotspots.

## 16.7 Interaction Recorder

- Records interaction flows (Volume VI, Ch 16).
- Replays for testing.
- Feeds friction analysis.

## 16.8 Context Simulator

- Simulates context changes (Volume VII).
- Tests adaptation behavior.
- Drives scenario-based testing.

## 16.9 Capability Inspector

- Inspects the Capability Registry (Volume V).
- Views capabilities, quality, trust.
- Troubleshoots resolution.

## 16.10 Log Viewer

- Views canonical logs (Volume VIII, Ch 16).
- Correlates trace IDs.
- Filters by level and source.

## 16.11 Test Harness

- Runs the Testing Framework (Chapter 17).
- Automates distributed tests.
- Reports conformance results.

## 16.12 Conformance

Tooling is recommended; conformant applications MUST be testable with the standard harness.
