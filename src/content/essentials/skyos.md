---
title: SkyOS
description: Generative OS powered by Large Action Models and the Semantic File System.
order: 3
---

# SkyOS

SkyOS is a generative operating system that uses Large Action Models (LAMs) to understand user intent and automatically compose system behaviors.

## Core Concepts

### Semantic File System

Traditional filesystems organize by path. SkyOS organizes by meaning:

```skyos
// Files have semantic descriptions, not just names
document "Q3 Financial Report" {
    type: spreadsheet,
    created: 2026-07-15,
    tags: [finance, quarterly, 2026],
    content: semantic_embedding
}

// Query by intent, not location
find documents about "revenue growth last year"
```

### Generative Interface

SkyOS generates interfaces based on context:

- **Voice Commands**: "Show me memory usage trends"
- **Gestures**: Draw a circle to group files
- **Predictive**: Auto-opens apps based on schedule

## Large Action Models

SkyOS is powered by a 3B parameter LAM:

| Capability | Description |
|-----------|-------------|
| Intent Parsing | Natural language to system actions |
| UI Generation | Dynamic interface creation |
| Context Awareness | Location, time, user history |
| Multi-modal | Voice, text, gesture input |

## Architecture

```
┌─────────────────────────────────────────┐
│           SkyOS Architecture             │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │   LAM   │  │  Intent  │  │  Gener.  │ │
│  │  Core   │  │  Parser  │  │  Engine  │ │
│  └────┬────┘  └────┬────┘  └────┬────┘ │
│       │            │            │      │
│       └────────────┴────────────┘      │
│                   │                     │
│         ┌─────────▼─────────┐         │
│         │   Zenith Kernel    │         │
│         └───────────────────┘         │
└─────────────────────────────────────────┘
```

## Roadmap

1. **Preview**: Q4 2026 — Developer preview with basic LAM
2. **Beta**: Q2 2027 — Full semantic filesystem
3. **Release**: Q4 2027 — Consumer-ready generative OS

---

*SkyOS: The OS that understands you.*
