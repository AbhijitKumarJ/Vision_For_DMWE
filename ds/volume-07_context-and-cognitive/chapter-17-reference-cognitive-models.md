# Chapter 17: Reference Cognitive Models

**Volume VII — Context & Cognitive Intelligence Framework (CCIF) · Working Draft v0.1**

## 17.1 Purpose

Provides canonical models for common cognitive tasks so implementations interoperate.

## 17.2 Activity Recognition Model

- Human activity inference from sensors.
- Standard activity taxonomy (Volume VI, Ch 5).
- Confidence-scored outputs.

## 17.3 Intent Inference Model

- Intents are interpreted from interactions (Volume VI, Ch 3).
- Intent has priority and confidence.
- Intent feeds the Intent Runtime (Volume IV, Ch 9).

## 17.4 Attention & Focus Model

- Predicts user attention state.
- Feeds adaptive response (Chapter 10).
- Privacy-sensitive — gated by consent.

## 17.5 Behavioral Routine Model

- Encodes habits and routines (procedural memory, Chapter 12).
- Feeds prediction (Chapter 9).
- User-editable.

## 17.6 Preference Prediction Model

- Predicts likely preferences in new situations.
- Learned from behavior (Chapter 13).
- Proposals are transparent.

## 17.7 Environmental Context Model

- Encodes location, movement, ambient conditions.
- Spatial alignment per Volume III, Ch 10.

## 17.8 Multi-Modal Alignment Model

- Aligns cross-modal signals (speech, gesture, sensor).
- Feeds interaction (Volume VI, Ch 11).

## 17.9 Model Interoperability

- All reference models share:
  - Common metadata.
  - Common output formats.
  - Confidence scoring.
- Reference models are extension points (Chapter 19).

## 17.10 Conformance

A conformant implementation MUST support reference model interfaces, common formats, and confidence scoring.
