# MeshOS Reference Simulator — DMWE

An interactive, browser-based reference simulator for the **Distributed Modular Wearable Ecosystem (DMWE)** and its operating system, **MeshOS**. It implements and demonstrates the core concepts of the DMWE specifications (Volumes I–XII): a mesh of wearable and ambient-IBN hardware nodes, hardware-abstracted capabilities, deterministic primary-node election, capability fusion, intent-driven interaction grammar, negotiation and fast-path protocols, fault-tolerance triggers, a Unified Meta-Model knowledge graph with a formal Graph Algebra, and a reference-app playground.

> **Standards compliance:** The simulator is implemented against the DMWE volume specs. Notable implemented schemas live in `ds/volume-11_standardized-api-schema-reference/chapter-21-formal-graph-algebra-schemas.md` (Graph Algebra ops, `RelationshipType`, `CompositionRule`), mirrored in `src/types/dmwe.ts` and `src/simulator/GraphAlgebra.ts`.

---

## Features

- **Mesh Topology View** — live node grid with battery, compute, NPU, IBN status, thermal telemetry, and Primary Coordinator badge.
- **Node Studio** — inspect and register additional hardware modules into the mesh.
- **Gesture Sandbox** — trigger gestures (pinch, blink, subvocal, twitch, tap) that generate intent packets.
- **Capability Graph & Fusion** — the Capability Registry plus automatic fusion (e.g. Ring + Glasses → "Fused Gaze-Pointer Vector").
- **Unified Meta-Model & Graph Algebra** — one canonical knowledge graph with π projections, immutable event chain, and 12 algebra operators.
- **Context Graph (Human Digital Twin)** — context facts with confidence, layer, and provenance.
- **Primary Election Matrix** — deterministic coordinator scoring (Battery 25% + Compute 25% + NPU 20% + IBN 30%).
- **Fault Tolerance Lab** — trigger canonical faults (F-004, F-007, F-009, F-022, F-023, F-026) and watch recovery.
- **CLI Sandbox** — interactive terminal (boot/kill nodes, inspect graphs, negotiate, fast-path, run algebra ops).
- **Reference Apps Playground** — 8 DMWE reference app scenarios with SDK-style code snippets.
- **AI Intent Parser** — natural-language intent parsing via Gemini (`gemini-2.5-flash`) with rule-based fallback when no API key is configured.

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React 19, TypeScript 5.8 |
| Build | Vite 6 + esbuild (server bundle) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react icons, Motion |
| Backend | Express 4 (Node), Vite dev middleware |
| AI | `@google/genai` — Gemini `gemini-2.5-flash` intent parsing |
| Scripts | `tsx` for dev server, `tsc --noEmit` for typecheck (`npm run lint`) |

### Scripts

```bash
npm install          # install dependencies
npm run dev          # start dev server (tsx server.ts) on http://0.0.0.0:3000
npm run build        # vite build + esbuild bundle server.ts -> dist/
npm run start        # run the production server bundle (node dist/server.cjs)
npm run lint         # TypeScript typecheck (tsc --noEmit)
```

### Environment

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`. If unset, the AI Intent Parser falls back to a rule-based heuristic parser so the app remains fully functional offline.

---

## Project Structure

```
meshos-reference-simulator/
├── server.ts                        # Express + Vite middleware + /api/ai/parse-intent
├── vite.config.ts                   # React + Tailwind plugins, @ alias
├── tsconfig.json                    # ES2022, moduleResolution: bundler, noEmit
└── src/
    ├── main.tsx / App.tsx           # App shell, tab routing, health tick (2.5s)
    ├── index.css                    # Tailwind entry
    ├── types/
    │   └── dmwe.ts                  # Single type hub: all DMWE/MeshOS types + enums
    ├── simulator/
    │   ├── MeshOSCore.ts            # Central engine: mesh state, packets, fusion, election
    │   ├── MeshRadio.ts             # Pub/sub packet bus with simulated latency & noise
    │   ├── VirtualNodes.ts          # VirtualNode class + 9 preset hardware profiles
    │   ├── NegotiationEngine.ts     # Volume VIII §7.7 REQUEST→OFFER→ACCEPT→BOUND
    │   ├── FastPathEngine.ts        # Volume XI Ch 13 low-latency stream bindings
    │   ├── MetaModel.ts             # Volume II Ch 4 Unified Meta-Model graph
    │   ├── GraphAlgebra.ts          # Volume XI Ch 21 — 12 formal algebra operators
    │   ├── ReferenceApps.ts         # 8 reference application definitions
    │   └── CLIEngine.ts             # Interactive CLI sandbox command processor
    └── components/
        ├── Header.tsx               # Tab navigation + mesh reset
        ├── TopologyView.tsx         # Node topology grid
        ├── NodeStudio.tsx           # Register new nodes
        ├── GestureSandbox.tsx       # Gesture triggers
        ├── GraphInspector.tsx       # Capability/Context/Unified Meta-Model views
        ├── TerminalView.tsx         # CLI terminal UI
        ├── AppsPlayground.tsx       # Reference apps
        └── AIIntentParserView.tsx   # Natural-language intent parsing UI
