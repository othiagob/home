---
title: "Docker: Containerizando Aplicações"
date: 2026-06-07
draft: false
tags: ["docker", "devops", "containers"]
summary: "Introdução prática ao Docker, explicando containers, vantagens e comandos básicos para começar."
---

# Docker: Containerizando Aplicações

Docker revolucionou a forma como desenvolvemos, testamos e deployamos aplicações. Neste post, vamos explorar os conceitos básicos de containers e como usar Docker.

## O que é Docker?

Docker é uma plataforma open-source que permite empacotar aplicações e suas dependências em containers leves e portáveis. Um container é como uma máquina virtual, mas muito mais eficiente.

## Vantagens do Docker

* **Portabilidade** - Execute em qualquer lugar (seu laptop, servidor, cloud)
* **Isolamento** - Aplicações isoladas em containers separados
* **Eficiência** - Menos overhead que máquinas virtuais
* **Escalabilidade** - Fácil de escalar horizontalmente

## Seu Primeiro Container

Para criar um container simples com Node.js:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

## Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `docker build -t nome .` | Constrói uma imagem |
| `docker run -p 3000:3000 nome` | Executa um container |
| `docker ps` | Lista containers em execução |
| `docker stop <id>` | Para um container |
| `docker logs <id>` | Visualiza logs |

## Resumo

Docker simplifica o processo de deployment e garante consistência entre ambientes. Se você ainda não usa, é hora de começar!

**Continua...**
