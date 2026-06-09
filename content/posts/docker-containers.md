---
title: "Docker: Containerizando uma Aplicação Spring Boot"
date: 2026-06-07
draft: false
tags: ["docker", "java", "spring-boot", "linux"]
summary: "Introdução ao Docker com um exemplo de container para uma aplicação Java criada com Spring Boot."
---

# Docker com Spring Boot

Docker ajuda a executar uma aplicação da mesma forma em diferentes ambientes. No Linux, ele também combina muito bem com o fluxo de desenvolvimento de APIs Java e Spring Boot.

## O que é Docker?

Docker é uma plataforma open source para empacotar aplicações e suas dependências em containers isolados e portáveis. Diferentemente de uma máquina virtual completa, o container compartilha o kernel do sistema hospedeiro.

## Vantagens do Docker

* **Consistência** - A mesma imagem pode ser usada no computador e no servidor
* **Isolamento** - A aplicação e suas dependências ficam agrupadas
* **Automação** - O processo de criação e execução pode ser documentado
* **Integração** - Bancos de dados e outros serviços podem ser organizados com Compose

## Dockerfile para Spring Boot

Depois de gerar o arquivo JAR com Maven, podemos criar uma imagem pequena usando uma JRE:

```dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Construindo e executando

Primeiro, gere o pacote da aplicação:

```bash
./mvnw clean package
```

Depois, construa e execute a imagem:

```bash
docker build -t minha-api .
docker run --rm -p 8080:8080 minha-api
```

## Comandos úteis

| Comando | Descrição |
|---------|-----------|
| `docker build -t minha-api .` | Constrói a imagem |
| `docker run -p 8080:8080 minha-api` | Executa a API |
| `docker ps` | Lista containers em execução |
| `docker stop <id>` | Para um container |
| `docker logs <id>` | Visualiza logs |

## Resumo

Docker torna o ambiente de uma aplicação Spring Boot mais previsível e prepara o projeto para integração com bancos de dados, pipelines e servidores Linux.
