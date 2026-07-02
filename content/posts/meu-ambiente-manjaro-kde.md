---
title: "Meu Ambiente de Desenvolvimento no Manjaro KDE"
date: 2026-06-06
draft: false
tags: ["linux", "manjaro", "kde", "produtividade"]
summary: "Um bate-papo descontraído sobre como configurei o Manjaro KDE Plasma para codar em Java, automatizar rotinas e turbinar minha produtividade."
---

# Por que o Manjaro KDE é o meu playground de desenvolvimento

Se você é desenvolvedor (ou está no caminho para ser), sabe que o seu ambiente de trabalho é o seu templo. Depois de testar algumas opções, adotei o **Manjaro Linux com a interface KDE Plasma** como meu sistema operacional principal para estudos e automações. 

A combinação da estabilidade da base Arch Linux (através do modelo Rolling Release) com a beleza e personalização infinita do KDE Plasma é sensacional. Além disso, me aproxima da realidade dos servidores reais de produção onde minhas APIs backend em Java e agentes Docker vão rodar.

---

## Minha Caixa de Ferramentas Principal

Para transformar café em código Java e automatizações úteis, estas são as ferramentas que rodam no meu dia a dia:

| Categoria | Ferramenta | O que eu faço com ela? |
| :--- | :--- | :--- |
| **Linguagem & SDK** | `Java 17 / 21` (via SDKMAN) | O motor das minhas APIs e sistemas. |
| **IDE** | `IntelliJ IDEA` | Minha central de comando para desenvolver projetos Spring Boot. |
| **Banco de Dados** | `DBeaver` | Onde gerencio minhas queries SQL e analiso estruturas relacionais. |
| **Containers** | `Docker & Docker Compose` | Indispensável para rodar bancos locais, testar deploys e subir meu ecossistema de agentes IA. |
| **Produtividade** | `Obsidian` | Onde anoto absolutamente tudo, organizando meus guias e roteiros de estudo. |
| **Terminal** | `Konsole` | Onde a mágica do shell script e do Git acontece. |

---

## Deixando o Ambiente Ready para Java

Configurar o Java no Manjaro é extremamente simples. Com o terminal aberto no meu **Konsole**, a primeira coisa que faço é verificar as versões instaladas:

```bash
# Verificando a versão do runtime do Java
java --version

# E o compilador, tá ok?
javac --version
```

Como o Manjaro é baseado em Arch, caso você precise alternar entre diferentes JDKs (por exemplo, testando Java 17 no projeto da Unimed e Java 21 nos estudos), você pode gerenciar isso facilmente com:

```bash
# Consultando o status dos ambientes Java instalados
archlinux-java status
```

> **Dica para quem está começando no Linux:**
> O comando `archlinux-java` permite alternar a versão do Java global com apenas uma linha. Por exemplo: `sudo archlinux-java set java-17-openjdk`. Prático e sem dor de cabeça!

---

## O "Fator KDE" e a Produtividade com Obsidian

Uma das razões de eu amar o KDE Plasma é que ele permite que eu configure atalhos globais rápidos para tudo. O meu Obsidian, por exemplo, está configurado para abrir instantaneamente com um atalho de teclado, permitindo que eu capture insights de estudo sem perder o foco do código.

Aqui está um exemplo de como estruturei minha rotina de notas sobre Java 17 usando formatação markdown:

```markdown
# Estudos Java 17
- [ ] Implementar controller de saudação
- [ ] Validar DTOs com Jakarta Validation
- [x] Configurar container PostgreSQL local com Docker Compose
```

---

## Como customizar o KDE Plasma do zero?

Para quem quer deixar o Manjaro com um visual limpo e minimalista (assim como eu fiz no meu blog!), recomendo assistir a esse guia rápido de customização visual do KDE:

{{< youtube YR2qV0n_LpM >}}

*Nota: Esse vídeo dá dicas incríveis sobre temas de ícones, fontes (como a nossa querida Roboto!) e blur de fundo para o terminal.*

---

## E agora?

Com o terminal customizado, Docker rodando e a JDK no ponto, estou pronto para codar minhas APIs REST e automatizar o que aparecer pela frente. No próximo post, vou mostrar como criei meu primeiro endpoint com Spring Boot rodando nesse ambiente. 

E você, qual distro Linux ou sistema operacional usa para desenvolver? Deixa sua dica nos comentários!
