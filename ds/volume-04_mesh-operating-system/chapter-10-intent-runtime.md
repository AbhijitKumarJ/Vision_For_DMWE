# Chapter 10: Intent Runtime

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

The Intent Runtime transforms raw sensor output into **semantic interaction events** understood by applications. The interaction grammar is specified in Volume VI; the runtime here is the OS machinery.

## 10.1 The Intent Pipeline

```
Sensors
   ↓
Filtering
   ↓
Fusion
   ↓
Recognition
   ↓
Intent
   ↓
Context
   ↓
Interaction
   ↓
Applications
```

| Stage | Responsibility |
|-------|----------------|
| Sensors | Raw data from modules |
| Filtering | Noise removal, normalization |
| Fusion | Combine multiple sensors (Volume VI, Ch 8) |
| Recognition | Identify gestures/phrases/commands |
| Intent | Semantic meaning (Verb + Modifier + Target) |
| Context | Disambiguation by context |
| Interaction | Package as interaction event |
| Applications | Deliver to subscribed apps |

## 10.2 Intent Confidence

- Every intent carries a confidence score.
- Low-confidence intents MUST be either withheld or routed for confirmation.
- Confidence thresholds are context- and class-dependent.

## 10.3 Conflict Resolution

Multiple interpretations MUST be disambiguated by the following deterministic algorithm.

### 10.3.1 Conflict Sources

| Source | Example |
|--------|---------|
| Simultaneous modalities | Voice says "select" while hand gesture says "scroll" |
| Ambiguous gesture | Air tap vs. pinch vs. dwell threshold |
| Context mismatch | Gesture intent conflicts with application context |
| Confidence collision | Two recognizers produce same intent with similar confidence |
| Temporal overlap | Two intents within the fusion window |

### 10.3.2 Resolution Algorithm

When two or more conflicting intents are detected within the fusion window:

```
RESOLVE(conFLICT_intents[]):
  1. FILTER by confidence threshold
     - Discard intents with confidence < CONFIDENCE_MIN (default: 0.3)
     - If only one remains → emit it

  2. COMPARE confidence scores
     - If max_confidence - second_confidence > CONFIDENCE_GAP (default: 0.15)
       → emit the highest-confidence intent
     - If gap ≤ CONFIDENCE_GAP → proceed to step 3

  3. COMPARE modality roles
     - Primary modality outranks Confirmatory, Redundant, Augmenting
     - If roles differ → emit the intent from the higher-ranked modality
     - If roles are equal → proceed to step 4

  4. COMPARE context relevance
     - Score each intent against current context (Volume VI, Ch 9)
     - Context relevance = Σ(context_weight × intent_match_score)
     - Emit the intent with higher context relevance
     - If tied → proceed to step 5

  5. COMPARE temporal recency
     - Emit the intent with the later timestamp
     - If still tied → proceed to step 6

  6. COMPARE user profile preference
     - Check interaction history (Volume VI, Ch 15)
     - Emit the intent matching the user's historical preference
     - If still tied → proceed to step 7

  7. ESCALATE to user
     - Present clarification feedback (Volume VI, Ch 10)
     - User selects intent; selection is recorded for future disambiguation
```

### 10.3.3 Resolution Parameters

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| `CONFIDENCE_MIN` | 0.3 | 0.0–1.0 | Minimum confidence to consider an intent |
| `CONFIDENCE_GAP` | 0.15 | 0.05–0.5 | Minimum gap to declare winner without further checks |
| `FUSION_WINDOW_MS` | 100 ms | 50–300 ms | Time window within which intents are considered simultaneous |
| `CONTEXT_WEIGHT_DEFAULT` | 0.5 | 0.0–1.0 | Default weight for context relevance scoring |
| `ESCALATION_THRESHOLD` | 2 | 1–5 | Number of tied intents before escalating to user |

### 10.3.4 Conflict Resolution by Interaction Class

| Interaction Class | Primary Resolution | Fallback |
|-------------------|-------------------|----------|
| Critical Real-time | Confidence gap | Modality role (hardcoded) |
| Interactive | Confidence + context | User profile |
| Responsive | Context + user profile | Clarification |
| Conversational | Context + user profile | Clarification |
| Background | Confidence only | Drop if ambiguous |

### 10.3.5 Conflict Logging

All conflicts and their resolutions are logged with:
- Timestamp, involved intents, confidence scores, resolution method
- Logs power learning and profile adaptation (Volume VI, Ch 15)
- Logs MUST respect data classification (Volume IV, Ch 14 §14.8)

## 10.4 Prediction

- The runtime MAY predict likely next intents.
- Predictions pre-warm resources and reduce latency.
- Predictions MUST NOT trigger side effects without confirmation.

## 10.5 History

- Intent history is retained per privacy policy.
- History powers learning, prediction, and recovery of interrupted tasks.
- History is part of the Human Digital Twin (Volume VII).

## 10.6 Correction

- Users MAY correct misinterpreted intents.
- Corrections MUST feed back into recognition models.
- Correction loops MUST respect user privacy.

## 10.7 Intent Persistence

- In-flight intents persist in **Distributed Interaction State** (Chapter 12).
- If a module dies mid-intent, another module MUST be able to resume.

## 10.8 The Formal Execution Pipeline

Every action in DMWE — micro-gesture, voice command, sensor threshold, or AI agent request — passes through the same 10-stage pipeline. This is the instruction cycle of the MeshOS, and it is defined formally using the Graph Algebra (Volume V, Ch 8 §8.11) over the Unified Meta-Model (Volume VII, Ch 3 §3.9).

### 10.8.1 The Declarative Intent Model

Applications specify *what* to achieve (with constraints and context), not *how*. An Intent Object contains:

