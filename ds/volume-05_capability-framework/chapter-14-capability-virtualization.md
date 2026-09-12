# Chapter 14: Capability Virtualization

**Volume V — Capability Framework & Service Model · Working Draft v0.1**

Capabilities can be **virtual** — provided by software and remote infrastructure rather than local hardware.

## 14.1 Examples

```
Cloud AI → Virtual AI Capability

Remote Display → Virtual Display

Shared GPU → Virtual Compute
```

## 14.2 Purpose

- Applications cannot distinguish local from virtual providers.
- Virtualization extends capability reach without new hardware.
- It enables pooling remote and cloud resources seamlessly.

## 14.3 Virtualization Layers

- **Transport virtualization:** a remote provider is accessed through a gateway.
- **Resource virtualization:** one physical resource serves multiple consumers (shared GPU).
- **Service virtualization:** software simulates a capability (cloud AI).

## 14.4 Indistinguishability

- Virtual providers MUST present the same interface as physical providers.
- Metadata MUST truthfully mark provenance (local/remote/virtual) and QoC.
- Consumers MUST NOT behave differently by provider type.

## 14.5 QoC of Virtual Capabilities

- Virtual QoC includes network effects: added latency, jitter, bandwidth.
- Virtual capabilities MUST declare their network dependency.
- Routing MUST account for link quality (Volume IV, Ch 8).

## 14.6 Privacy & Trust

- Virtual providers may be in lower trust domains.
- Sensitive data MUST NOT be virtualized to untrusted providers (Chapter 16).
- Privacy class MUST be preserved.

## 14.7 Offline Behavior

- Virtual capabilities MUST declare offline behavior.
- Fallback to local providers MUST be automatic.

## 14.8 Conformance

A conformant virtual capability MUST present a standard interface, truthfully report provenance and QoC, respect privacy, and define offline fallback.
