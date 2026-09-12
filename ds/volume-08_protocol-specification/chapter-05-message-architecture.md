# Chapter 5: Message Architecture

**Volume VIII — Distributed Communication & Protocol Specification (DCPS) · Working Draft v0.1**

## 5.1 Standard Structure

Every protocol message follows a standard structure. Payloads are defined separately from transport encoding.

## 5.2 Header Fields

| Field | Purpose |
|-------|---------|
| Header | Magic + format marker |
| Version | Protocol version |
| Message ID | Unique message identifier |
| Timestamp | Mesh-synchronized time (Chapter 11) |
| Sender | Source module identity |
| Receiver | Destination module/group |
| Session ID | Associated session (Chapter 4) |
| Payload Type | Encoded payload kind |
| Priority | Scheduling priority |
| Security Flags | Integrity/encryption status |
| Checksum | Frame integrity |

## 5.3 Payload Types

- **Command** — request an action.
- **Response** — reply to a command.
- **Event** — asynchronous notification.
- **Capability** — advertisement/update (Chapter 7).
- **Interaction** — semantic interaction event (Chapter 8).
- **Context** — context fact synchronization (Chapter 9).
- **Resource** — resource coordination (Chapter 10).
- **Management** — diagnostics/telemetry (Chapter 16).

## 5.4 Semantic Addressing

- Messages MAY address by **Capability ID**, **Interaction Object**, or **Context Reference** instead of raw device address.
- Semantic addressing resolves through the Protocol Graph (§1.7).
- Raw device addressing remains supported for compatibility.

## 5.5 Message Flow

- **Request/Response:** synchronous with correlation ID.
- **Publish/Subscribe:** routed to subscribers (Chapter 12).
- **Fire-and-Forget:** no reply expected.

## 5.6 QoS Marking

- Each message carries a QoS Class (Chapter 12).
- Priority and reliability derive from the class.
- Marking MAY NOT be altered by intermediate hops.

## 5.7 Security Marking

- Messages are integrity-protected by default.
- Sensitive payloads are encrypted (Chapter 13).
- Security flags MUST be verifiable.

## 5.8 Message IDs & Idempotency

- Message IDs enable deduplication (Chapter 14).
- Commands SHOULD be idempotent where possible.
- Duplicate detection MUST NOT produce duplicate effects.

## 5.9 Protocol Graph & Semantic Messages

A semantic message expresses relationships, e.g.:

> "Interaction *Select* requires *Pointer* capability, executed under *Office Context*, using *Trusted Local Domain*, with *Real-Time QoS*."

- Such messages carry references to the relevant graphs.
- Receivers resolve references locally or via the mesh.
- Unresolvable references MUST be reported and retried.

## 5.10 Conformance

A conformant message implementation MUST support the standard header, payload types, semantic addressing, QoS marking, and security flags.
