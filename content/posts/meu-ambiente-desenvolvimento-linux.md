---
title: "Meu Ambiente de Desenvolvimento no Linux"
date: 2026-06-06
draft: false
tags: ["linux", "produtividade", "backend"]
summary: "Um bate-papo descontraído sobre como configurei meu ambiente Linux para codar em Java, automatizar rotinas e turbinar minha produtividade."
---

# Por que o Linux é o meu playground de desenvolvimento

Se você é desenvolvedor (ou está no caminho para ser), sabe que o seu ambiente de trabalho é o seu templo. Depois de testar algumas opções, adotei o **Linux** como meu sistema operacional principal para estudos e automações (atualmente utilizando a distribuição Manjaro com a interface KDE Plasma). 

A flexibilidade e o controle que o Linux oferece são sensacionais. Além disso, usar Linux no meu computador de uso pessoal me aproxima da realidade dos servidores reais de produção onde minhas APIs backend em Java e containers Docker vão rodar no final do dia.

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

Configurar o Java no Linux é extremamente simples. Com o terminal aberto, a primeira coisa que faço é verificar as versões instaladas:

```bash
# Verificando a versão do runtime do Java
java --version

# E o compilador, tá ok?
javac --version
```

Caso você precise alternar entre diferentes JDKs (por exemplo, testando Java 17 no projeto da Unimed e Java 21 nos estudos), você pode gerenciar isso facilmente usando ferramentas como o **SDKMAN** ou o gerenciador de versões da sua distribuição.

> **Dica para quem está começando no Linux:**
> Manter mais de uma versão do Java instalada permite testar novos recursos da linguagem sem quebrar compatibilidade com projetos legados. Vale a pena instalar um gerenciador de SDK.

---

## Atalhos e Produtividade com Obsidian

Uma das razões de eu amar trabalhar no Linux é a facilidade de configurar atalhos globais rápidos para tudo. O meu Obsidian, por exemplo, está configurado para abrir instantaneamente com um atalho de teclado, permitindo que eu capture insights de estudo sem perder o foco do código.

Aqui está um exemplo de como estruturei minha rotina de notas sobre Java 17 usando formatação markdown:

```markdown
# Estudos Java 17
- [ ] Implementar controller de saudação
- [ ] Validar DTOs com Jakarta Validation
- [x] Configurar container PostgreSQL local com Docker Compose
```

---

## Customizando o ambiente visual no Linux

Para quem quer deixar seu ambiente desktop Linux com um visual limpo, organizado e minimalista (assim como eu fiz no meu blog!), recomendo assistir a esse guia rápido de customização visual:

{{< youtube YR2qV0n_LpM >}}

*Nota: Esse vídeo dá dicas incríveis sobre temas de ícones, fontes (como a nossa querida Roboto!) e blur de fundo para o terminal.*

---

## E agora?

Com o terminal customizado, Docker rodando e a JDK no ponto, estou pronto para codar minhas APIs REST e automatizar o que aparecer pela frente. No próximo post, vou mostrar como criei meu primeiro endpoint com Spring Boot rodando nesse ambiente. 

E você, qual sistema operacional usa para desenvolver? Deixa sua dica nos comentários!
