---
title: SkyCloud
description: Decentralized cloud network for sharing idle NPU power and collaborative AI training.
order: 2
---

# SkyCloud

SkyCloud is a decentralized cloud network that allows devices to share idle NPU power for collaborative AI training and inference.

## Core Concepts

### Decentralized Compute

SkyCloud turns every device into a potential compute node:

- **Idle NPUs**: Share when not in use
- **Privacy Preserving**: Federated learning, data never leaves device
- **Token Rewards**: Earn SkyTokens for compute contributions

### Network Architecture

```
┌─────────────────────────────────────────┐
│           SkyCloud Network             │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Device  │  │ Device  │  │ Device  │ │
│  │  (NPU)  │  │  (NPU)  │  │  (NPU)  │ │
│  └────┬────┘  └────┬────┘  └────┬────┘ │
│       │            │            │      │
│       └────────────┴────────────┘      │
│                   │                     │
│         ┌─────────▼─────────┐         │
│         │   Orchestrator    │         │
│         │  (DeepComet-1B)   │         │
│         └───────────────────┘         │
└─────────────────────────────────────────┘
```

## Use Cases

### Collaborative Training

Train large models across thousands of devices:

```python
# SkyCloud training job
job = SkyCloud.Job({
    model: "deepcomet-7b",
    dataset: "web_corpus_v3",
    nodes: 1000,
    privacy: "differential_privacy",
    reward: "sky_tokens"
})

job.start()
```

### Inference at Scale

Distributed inference for low latency:

```python
# Deploy model to edge
endpoint = SkyCloud.deploy({
    model: "deepcomet-1b",
    regions: ["us-east", "eu-west", "ap-south"],
    min_latency: "10ms"
})
```

## Token Economics

| Action | Reward | Cost |
|--------|--------|------|
| 1 hour NPU time | 100 ST | - |
| 1GB bandwidth | 10 ST | - |
| Training job | - | 1000 ST/hour |
| Inference | - | 10 ST/request |

## Roadmap

1. **Testnet**: Q4 2026 — Beta network with 100 nodes
2. **Mainnet**: Q2 2027 — Production network launch
3. **Scale**: Q4 2027 — 10,000+ active nodes

---

*The world's compute, shared.*
