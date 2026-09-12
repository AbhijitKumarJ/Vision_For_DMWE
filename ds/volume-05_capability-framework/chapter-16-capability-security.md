# Chapter 16: Capability Security

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Capability security governs who may access which capabilities and under what conditions.

## 16.1 Security Model

- **Permissions** — capability access rights per consumer.
- **Ownership** — who owns the capability/its data.
- **Authentication** — consumers and providers prove identity.
- **Trust domains** — grouping by trust class (Volume IV, Ch 14).
- **Access policies** — rules governing access.
- **Delegation** — controlled transfer of access.
- **Audit** — logging of access.
- **Privacy constraints** — data handling limits.
- **Capability sandboxing** — isolation of providers.

## 16.2 Permissions

- Access is granted per capability, not per device.
- Permissions MUST be least-privilege.
- Sensitive capabilities (camera, bio) require explicit consent.

## 16.3 Ownership

- The user owns their capabilities and data.
- Capability bindings are owned by the requesting consumer.
- Ownership transfers MUST be explicit and revocable.

## 16.4 Authentication

- Capability requests MUST be authenticated (Volume IV, Ch 14).
- High-sensitivity capabilities require strong authentication.

## 16.5 Trust Domains

- Capabilities carry a trust classification.
- Cross-domain access requires explicit policy.
- Private capabilities MUST NOT be served to untrusted consumers.

## 16.6 Access Policies

- Policies define: who, what, when, where, how.
- Policies are centralized and enforced at each node.
- Policy updates MUST be authenticated.

## 16.7 Delegation

- A consumer MAY delegate access (Chapter 10, ShareCapability).
- Delegation MUST NOT exceed the delegator's rights.
- Delegation chains MUST be bounded and auditable.

## 16.8 Audit

- All capability access MUST be logged.
- Logs MUST be tamper-evident.
- Audit data respects privacy (Volume X).

## 16.9 Privacy Constraints

- Capabilities on Private data MUST run in trusted domains.
- Data MUST NOT leak across trust boundaries.
- Bio and biometric data follow Volume III, Ch 7 rules.

## 16.10 Capability Sandboxing

- Providers run in sandboxes (Volume IV, Ch 14).
- Sandbox escapes are critical incidents.
- Marketplace capabilities are strictly sandboxed (Chapter 15).

## 16.11 Conformance

A conformant capability MUST enforce permissions, ownership, authentication, trust domains, and audit — with privacy constraints honored.
