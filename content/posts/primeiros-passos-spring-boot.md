---
title: "Primeiros Passos com Java e Spring Boot"
date: 2026-06-08
draft: false
tags: ["java", "spring-boot", "backend", "tutorial"]
summary: "Uma introdução ao Spring Boot, sua estrutura básica e a criação de um primeiro endpoint REST com Java."
---

# Primeiros passos com Spring Boot

Spring Boot simplifica a criação de aplicações Java ao oferecer configuração automática, servidor web integrado e uma estrutura preparada para projetos backend.

## Por que estou estudando Spring Boot?

Java possui um ecossistema sólido e é muito usado em aplicações corporativas. Com Spring Boot, posso aplicar os fundamentos da linguagem enquanto aprendo a desenvolver APIs REST e serviços organizados.

1. **Configuração automática** - Reduz boa parte da configuração manual
2. **Servidor integrado** - A aplicação pode ser executada diretamente
3. **Ecossistema** - Integração com bancos de dados, segurança e testes
4. **Organização** - Incentiva a separação de responsabilidades

## Primeiro endpoint

Este controller responde a uma requisição em `/api/saudacao`:

```java
package com.othiagob.blog.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SaudacaoController {

    @GetMapping("/saudacao")
    public String saudacao() {
        return "Olá, Spring Boot!";
    }
}
```

## Executando no Linux

Em um projeto criado com Maven Wrapper, posso iniciar a aplicação pelo terminal:

```bash
./mvnw spring-boot:run
```

O endpoint ficará disponível em:

```text
http://localhost:8080/api/saudacao
```

## Próximos estudos

Os próximos passos são aprender injeção de dependências, validação, tratamento de erros, Spring Data JPA e testes automatizados.
