# Chapter 5: Interaction Taxonomy

**Volume VI — Human Interaction Framework (HIF) · Working Draft v0.1**

## 5.1 Standardized Categories

### Navigation
Scroll, Pan, Move, Zoom, Rotate, Jump

### Selection
Point, Click, Select, Multi-select, Lasso, Focus

### Manipulation
Move, Resize, Transform, Align, Arrange, Copy, Paste

### Communication
Speak, Dictate, Translate, Share, Notify, Collaborate

### Creation
Draw, Write, Sketch, Annotate, Compose, Generate

### Authentication
Identify, Verify, Authorize, Confirm, Reject

### Spatial
Anchor, Measure, Map, Locate, Track, Project

## 5.2 Category Definitions

Each interaction type defines:

- **Semantic meaning** — what it does.
- **Behavior** — expected system response.
- **Metadata** — defaults, qualifiers.
- **Physical mappings** — supported expressions (Chapter 6).
- **Required capabilities** — for execution.

## 5.3 Example: Navigation

| Interaction | Meaning | Required |
|-------------|---------|----------|
| Scroll | Move content vertically/horizontally | Pointer or Touch |
| Pan | Move the view | Pointer or Gesture |
| Move | Translate the subject | Pointer or Manipulation |
| Zoom | Change scale | Pinch or Voice |
| Rotate | Change orientation | Rotation gesture or Voice |
| Jump | Move directly to a location | Voice or Search |

## 5.4 Example: Authentication

| Interaction | Meaning | Required |
|-------------|---------|----------|
| Identify | Establish identity | Authentication capability |
| Verify | Confirm identity | Secure element |
| Authorize | Grant access | Trust policy |
| Confirm | Explicit user consent | Any input |
| Reject | Refuse access | Any input |

## 5.5 Cross-Category Use

- One physical expression may map to different categories by context (Chapter 9).
- Interactions MAY belong to multiple categories for discovery.

## 5.6 Conformance

A conformant implementation MUST recognize the standard taxonomy categories and their defined behaviors.
