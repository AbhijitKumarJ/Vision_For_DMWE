# Chapter 14: Security Manager

**Volume IV — Mesh Operating System (MeshOS) · Working Draft v0.1**

The Security Manager provides operating-system-level security across the mesh. Policy/governance is in Volume X; this chapter defines the OS security machinery.

## 14.1 Responsibilities

- **Identity** — node and user identity management.
- **Authentication** — mutual node/app authentication.
- **Authorization** — access control for resources/capabilities.
- **Secure channels** — encrypted, authenticated communication.
- **Permissions** — per-app and per-service permission sets.
- **Capability access** — controlled capability invocation.
- **Encryption** — at-rest and in-transit protection.
- **Sandboxing** — application isolation.
- **Trust domains** — grouping by trust class.
- **Secure execution** — verified boot, secure element usage.
- **Policy enforcement** — central policy application.
- **Threat monitoring** — continuous threat detection and response.

## 14.2 Threat Model & Attack Surface

### 14.2.1 Threat Actors

| Actor | Capability | Motivation | Trust Level |
|-------|-----------|------------|-------------|
| **External Eavesdropper** | Passive radio interception | Data theft, surveillance | None |
| **Rogue Node** | Active radio, limited compute | Capability spoofing, MITM | None |
| **Compromised Module** | Full node access | Persistent infiltration | Initially trusted |
| **Malicious Application** | Sandbox escape attempts | Data exfiltration, control | Application-level trust |
| **Insider (physical)** | Physical access to devices | Tampering, key extraction | Physical proximity |
| **Collaborative Adversary** | Multiple coordinated actors | Large-scale disruption | Varies |
| **State-Level Actor** | Unlimited resources, time | Long-term surveillance | Advanced persistent threat |

### 14.2.2 Attack Vectors & Mitigations

| ID | Attack Vector | Target | Severity | Mitigation |
|----|---------------|--------|----------|------------|
| **ATK-001** | **Radio eavesdropping** | BLE/UWB/Wi-Fi traffic | High | End-to-end encryption on all channels (§14.5); frequency hopping; BLE privacy features |
| **ATK-002** | **Man-in-the-middle** | Node-to-node links | Critical | Mutual authentication (§14.3); certificate pinning; challenge-response on join |
| **ATK-003** | **Node impersonation** | Mesh formation | Critical | Hardware-backed identity (§14.8); secure element attestation; trust chain verification |
| **ATK-004** | **Capability spoofing** | Capability advertisements | High | Signed capability advertisements; Capability Manager validates signatures before registration |
| **ATK-005** | **State injection** | Distributed state (Ch 12) | Critical | Authenticated state updates; version vectors; CRC validation; write access control |
| **ATK-006** | **Replay attack** | Any protocol message | High | Timestamp validation; nonce-based challenge; sequence numbers on all messages |
| **ATK-007** | **Key extraction** | Secure elements | Critical | Tamper-resistant hardware; key wrapping; secure key derivation; no raw key export |
| **ATK-008** | **Sandbox escape** | Application isolation | Critical | Memory-safe runtime; capability-based IPC; no shared memory between sandboxes |
| **ATK-009** | **Denial of service** | Communication Manager | High | Rate limiting; admission control; priority-based queuing; degraded mode fallback |
| **ATK-010** | **Energy exhaustion** | Battery-powered nodes | Medium | Energy budget enforcement (Ch 13); background task throttling; user notification |
| **ATK-011** | **Physical tampering** | Device hardware | High | Tamper detection sensors; secure boot; key zeroization on tamper event |
| **ATK-012** | **Firmware downgrade** | OTA updates (Ch 20) | High | Signed firmware; version anti-rollback; secure boot chain validation |
| **ATK-013** | **Context poisoning** | Context Graph (Volume VII) | High | Authenticated context facts; source validation; confidence threshold enforcement |
| **ATK-014** | **Capability fusion manipulation** | Intent Engine | High | Input validation on sensor data; confidence bounds; fusion algorithm integrity checks |
| **ATK-015** | **Cross-domain escalation** | Trust domains (§14.7) | Critical | Explicit cross-domain policy; no implicit trust; revocable grants; audit logging |
| **ATK-016** | **Session hijacking** | Active interactions | High | Session tokens; re-authentication on anomaly; session timeout enforcement |
| **ATK-017** | **Metadata leakage** | Protocol headers | Medium | Minimal metadata exposure; traffic padding; timing attack resistance |
| **ATK-018** | **Rogue Primary Node** | Mesh governance | Critical | Election protocol validation (Ch 4); fitness score verification; quorum requirements |
| **ATK-019** | **Fast-Path token abuse** | Direct stream channels | High | Token expiration; single-use tokens; revocation within one latency budget |
| **ATK-020** | **Supply chain compromise** | Module firmware | Critical | Secure boot chain; firmware attestation; vendor signing keys; provenance tracking |

