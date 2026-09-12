# Chapter 20: Application Compliance

**Volume IX — Application Framework & Runtime Specification (AFRS) · Working Draft v0.1**

## 20.1 Purpose

Defines requirements for DMWE-certified applications.

## 20.2 Conformance Areas

- Framework API usage.
- Security.
- Privacy.
- Accessibility.
- Resource management.
- Performance.
- User experience consistency.
- Interoperability.

## 20.3 Framework API Usage

- Applications MUST use framework abstractions.
- Direct hardware access is prohibited.
- API usage follows the contracts (Chapters 5–8).

## 20.4 Security

- Permissions honored (Chapter 14).
- Data encryption per Volume VIII, Ch 13.
- No security weakening.

## 20.5 Privacy

- Consent is respected (Volume VII, Ch 15).
- Data minimization is required.
- Audit trails are provided.

## 20.6 Accessibility

- Accessibility is default (Volume VI, Ch 14).
- Alternative modalities are mandatory.
- Accessibility is verified by testing (Chapter 17).

## 20.7 Resource Management

- Energy budgets are respected (Volume IV, Ch 13).
- Resource use is bounded.
- No resource starvation of other apps.

## 20.8 Performance

- QoS classes honored (Volume VIII, Ch 12).
- Latency budgets are met.
- Baselines are maintained.

## 20.9 User Experience Consistency

- Interaction consistency is enforced.
- UI follows the standard library (Chapter 9).
- Friction is minimized (Volume VI, Ch 11).

## 20.10 Interoperability

- Applications run across conformant devices.
- Packaging is portable (Chapter 15).
- No vendor lock-in.

## 20.11 Certification Profiles

Profiles distinguish:

- Consumer.
- Enterprise.
- Medical.
- Industrial.

Each profile adds profile-specific requirements (Volume VIII, Ch 18).

## 20.12 Declaration

- Certified applications MUST declare their profile.
- Declarations are machine-readable (Volume VII, Ch 20).
- Certification is auditable.

## 20.13 Conformance

A conformant application MUST meet all conformance areas for its certification profile.
