---
title: "Introdução ao Go: Uma Linguagem Moderna e Eficiente"
date: 2026-06-08
draft: false
tags: ["go", "programação", "tutorial"]
summary: "Visão geral da linguagem Go, suas características, exemplos iniciais e motivos para estudá-la."
---

# Introdução ao Go

Go (ou Golang) é uma linguagem de programação compilada, concorrente e estaticamente tipada, desenvolvida pelo Google em 2007. Neste post, vamos explorar algumas de suas características principais.

## Por que Go?

Go foi criada para resolver problemas específicos que o Google enfrentava com outras linguagens:

1. **Velocidade de compilação** - Código compilado rapidamente
2. **Concorrência** - Suporte nativo para programação concorrente com goroutines
3. **Simplicidade** - Sintaxe clara e minimalista
4. **Performance** - Binários rápidos e eficientes

## Hello World

Vamos começar com um simples exemplo:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Goroutines

Uma das principais características do Go é suporte a goroutines, que são threads leves gerenciadas pelo runtime:

```go
package main

import (
    "fmt"
    "time"
)

func printNumbers() {
    for i := 1; i <= 5; i++ {
        fmt.Println(i)
        time.Sleep(1 * time.Second)
    }
}

func main() {
    go printNumbers()
    go printNumbers()
    
    time.Sleep(6 * time.Second)
}
```

## Conclusão

Go é uma excelente escolha para sistemas distribuídos, microserviços e ferramentas de linha de comando. Se você está procurando uma linguagem moderna e eficiente, recomendo dar uma chance ao Go!

**Até o próximo tutorial!** 💻
