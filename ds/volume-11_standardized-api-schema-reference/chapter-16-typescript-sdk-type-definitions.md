# Chapter 16: TypeScript SDK Type Definitions

**Volume XI — Standardized API & Schema Reference (SASR) · Working Draft v0.1**

## 16.1 Purpose

Application developers consume the platform through the **DMWE SDK** type surface (Volume IX). This chapter consolidates the TypeScript definitions that mirror the wire schemas, and demonstrates Intent-Oriented Programming (IOP).

## 16.2 SDK Root

All application-facing types are exported from a single SDK root:

```typescript
import { Verb, Target, FeedbackLevel, InteractionObject } from '@dmwe/sdk';
```

The SDK root re-exports the interface types defined in Chapters 6, 7, 10, and 11.

## 16.3 IOP Subscription API

```typescript
/** Volume IX, Ch 6: Interaction APIs */
interface InteractionSubscription {
  verb: Verb;
  modifiers?: Modifier[];
  target?: Target;
  minConfidence?: number;        // default 0.0
  contextFilter?: ContextPredicate;
}

interface DMWE {
  subscribeToIntent(
    subscription: InteractionSubscription,
    handler: (interaction: InteractionObject) => void
  ): Subscription;

  publishIntent(intent: IntentSpec): Promise<DispatchReceipt>;

  feedback: {
    trigger(providerNodeId: string, level: FeedbackLevel): void;
  };
}
```

## 16.4 Example: Semantic Subscription

```typescript
dmwe.subscribeToIntent(
  { verb: Verb.SELECT, target: Target.IOT_DEVICE },
  (interaction) => {
    if (interaction.confidence > 0.85) {
      smartLamp.toggle();
      dmwe.feedback.trigger(
        interaction.origin.providerNodeId,
        FeedbackLevel.ACKNOWLEDGE
      );
    }
  }
);
```

The application never references `FastPathStream`, `MeshEnvelope`, or specific hardware. MeshOS handles translation, routing, and delivery.

## 16.5 Capability Request API

```typescript
interface CapabilityRequest {
  capabilityId: string;          // e.g. "interaction.pointer.precision"
  version?: string;              // e.g. ">=2.0"
  requirements?: { minAccuracy?: number; maxLatencyMs?: number; privacy?: PrivacyDomain };
  preferences?: { energy?: EnergyProfile };
  fallback?: string[];           // alternative capability IDs
}
```

## 16.6 Type Stability

- The SDK type surface is versioned with the schemas (Chapter 4).
- Compile-time validation MUST reflect the authoritative Protobuf definitions.
- Generated bindings MUST be produced from the canonical schema definitions, never hand-maintained.

## 16.7 Conformance

A conformant SDK MUST expose the canonical types, honor IOP semantics, and generate its bindings from the canonical schema definitions.
