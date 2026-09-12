# Chapter 13: Capability Routing

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

MeshOS decides **where requests go** — which provider serves each capability request.

## 13.1 Routing Pipeline

```
Request
   ↓
Registry
   ↓
Provider Selection
   ↓
Negotiation
   ↓
Reservation
   ↓
Execution
   ↓
Response
```

| Stage | Responsibility |
|-------|----------------|
| Request | Consumer issues capability request |
| Registry | Candidates filtered by availability |
| Provider Selection | Rank by QoC and policy |
| Negotiation | Requirements/preferences applied (Chapter 7) |
| Reservation | Resources held (Volume IV, Ch 7) |
| Execution | Provider runs the capability |
| Response | Result returned |

## 13.2 Routing Policies

| Policy | Selection |
|--------|-----------|
| Nearest | Minimize physical distance |
| Fastest | Minimize latency |
| Most secure | Maximize trust/security |
| Lowest power | Minimize energy |
| Highest quality | Maximize QoC |
| Balanced | Weighted mix of the above |

- Default policy is **Balanced** unless the request specifies otherwise.
- Policy MAY be constrained by trust domains (Chapter 16).

## 13.3 Dynamic Routing

- Routes re-evaluate on: quality change, provider loss, load change.
- Re-routing MUST preserve interaction continuity (Volume IV, Ch 12).
- In-flight work migrates with Distributed Interaction State.

## 13.4 Hot Routing

- Interactive capabilities prefer co-located providers to minimize latency.
- MeshOS MAY pin a capability to a node during an interaction.

## 13.5 Policy Compliance

- Routing MUST respect:
  - Privacy classes (Chapter 4).
  - Trust domains (Chapter 16).
  - Energy budget (Volume IV, Ch 13).
  - Governance policy (Volume X).

## 13.6 Observability

- Routing decisions MUST be auditable (Chapter 17).
- Consumers see the selected provider and QoC.

## 13.7 Conformance

A conformant router MUST implement the pipeline, support all policies, re-route dynamically, and respect privacy/trust/energy constraints.
