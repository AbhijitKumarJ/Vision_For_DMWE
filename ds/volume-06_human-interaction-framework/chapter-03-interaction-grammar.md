# Chapter 3: Interaction Grammar

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

The interaction grammar defines the syntax and semantics of the Human Interaction Language.

## 3.1 Verbs

Verbs express the action:

Select, Move, Open, Close, Rotate, Zoom, Draw, Search, Accept, Reject, Delete, Navigate, Capture, Share, Project, Authenticate, Annotate, Organize, Collaborate, Inspect, Summarize, Generate

## 3.2 Modifiers

Modifiers refine the verb:

Fast, Slow, Continuous, Silent, Private, Shared, Temporary, Persistent, Precise, Approximate, Strong, Weak

## 3.3 Targets

Targets identify the object of the interaction:

Current Object, Current Window, Workspace, Room, Cloud, AI, IoT Device, Robot, Vehicle, Current User, Shared Team

## 3.4 Qualifiers

Qualifiers parameterize the interaction:

- **Distance** — how far
- **Direction** — which way
- **Magnitude** — how much
- **Duration** — how long
- **Confidence** — certainty
- **Priority** — urgency
- **Trust** — sensitivity
- **Accessibility** — assistive mode

## 3.5 Grammar Rules

- **Form:** `Verb + Modifier* + Target + Qualifier*`
- Verbs are required; modifiers/targets/qualifiers are optional per verb.
- A verb's grammar defines which targets it accepts.
- Unknown verbs/targets MUST be rejected or escalated.

## 3.6 Semantic Definitions

Each verb MUST define:

- Meaning (semantic effect).
- Accepted targets.
- Allowed modifiers.
- Default qualifiers.
- Required capabilities.
- Feedback expectations.

## 3.7 Example Grammar Entries

**Select**

- Meaning: designate an object as the focus.
- Targets: Current Object, Workspace, IoT Device, Robot.
- Modifiers: Precise, Approximate, Silent, Shared.
- Required: Pointer or Voice or Touch.

**Project**

- Meaning: display content in space.
- Targets: Workspace, Room, Vehicle.
- Modifiers: Private, Shared, Temporary.
- Required: Projection capability.

**Authenticate**

- Meaning: verify identity.
- Targets: Current User, Shared Team.
- Modifiers: Silent, Strong, Weak.
- Required: Authentication capability.

## 3.8 Grammar Extensibility

### 3.8.1 Extension Registration Process

New verbs, modifiers, and targets are registered through the Schema Registry (Volume XI, Ch 20). The process is:

```
1. PROPOSAL
   - Submit extension proposal with:
     • Name (verb/modifier/target)
     • Semantic definition
     • Accepted targets (for verbs)
     • Allowed modifiers (for verbs)
     • Required capabilities
     • Use case justification
     • Backward compatibility analysis

2. REVIEW
   - Schema Registry committee reviews proposal
   - Checks for:
     • Naming conflict with existing entries
     • Semantic overlap with existing entries
     • Completeness of grammar definition
     • Interaction Profile (Chapter 15) accompanies proposal

3. APPROVAL
   - Approved proposals receive a reserved enum value
   - Value is allocated from the extension range:
     • Verbs: 1000–1999
     • Modifiers: 1000–1999
     • Targets: 1000–1999

4. PUBLICATION
   - Extension is published to the Schema Registry
   - Interaction Profile is created (Chapter 15)
   - Documentation is updated

5. DEPRECATION
   - Extensions MAY be deprecated with:
     • Deprecation notice
     • Migration path to replacement
     • Minimum support period (2 major versions)
```

### 3.8.2 Naming Rules

- Names MUST use PascalCase (e.g., `VERB_PINCH_DRAG`).
- Names MUST be descriptive and unambiguous.
- Names MUST NOT conflict with existing entries (case-insensitive check).
- Abbreviations MUST be avoided unless universally understood.

### 3.8.3 Backward Compatibility

- Extensions are additive; existing verbs MUST NOT be modified.
- Unknown enum values MUST be ignored by consumers (Volume XI, Ch 9).
- Deprecated verbs MUST continue to be recognized for at least 2 major versions.
- Extensions MUST NOT break existing Interaction Profiles.

### 3.8.4 Extension Interaction Profile

Every new verb MUST be accompanied by an Interaction Profile (Chapter 15) that defines:

- Physical expressions that map to the verb.
- Recognition requirements (capabilities needed).
- Context constraints (when the verb is applicable).
- Confidence expectations.
- Fallback behavior (what happens if the verb is unavailable).

## 3.9 Conformance

A conformant implementation MUST support the grammar: parse Verb + Modifiers + Target + Qualifiers and apply verb semantics.
