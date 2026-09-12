# Chapter 10: Spatial Application Framework

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 10.1 Purpose

Applications can create spatial experiences. This chapter builds on the spatial concepts defined in earlier volumes.

## 10.2 Spatial Topics

- Anchors.
- Coordinate systems.
- Spatial objects.
- Persistent workspaces.
- Shared spaces.
- Object interaction.
- Environmental mapping.

## 10.3 Anchors

- Spatial anchors bind content to real-world positions.
- Anchors rely on UWB/spatial identity (Volume III, Ch 10).
- Anchors persist across sessions.

## 10.4 Coordinate Systems

- Applications use shared coordinate frames.
- Frames transform per spatial identity (Volume III, Ch 10).
- Timestamped transforms avoid drift (Volume VIII, Ch 11).

## 10.5 Spatial Objects

- Content objects placed in space.
- Objects have position, orientation, size.
- Objects interact with context (Volume VII).

## 10.6 Persistent Workspaces

- Workspaces survive across sessions.
- Workspace state is part of the Context Graph (Volume VII, Ch 3).
- Persistence follows user policy.

## 10.7 Shared Spaces

- Multiple users share spatial content (Volume VII, Ch 14).
- Ownership governs modification.
- Conflicts resolve deterministically.

## 10.8 Object Interaction

- Users interact with spatial objects via interactions (Volume VI).
- Object interaction is gesture-independent.
- Interaction events are semantic (Volume VIII, Ch 8).

## 10.9 Environmental Mapping

- Maps are built from sensor data.
- Maps update incrementally.
- Maps are privacy-preserved.

## 10.10 Conformance

A conformant implementation MUST support anchors, coordinate systems, spatial objects, and shared spaces.
