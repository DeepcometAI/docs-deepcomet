---
title: Aurelia Language
description: Systems programming language with first-class tensor primitives and automatic differentiation.
order: 1
---

# Aurelia Language

Aurelia is a systems programming language designed for the AI-native era, featuring first-class tensor primitives and automatic differentiation built directly into the language.

## Core Features

### First-Class Tensor Primitives

```aurelia
// Tensor is a native type, not a library import
let tensor = Tensor<f32>[3, 3]

// Automatic differentiation
let grad = autodiff(tensor) { x => x * x + 2 * x + 1 }

// Neural network primitives
let layer = Linear(input=784, output=256)
let activation = ReLU(layer.output)
```

### Type System

Aurelia's type system bridges static and dynamic:

| Feature | Description |
|---------|-------------|
| `Tensor<T, Shape>` | Shape-aware tensor types |
| `Neural<T>` | Differentiable computation graph |
| `Prob<T>` | Probabilistic variables |
| `Ref<T>` | Memory-managed references |

### Memory Management

- **Ownership Model**: Zero-cost borrow checking
- **Region-based Allocation**: Predictable memory patterns
- **NPU-aware**: Direct memory mapping to neural processing units

## Example: Neural Network

```aurelia
module MNISTClassifier {
    struct Model {
        conv1: Conv2D(1, 32, kernel=3)
        conv2: Conv2D(32, 64, kernel=3)
        fc1: Linear(64*7*7, 128)
        fc2: Linear(128, 10)
    }
    
    fn forward(self, x: Tensor<f32>[28, 28]) -> Tensor<f32>[10] {
        x |> self.conv1 |> ReLU |> MaxPool(2)
          |> self.conv2 |> ReLU |> MaxPool(2)
          |> Flatten
          |> self.fc1 |> ReLU
          |> self.fc2 |> Softmax
    }
}

// Training
let model = MNISTClassifier.Model()
let optimizer = Adam(lr=0.001)

for epoch in 0..10 {
    for batch in dataset.batches(64) {
        let loss = CrossEntropy(model.forward(batch.x), batch.y)
        optimizer.step(loss.backward())
    }
}
```

## Integration with Zenith Kernel

Aurelia code compiles directly to:

1. **CPU Instructions**: Standard LLVM backend
2. **GPU Kernels**: CUDA/ROCm via MLIR
3. **NPU Bytecode**: Direct neural processing unit targeting

---

*Aurelia: Where systems meet intelligence.*
