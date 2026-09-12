# Chapter 2: Human Interaction Language (HIL)

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

## 2.1 Interaction as a Language

Just as a programming language lets software communicate with computers, the **Human Interaction Language** lets humans communicate with the distributed ecosystem.

HIL is a **semantic interaction language**: users express intent; the system interprets it.

## 2.2 Structure of an Interaction

Every interaction contains:

```
Verb
Modifier
Target
Context
Priority
Confidence
```

## 2.3 Example

```
Select
  ↓
Current Object
  ↓
Precise
  ↓
High Confidence
```

| Element | Value |
|---------|-------|
| Verb | Select |
| Target | Current Object |
| Modifier | Precise |
| Confidence | High |

## 2.4 Why a Language, Not a Gesture List

- Instead of defining hundreds of gestures, HIL defines a **reusable grammar** (Chapter 3).
- New physical inputs map onto the same grammar.
- Applications understand semantics, not specific gestures.

## 2.5 Language Properties

| Property | Requirement |
|----------|-------------|
| Expressive | Covers all user intent |
| Unambiguous | Clear meaning per interaction |
| Learnable | Intuitive to acquire |
| Composable | Interactions combine (Chapter 7) |
| Extensible | New verbs/targets addable |
| Context-sensitive | Meaning adapts (Chapter 9) |

## 2.6 The HIL Pipeline

1. Physical expression (Chapter 6).
2. Recognition.
3. Parsing into Verb + Modifier + Target.
4. Contextual interpretation (Chapter 9).
5. Interaction Object emission (Chapter 4).

## 2.7 Conformance

A conformant HIL implementation MUST parse interactions into the standard structure and emit Interaction Objects.