### 14.2.3 Attack Surface Map

```
┌─────────────────────────────────────────────────────┐
│                   ATTACK SURFACE                     │
├──────────────────┬──────────────────────────────────┤
│ RADIO SURFACE    │ BLE, UWB, Wi-Fi, E-thread        │
│                  │ → ATK-001, ATK-002, ATK-006      │
├──────────────────┼──────────────────────────────────┤
│ PHYSICAL SURFACE │ Buttons, ports, tamper sensors    │
│                  │ → ATK-011, ATK-007               │
├──────────────────┼──────────────────────────────────┤
│ PROTOCOL SURFACE │ Mesh formation, capability advert │
│                  │ → ATK-003, ATK-004, ATK-018      │
├──────────────────┼──────────────────────────────────┤
│ APPLICATION      │ Sandboxes, APIs, plugins          │
│ SURFACE          │ → ATK-008, ATK-014               │
├──────────────────┼──────────────────────────────────┤
│ STATE SURFACE    │ Distributed state, context graph  │
│                  │ → ATK-005, ATK-013               │
├──────────────────┼──────────────────────────────────┤
│ UPDATE SURFACE   │ OTA, firmware, schema registry    │
│                  │ → ATK-012, ATK-020               │
├──────────────────┼──────────────────────────────────┤
│ ENERGY SURFACE   │ Battery, power management         │
│                  │ → ATK-010                        │
└──────────────────┴──────────────────────────────────┘
```

### 14.2.4 Security Design Principles

1. **Least privilege** — every module, app, and node operates with minimum required permissions.
2. **Defense in depth** — no single security mechanism is sole barrier; layered defenses.
3. **Fail secure** — on failure, system defaults to deny, not permit.
4. **No security by obscurity** — all mechanisms are publicly specified; security depends on keys, not secrecy.
5. **Auditability** — all security-relevant events are logged with immutable timestamps.
6. **Revocability** — all grants, tokens, and trust can be revoked at any time.
7. **Forward secrecy** — session keys do not compromise past or future sessions.

### 14.2.5 Threat Response Procedures

| Severity | Response Time | Actions |
|----------|---------------|---------|
| **Critical** | ≤ 30 s | Quarantine affected node; revoke all tokens; force re-authentication; notify user; log incident |
| **High** | ≤ 5 min | Isolate affected capability; migrate tasks; notify user; begin investigation |
| **Medium** | ≤ 1 hour | Log event; monitor for escalation; apply patches if available |
| **Low** | Best-effort | Log event; include in periodic security review |

## 14.2 Identity

- Every node has a unique, immutable identity (Chapter 3).
- User identity is bound across the user's modules.
- Identities MUST be verified through the trust chain.

## 14.3 Authentication

- Node join uses mutual authentication (Chapter 4).
- App/service invocations authenticate per call.
- Guest devices authenticate with limited credentials.

## 14.4 Authorization

- Access control is capability-based (Volume V).
- Authorization decisions follow trust domains and permissions.
- Denials MUST be logged (auditable).

## 14.5 Secure Channels

- All mesh communication MUST use secure channels.
- Interactive data MAY use lighter security at negotiated levels.
- Sensitive data (bioelectric, biometric, financial) MUST use strong end-to-end encryption.

## 14.6 Sandboxing

