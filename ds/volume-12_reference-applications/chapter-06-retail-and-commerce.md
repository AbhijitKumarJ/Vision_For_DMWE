# Chapter 6: Retail & Commerce

**Volume XII — Reference Applications · Working Draft v0.1**

## 6.1 Point-and-Pay

**Problem:** Friction at checkout.

- **Capabilities:** `Precision Pointer`, `Secure Authentication`, `Transaction`.
- **Grammar:** `Point` + `Double_Tap` → Select & Pay.
- **Context:** Proximity to POS (UWB).
- **Trust:** Private domain for payment token.
- **Experience:** Point at an item from a distance, confirm with a micro-gesture.

## 6.2 Flow

1. UWB proximity establishes checkout context.
2. User points at the target (Precision Pointer).
3. Double-tap confirms selection.
4. Payment token issued in the Private trust domain.
5. Transaction completes via the merchant IBN.

## 6.3 Security Requirements

- Authentication MUST be secure (Volume VIII, Ch 13).
- Payment tokens MUST stay in the Private trust domain (Volume IV, Ch 14).
- Consent is explicit for each transaction.

## 6.4 Common Patterns

- Distance interaction replaces physical touch.
- Trust domains protect sensitive data.
- Micro-gestures provide confirmation.

## 6.5 Conformance

This application demonstrates conformant commerce patterns: precision pointing, secure authentication, and trust-domain isolation.