```

---

## Technical Implementation Details

### 1. Core Engine — `MeshOSCore`

`MeshOSCore` is a singleton instantiated in `App.tsx` with the global `MeshRadio`. It owns all mutable simulation state:

- `nodes: Map<string, VirtualNode>` — registered hardware modules.
- `capabilityRegistry: CapabilityAdvertisement[]` — the Capability Graph.
- `contextFacts: Map<string, ContextFact>` — Human Digital Twin facts.
- `faultEvents`, `logs` — capped FIFO buffers (50 / 300 entries).
- `metaModel: MetaModel` + `graphAlgebra: GraphAlgebra` — the knowledge graph and its operators.

**Packet flow.** All nodes communicate exclusively through `MeshRadio.broadcast()`. The core subscribes as listener node `"MESH_OS_PRIMARY"` and routes envelopes in `handlePacket()` by `PayloadType`: `DESCRIPTOR`, `CAPABILITY_ADVERT`, `INTERACTION_OBJ`, `NODE_OFFLINE`, `CONTEXT_FACT`. Radio dispatch is asynchronous (`setTimeout(latency)`), which simulates over-the-air propagation.

**Primary election.** `recalculatePrimaryElection()` (Volume IV Ch 4) computes a deterministic fitness score:

```ts
batteryPart  = batteryLevel * 0.25;
computePart  = Math.min(1.0, computeMips / 3000) * 0.25;
npuPart      = hasNpu ? 0.20 : 0.05;
ibnPart      = isIbn ? 0.30 : 0.10;
fitnessScore = batteryPart + computePart + npuPart + ibnPart;
```

Failover to a new coordinator logs `F_006_PRIMARY_NODE_LOSS`.

**Capability fusion.** `evaluateCapabilityFusion()` detects the presence of discrete capabilities and synthesizes fused ones (e.g. `interaction.pointer.precision` + `interaction.gaze.select` → `interaction.spatial_pointer.fused`). Fusion is now **re-routed through Graph Algebra `compose()`** with `CompositionRule.COMPOSE_FUSION` (Volume XI Ch 21), emitting a `FUSION_ACTIVE` meta-event carrying the canonical input DIDs. When an input node drops, fusion degrades and the discrete capability is restored (`F_008_CAPABILITY_PROVIDER_FAILURE`).

**Fault injection.** `recordFault()` centralizes all fault handling: it appends a `FaultEvent`, logs it, emits a `FAULT_ALERT` meta-event, and broadcasts a `FAULT_ALERT` packet onto the mesh. Trigger methods (`triggerF004ModuleDisconnect`, `triggerF007MeshPartition`, `triggerF009CommCongestion`, `triggerF022ContextPoisoning`, `triggerF023SchedulerDeadlock`, `triggerF026SchemaMismatch`) expose the canonical F-codes.

### 2. Mesh Radio — `MeshRadio`

A simple pub/sub bus: `subscribe(nodeId, callback)`, `broadcast(envelope)`. Broadcasts record `LatencyObservation` (declared vs actual) per `QoSClass`, apply a simulated latency, and dispatch asynchronously to all listeners except the sender.

### 3. Virtual Nodes — `VirtualNodes.ts`

`VirtualNode` wraps a `ModuleDescriptor` + capabilities and implements `boot()` (broadcasts `DESCRIPTOR` then `CAPABILITY_ADVERT`), `die()`, `updateHealth()`, `updateBattery()`, and `triggerAction()` (builds an `InteractionObject` from the interaction grammar and broadcasts it). `createPresetNodes()` returns 9 profiles:

| ID | Name | Class |
| -- | ---- | ----- |
| DMWE-RNG-9942 | Aura Smart Ring | SENSOR |
| DMWE-GLS-1123 | Lumina AR Glasses | VISION |
| DMWE-SUB-8812 | Whisper Subvocalization Patch | BIO |
| DMWE-WST-3301 | EMG Wristband | BIO |
| DMWE-EAR-7711 | Ultrasonic Ear Bead | AUDIO |
| DMWE-PRJ-4010 | Haptic Shape-Memory Bead | OUTPUT |
| IBN-TBL-5590 | Smart Cafe Table | INTERMEDIARY_IBN |
| IBN-POS-1090 | Point-of-Sale Terminal | INTERMEDIARY_IBN |
| IBN-AUTO-007 | Vehicle CAN Bridge | INTERMEDIARY_IBN |

### 4. Unified Meta-Model — `MetaModel.ts`

Implements Volume II Ch 4 / GL Review Part I: a **single canonical knowledge graph** with five primitives — Entity, Relationship, Property, Event, Constraint. Every subsystem view is a **π projection** of this one graph.

- **Entities** — `Map<string, MetaEntity>` keyed by canonical DID, typed as `MODULE`, `CAPABILITY`, `CONTEXT`, `INTENT`, etc.
- **Relationships** — typed edges from the canonical `RelationshipType` union (`REL_PROVIDES`, `REL_CONSUMES`, `REL_BOUND_TO`, ...).
- **Properties** — mutable key/value metadata on entities (battery, latency, confidence, etc.), appended to a `diffs` log for graph-diff sync (GL Review Part II).
- **Events** — immutable, append-only temporal chain (`FUSION_ACTIVE`, `NODE_BOOTED`, `FAULT_ALERT`, `INTENT_STARTED`, ...), capped at 200.
- **Constraints** — `(propertyDid, operator, threshold, isHardConstraint)` tuples checked by Graph Algebra `verify()`.

**Canonical DIDs.** `createCanonicalDid(type, id, version)` produces `DID:DMWE:STD:<TYPE>:NNNNNN:vN` (e.g. `DID:DMWE:STD:MODULE:000001:v1`, `DID:DMWE:STD:CAP:001009:v1`).

`MeshOSCore` keeps sync mappings so every runtime object maps to its canonical DID: `moduleDidByNodeId`, `capabilityDidByCapId`, `contextFactDidByKey`. Node health is pushed into the graph each tick via `syncNodeProperties()`, and context/intent/fault activity emits meta-events.

### 5. Graph Algebra — `GraphAlgebra.ts`

Implements Volume XI Ch 21 — twelve formal operators over the Meta-Model, mirroring the proto schemas in `chapter-21-formal-graph-algebra-schemas.md`:

| Operator | Method | Purpose |
| -------- | ------ | ------- |
| ⊕ Compose | `compose()` | Combine capabilities into a fused/synthesized capability |
| ⊗ Merge | `merge()` | Merge entities into one logical entity |
| ÷ Split | `split()` | Split an entity into independent components |
| π Project | `project()` | Extract a subsystem view (delegates to `MetaModel.project`) |
| σ Filter | `filter()` | Keep entities satisfying a predicate |
| ⧉ Replicate | `replicate()` | Create synchronized copies across nodes |
| ⤳ Bind | `bind()` | Create a runtime dependency edge, reserve target |
| ⊘ Unbind | `unbind()` | Remove a dependency without destroying entities |
| ⇄ Substitute | `substitute()` | Atomically replace a bound entity (unbind + bind) |
| ↑ Enhance | `enhance()` | Augment an entity with auxiliary data |
| Σ Aggregate | `aggregate()` | Pool a property across entities (e.g. battery pool) |
| ⇢ Migrate | `migrate()` | Re-locate a task between nodes |
| ✓ Verify | `verify()` | Formally verify a constraint predicate |

Each operator logs via the `AlgebraLogFn` and emits meta-events, keeping the execution pipeline auditable.

### 6. Negotiation & Fast-Path Engines

- **`NegotiationEngine`** (Volume VIII §7.7) — drives the `REQUEST → OFFER → ACCEPT → BOUND` state machine with session tracking and sequence numbers.
- **`FastPathEngine`** (Volume XI Ch 13) — grants low-latency stream bindings (stream tokens, Hz, validity window) that bypass the semantic routing path.

### 7. Intent Grammar & Routing

The interaction grammar lives in `src/types/dmwe.ts`: **26 verbs** (`Verb`), **14 targets** (`Target`), **13 modifiers** (`Modifier`). `InteractionObject` packets carry intent + origin capability + confidence + `fastPathEligible`. `MeshOSCore.subscribeToIntent(verb, cb)` is the application SDK hook (Volume IX); incoming intents are validated (low-confidence triggers `F_008`), registered as `INTENT` entities in the meta-model, and routed to subscribers.

### 8. Server & AI — `server.ts`

Express serves the Vite app (dev middleware in dev, static `dist/` in production). `POST /api/ai/parse-intent` maps natural language to a DMWE Intent Packet:

- With `GEMINI_API_KEY`: `gemini-2.5-flash` with JSON `responseMimeType` and a strict schema prompt.
- Without a key: a rule-based heuristic fallback infers verb/target/modifiers/capability.
- `GET /api/health` returns system status.

---

## CLI Sandbox Quick Reference

| Command | Description |
| ------- | ----------- |
| `nodes` | List nodes + election fitness scores |
| `boot` / `kill <nodeId\|all>` | Power nodes on/off |
| `caps` | Inspect Capability Graph & fusion state |
| `facts` | Inspect Context Graph (HDT) |
| `gesture <nodeId> <action>` | Trigger a gesture |
| `negotiate <capId>` | Run the negotiation protocol |
| `fastpath <capId>` | Establish a low-latency stream binding |
| `health` | Node thermal / mem / CPU / link telemetry |
| `umm` | Unified Meta-Model entity/event overview |
| `graph [view]` | π projection of a view (CAPABILITY, CONTEXT, MODULE, RESOURCE, SECURITY) |
| `algebra <op>` | Run `compose`, `verify`, or `aggregate` |
| `fault <code>` | Trigger F-004 / F-007 / F-009 / F-022 / F-023 / F-026 |
| `app <appId>` | Execute a reference app scenario |
| `ai <prompt>` | Parse natural-language intent via Gemini |
