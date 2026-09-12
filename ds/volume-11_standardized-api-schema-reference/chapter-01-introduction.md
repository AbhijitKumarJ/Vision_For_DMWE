# Chapter 1: Introduction & Reading Guide

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 1.1 Purpose

This volume defines the canonical data structures, schemas, and wire formats that act as the technical contracts of the DMWE platform. It translates the abstract concepts from earlier volumes into strict, typed representations that can be validated, versioned, and implemented by engineering teams.

Each schema in this volume is presented in two canonical forms:

- **Protocol Buffers (Protobuf v3)** — for low-power binary wire transmission (Volume VIII).
- **TypeScript Interfaces** — for the Application SDK and Intent-Oriented Programming (Volume IX).

Where a schema exists in both forms, they MUST be semantically identical. The Protobuf form is authoritative on the wire; the TypeScript form is authoritative in application code.

## 1.2 What This Volume Defines

- Core messaging envelopes and QoS semantics (Volume VIII).
- Module Descriptor and Capability Advertisement contracts (Volumes III & V).
- Semantic interaction schemas, including the Interaction Object (Volume VI).
- Context Fact and graph schemas (Volume VII).
- Fast-Path Binding and low-latency stream schemas (Volumes IV & V).
- Session, security, resource, and telemetry schemas.
- JSON Schema definitions for tooling and debugging.
- Validation, conformance, and governance rules for all schemas.

## 1.3 Relationship to Other Volumes

| Volume | Role |
|--------|------|
| III | Module Descriptor fields (§6) |
| V | Capability metadata, QoC, fusion (§7–8) |
| VI | Interaction grammar and objects (§9–10) |
| VII | Context Facts and graph schemas (§11–12) |
| VIII | Envelope framing, serialization, transport (§3–5, 14–15) |
| IX | TypeScript SDK and IOP type surface (§16) |
| X | Schema governance, registry, certification (§20) |
| XII | Reference applications consuming these schemas |

## 1.4 How to Read This Volume

- Chapters 2–4 define schema architecture, encoding, and evolution rules.
- Chapters 5–15 define the normative wire schemas by domain.
- Chapters 16–17 define the SDK and tooling representations.
- Chapters 18–20 define validation, reference libraries, and governance.

Readers building wire implementations MUST read Chapters 2–5 before any domain schema. Application developers MAY begin at Chapter 16.

## 1.5 Normative Status

All schemas in this volume are normative unless explicitly marked informative. A schema marked as an example or illustration is informative only and MUST NOT be treated as a contract.

## 1.6 Conformance

A conformant implementation MUST use the canonical schemas in this volume for all inter-module communication and MUST satisfy the conformance requirements stated in each chapter.