- **Goal:** the semantic action (e.g., `Authenticate_User`, `Project_Workspace`).
- **Priority:** schedulability weight (Critical, Interactive, Background).
- **Constraints (C):** mathematical rules the execution MUST satisfy (e.g., `Latency < 20ms`, `Trust == Private`).
- **Context:** current user/environment state (e.g., `Activity == Driving`).
- **Deadline:** absolute time by which the intent must be fulfilled or aborted.

### 10.8.2 The 10 Stages

| Stage | Name | Action | Algebraic Operator |
|-------|------|--------|--------------------|
| 1 | **Intent Ingestion** | Normalize raw signals or explicit requests into a standard Intent Object | — |
| 2 | **Intent Resolution** | Query the Meta-Model Capability View for all ways to satisfy the Goal; discard providers violating Constraints | Filter |
| 3 | **Task Graph Construction** | Compile the Intent into a Directed Acyclic Graph (DAG) of logical Tasks | — |
| 4 | **Capability Planning** | Map abstract Task Graph nodes to specific Capability IDs; combine candidates for higher confidence | Bind, Compose |
| 5 | **Resource Planning** | Estimate physical cost (CPU, NPU, memory, battery, bandwidth) of the bound Task Graph | Project |
| 6 | **Distributed Scheduler** | Map capabilities to physical nodes, minimizing cost while satisfying Deadline and Priority | — |
| 7 | **Execution Graph Generation** | Convert the plan into concrete **Execution Units (EUs)** — the smallest schedulable entity | — |
| 8 | **Runtime Execution** | Dispatch EUs to local schedulers; data flows per Execution Graph edges | Bind |
| 9 | **Monitoring & JIT Replanning** | Observe execution against Constraints; on violation, hot-swap or migrate | Substitute, Migrate |
| 10 | **Completion & Graph Commit** | Unbind resources, return result, append outcome Event to the UMM | Unbind |

### 10.8.3 The 10 Stages in Detail

**Stage 1: Intent Ingestion**
- Input: raw signals (gesture, voice) or explicit software requests.
- Output: `Intent: { Goal: Authenticate, Constraints: [HandsFree, Private] }`.

**Stage 2: Intent Resolution**
- Find all providers of the Goal's Capability; Filter out providers violating Constraints (e.g., discard Fingerprint Scanner because `HandsFree == True`).
- Output: a logical set of candidate capabilities (e.g., Face Recognition via Glasses, Voice Recognition via Earbuds).

**Stage 3: Task Graph Construction**
- `Intent: Authenticate` → DAG: `[Acquire_Biometric] -> [Extract_Features] -> [Verify_Template] -> [Grant_Access]`.
- Output: a logical Task Graph (hardware independent).

**Stage 4: Capability Planning**
- `Bind([Acquire_Biometric], Compose(Voice_Rec, Face_Rec))`.
- Output: a Capability-Bound Task Graph.

**Stage 5: Resource Planning**
- Query the Resource View to estimate required CPU, NPU, Memory, Battery, and Network Bandwidth.
- Output: an annotated graph with precise execution cost estimates.

**Stage 6: Distributed Scheduler**
- Evaluate cost estimates against Node Health, Thermals, and Energy Budgets (Volume IV, Ch 8 §8.2).
- Output: the Execution Plan (logical tasks → physical hardware).

**Stage 7: Execution Graph Generation**
- EUs are generated; each EU is the smallest schedulable entity.
  - `EU 1: Module: Glasses -> Task: Capture_Face -> Priority: High`
  - `EU 2: Module: Necklace_NPU -> Task: Verify_Template -> Priority: High`
- Output: the physical Execution Graph.

**Stage 8: Runtime Execution**
- EUs dispatched to local schedulers; data flows per Execution Graph edges using Volume VIII protocols.
- Output: the physical manifestation of the intent.

**Stage 9: Monitoring & JIT Replanning (The Control Loop)**
- If a Constraint is violated during execution (e.g., Necklace NPU overheats and throttles, threatening the Deadline):
  - The Health Manager detects the anomaly.
  - The Scheduler applies `Substitute` or `Migrate` — e.g., `Migrate([Verify_Template], Necklace_NPU, Phone_NPU)`.
- Output: execution continues uninterrupted despite hardware failure.

**Stage 10: Completion & Graph Commit**
- Resources are unbound (`Unbind`).
- The successful result is returned to the requesting application.
- The outcome is appended as an immutable **Event** node to the UMM, permanently logging the interaction for machine learning and context modeling.

### 10.8.4 Execution Objects as Meta-Model Entities

The Execution Pipeline does not require a separate runtime database. Every artifact generated during the 10 stages (Intent, Tasks, EUs) is instantiated as a temporary Entity inside the UMM; their connections are Relationships.

- `Entity(Intent_Auth) -> [requires] -> Entity(Task_Acquire)`
- `Entity(Task_Acquire) -> [scheduled_as] -> Entity(EU_1)`
- `Entity(EU_1) -> [hosted_on] -> Entity(Module_Glasses)`

Because execution state lives in the same semantic graph as the hardware, context, and capabilities, any subsystem can query the exact operating-system state in real time via standard graph traversal.

## 10.9 Conformance

A conformant Intent Runtime MUST:

1. Implement the full intent pipeline.
2. Emit confidence-scored intents.
3. Resolve conflicts deterministically.
4. Support prediction, history, and correction.
5. Persist in-flight intents for resume.
6. Execute all actions through the 10-stage formal pipeline.
7. Represent all pipeline artifacts as Entities/Relationships in the Unified Meta-Model.
8. Support JIT replanning via Substitute and Migrate without dropping in-flight sessions.
