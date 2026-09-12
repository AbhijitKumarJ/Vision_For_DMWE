# Chapter 13: Collaborative Interaction

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

Defines interactions involving multiple users and shared devices.

## 13.1 Examples

- Shared selection
- Collaborative annotation
- Distributed presentations
- Team spatial workspaces
- Remote assistance
- Robot collaboration

## 13.2 Collaborative Model

- Each participant interacts through their own mesh.
- Interactions merge in a shared workspace.
- Coordination happens through a shared Interaction Graph.

## 13.3 Shared Ownership

- Workspace objects have owners.
- Ownership grants modification rights.
- Shared objects have defined collaboration rights.

## 13.4 Conflict Resolution

- Concurrent edits resolve by:
  - Ownership priority.
  - Timestamp ordering.
  - Explicit arbitration.
- Conflicts MUST be resolved deterministically.

## 13.5 Interaction Locking

- Exclusive interactions (e.g., "present") lock the workspace.
- Locks MUST be revocable by the owner.
- Lock duration MUST be bounded.

## 13.6 Permissions

- Permissions per participant: view, annotate, edit, present, share.
- Permissions follow trust domains (Volume IV, Ch 14).
- Permission changes propagate immediately.

## 13.7 Session Management

- Collaboration sessions have: participants, roles, state, lifetime.
- Sessions persist across device changes (Volume IV, Ch 12).
- Sessions MUST support graceful handoff.

## 13.8 Remote Assistance

- A helper may take temporary control with consent.
- Assistance is fully observable and revocable.

## 13.9 Conformance

A conformant collaborative implementation MUST support shared ownership, conflict resolution, locking, permissions, and sessions.