- Applications run in sandboxes (Chapter 3).
- Sandboxes MUST isolate memory, files, and devices.
- Escapes MUST be treated as critical incidents.

## 14.7 Trust Domains

| Domain | Contents | Example |
|--------|----------|---------|
| Personal | User's own modules/apps | My ring, my phone |
| Shared | Shared devices with consent | Family hub |
| Guest | Temporary external devices | Friend's phone |
| Public | Untrusted infrastructure | Public IoT |

- Cross-domain access REQUIRES explicit, revocable policy.

## 14.8 Data Classification Taxonomy

All data flowing through the mesh MUST be classified according to this taxonomy. Classification determines encryption, retention, access control, and audit requirements.

### 14.8.1 Classification Tiers

| Tier | Label | Description | Examples | Encryption | Retention |
|------|-------|-------------|----------|------------|-----------|
| **T0** | Public | Non-sensitive, publicly available | Time, weather, public APIs | Optional | Unlimited |
| **T1** | Internal | System operational data, not user-specific | Topology, routing tables, capability advertisements | At-rest recommended | 30 days |
| **T2** | Personal | User-specific but non-sensitive | App preferences, UI layout, interaction history | At-rest required | User-controlled |
| **T3** | Sensitive | User-specific, moderate sensitivity | Location history, activity patterns, usage analytics | At-rest + in-transit required | 90 days max |
| **T4** | Confidential | High-sensitivity personal data | Biometric templates, voiceprints, gait models | Strong encryption required | Session-only or user-deleted |
| **T5** | Restricted | Critical/safety data | Medical telemetry, financial data, authentication keys | End-to-end encryption mandatory | Minimal, audit-logged |

### 14.8.2 Classification Rules

- Data MUST be classified at creation time by the originating capability.
- Classification MUST NOT be downgraded without user consent.
- Aggregated data inherits the highest classification of its constituents.
- Derived data (inferences, models) inherits the highest classification of source data.
- Metadata inherits the classification of the data it describes.

### 14.8.3 Access Control by Tier

| Tier | Read Access | Write Access | Delete Access |
|------|-------------|--------------|---------------|
| T0 Public | Any node | Originating capability | Originating capability |
| T1 Internal | Any authenticated node | MeshOS components | Primary Node |
| T2 Personal | User's nodes only | User's applications | User |
| T3 Sensitive | User's nodes + authorized apps | User's applications | User |
| T4 Confidential | User's nodes only | Originating capability | User only |
| T5 Restricted | User only | System-critical components | User + system audit |

### 14.8.4 Encryption Requirements

| Tier | At-Rest | In-Transit | Key Management |
|------|---------|------------|----------------|
| T0 | Optional | Optional | N/A |
| T1 | AES-128 | TLS 1.3 or equivalent | Node-local |
| T2 | AES-256 | TLS 1.3 or equivalent | Node-local + backup |
| T3 | AES-256 | E2E encrypted | Secure element preferred |
| T4 | AES-256 + key wrapping | E2E encrypted, forward secrecy | Secure element required |
| T5 | AES-256 + key wrapping + HSM | E2E encrypted, forward secrecy, no downgrade | HSM or secure element mandatory |

### 14.8.5 Data Lifecycle

```
Creation → Classification → Storage → Use → Sharing → Retention → Deletion
   ↓           ↓              ↓        ↓       ↓          ↓           ↓
Classify   Encrypt        Access   Audit   Consent   Timer/Policy  Secure
at source  per tier       control  log     required  enforced      wipe
```

## 14.8 Secure Execution

- Verified boot chain (Volume III, Ch 12).
- Key material in secure elements where present.
- Sensitive computation MAY use trusted execution environments.

## 14.9 Policy Enforcement

- Policy is centralized and distributed to nodes.
- Policy updates MUST be authenticated.
- Enforcement MUST be non-bypassable by applications.

## 14.10 Conformance

A conformant Security Manager MUST:

1. Manage identities and mutual authentication.
2. Enforce capability-based authorization.
3. Provide secure channels and sandboxing.
4. Implement trust domains with explicit cross-domain policy.
5. Enforce centralized, authenticated policy.
