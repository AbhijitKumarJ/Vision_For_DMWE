# Chapter 15: Transport Adapters

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 15.1 Purpose

Defines how DMWE maps onto different transports. The DMWE protocol remains transport-agnostic; adapter specifications describe capability and constraint mappings.

## 15.2 Supported Adapters

- Bluetooth Low Energy.
- Wi-Fi.
- Wi-Fi Direct.
- Ultra-Wideband.
- USB-C.
- Thread.
- Matter.
- Ethernet.
- Cellular (gateway scenarios).

## 15.3 Adapter Responsibilities

- Frame DMWE messages onto transport frames.
- Map QoS classes to transport priorities.
- Report transport capability and constraints.
- Manage transport-specific pairing/security.

## 15.4 BLE Adapter

- Low-power, short-range.
- GATT/periodic advertising for discovery (Chapter 3).
- Limited MTU handled by segmentation.

## 15.5 Wi-Fi / Wi-Fi Direct Adapter

- Higher bandwidth.
- Direct or via access point.
- Used for audio/video and bulk transfers.

## 15.6 Ultra-Wideband Adapter

- Precise ranging and positioning (Volume III, Ch 10).
- Low-power short-range data.
- High-precision timing (Chapter 11).

## 15.7 USB-C Adapter

- Wired, high-bandwidth.
- Charging + data (Volume III, Ch 9).
- Trusted local transport.

## 15.8 Thread / Matter Adapter

- Mesh IPv6 networking.
- Bridges to smart home ecosystems (Volume I, Ch 8).
- Interoperates with Matter devices.

## 15.9 Ethernet / Cellular Adapters

- Fixed and gateway deployments.
- Ethernet: stable high-bandwidth backbone.
- Cellular: remote/ubiquitous connectivity.

## 15.10 Constraint Mappings

- Each adapter declares: bandwidth, latency, MTU, energy profile.
- QoS admission uses declared constraints (Chapter 12).
- Identical behavior regardless of transport.

## 15.11 Conformance

A conformant adapter MUST frame DMWE messages, map QoS, report constraints, and preserve protocol semantics.
