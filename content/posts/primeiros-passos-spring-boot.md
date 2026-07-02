---
title: "Primeiros Passos com Java 17 e Spring Boot 🚀"
date: 2026-06-08
draft: false
tags: ["java", "spring-boot", "backend", "tutorial"]
summary: "Uma introdução leve e descontraída ao Spring Boot, como configurar o projeto e escrever seu primeiro controller funcional."
---

# Desmistificando o Spring Boot

Muita gente que está começando no desenvolvimento backend olha para o Java e sente um frio na espinha pelo excesso de linhas de código necessários para fazer coisas simples. Mas a verdade é que, hoje em dia, o ecossistema **Java 17+** com **Spring Boot 3** é extremamente amigável, rápido e poderoso.

Neste post, vamos criar um endpoint REST simples para entender como o Spring Boot facilita a nossa vida e nos permite focar nas regras de negócio (sem ter que configurar servidores de aplicação de forma manual).

---

## ☕ Por que estou focando no ecossistema Spring?

Depois de pesquisar bastante sobre arquitetura, vi que o Java possui um mercado extremamente sólido. Estudar Spring Boot me permite:

1. **Configuração Automática (Auto-configuration)**: O framework infere quais componentes você precisa com base nas dependências declaradas no seu arquivo `pom.xml`.
2. **Servidor Embutido**: Nada de instalar Tomcat separado! A aplicação compila e roda diretamente como um arquivo `.jar` executável.
3. **Persistência Simples**: Integrar com bancos de dados relacionais usando o Spring Data JPA parece mágica de tão poucas queries manuais que precisamos escrever.

---

## 💻 Criando o Nosso Primeiro Endpoint REST

Vamos fingir que estamos criando um micro serviço para receber e validar uma saudação de faturamento (como as rotinas de contas médicas que lido no dia a dia da Unimed). 

Aqui está o código do nosso controller. Note como as anotações do Spring tornam tudo legível:

```java
package com.othiagob.blog.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SaudacaoController {

    // Responde a requisições GET em http://localhost:8080/api/faturamento
    @GetMapping("/faturamento")
    public FaturamentoStatus consultarStatus(@RequestParam(defaultValue = "Geral") String setor) {
        return new FaturamentoStatus(
            "API de Faturamento Ativa", 
            "Setor Analisado: " + setor,
            "Tudo funcionando! 🚀"
        );
    }
}

// Uma classe simples (Record) para representar nossa resposta em JSON
record FaturamentoStatus(String status, String detalhes, String mensagem) {}
```

> 💡 **Novidade do Java 16+:**
> Usei um `record` ali no final para representar o DTO (Data Transfer Object). Ele gera automaticamente construtores, getters, `equals`, `hashCode` e `toString` por baixo dos panos. Muito menos boilerplate!

---

## 🐚 Executando o Projeto no Linux

Se você criou o projeto usando o clássico [Spring Initializr](https://start.spring.org/) com o Maven Wrapper, rodar a aplicação no terminal do Manjaro (ou qualquer distro Linux) é extremamente simples.

Basta navegar até a pasta raiz do projeto e digitar no terminal:

```bash
# Permissão de execução para o wrapper, caso precise
chmod +x mvnw

# Compila e roda o servidor embutido em tempo real!
./mvnw spring-boot:run
```

Se tudo deu certo, o seu console vai mostrar o logo clássico do Spring em ASCII e a mensagem de que a aplicação subiu na porta `8080`.

---

## 🧪 Testando o endpoint na Prática

Você pode abrir o seu navegador ou usar ferramentas como o Insomnia/Postman, mas como estamos no Linux, vamos testar diretamente via comando `curl` no terminal:

```bash
# Fazendo a requisição GET
curl "http://localhost:8080/api/faturamento?setor=ContasMedicas"
```

A resposta JSON formatada que você vai receber é:

```json
{
  "status": "API de Faturamento Ativa",
  "detalhes": "Setor Analisado: ContasMedicas",
  "mensagem": "Tudo funcionando! 🚀"
}
```

---

## 🏁 O que vem pela frente?

Este é só o comecinho. Os próximos passos envolvem:

* Mapeamento de entidades com **JPA / Hibernate**;
* Persistência de dados real em um banco como o PostgreSQL;
* Autenticação e segurança de endpoints.

Se você está estudando Java ou migrando para a área de backend assim como eu, recomendo este excelente vídeo que explica o fluxo completo de funcionamento do Spring Boot por baixo dos panos:

{{< youtube 5T_nK693h0Q >}}

*Dica: Assista no 1.5x e vá anotando os conceitos chave no seu Obsidian!*

E aí, achou o Java amigável agora? Se tiver alguma dúvida ou sugestão, deixa nos comentários! Valeu! ☕💻
