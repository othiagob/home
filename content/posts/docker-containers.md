---
title: "Docker: O Canivete Suíço do Desenvolvimento Moderno"
date: 2026-06-07
draft: false
tags: ["docker", "infraestrutura", "linux", "backend"]
summary: "Um guia prático e sem enrolação sobre o que é o Docker, como ele salva vidas no desenvolvimento de APIs Java e um exemplo real de Dockerfile."
---

# Chega do clássico \"Na minha máquina funciona!\"

Se você já passou horas configurando um banco de dados local para rodar um projeto e depois descobriu que o deploy no servidor quebrou porque a versão do banco ou do Java era diferente, você precisa do **Docker**.

O Docker revolucionou a forma como empacotamos e distribuímos software. No desenvolvimento backend (especialmente com Java e bancos de dados), ele é indispensável. Inclusive, no meu ecossistema pessoal, uso Docker para rodar desde bancos de dados de teste até o meu laboratório local de agentes de inteligência artificial (o **Hermes + Odysseus AI**).

Neste post, vamos entender os conceitos básicos e criar um Dockerfile simples para rodar uma API Java empacotada.

---

## VM vs. Containers: Qual a diferença?

Muitos confundem containers com Máquinas Virtuais (VMs). A diferença principal é simples e impacta diretamente a performance do seu computador:

* **Máquina Virtual**: Cria um hardware virtual completo e instala um sistema operacional convidado inteiro em cima dele. Consome muita memória RAM e CPU.
* **Container**: Compartilha o kernel do sistema operacional do seu próprio computador. Ele apenas isola a aplicação e as dependências necessárias de forma lógica, rodando como um processo nativo super leve.

---

## Escrevendo o Nosso Primeiro Dockerfile para Java

Depois de compilarmos nossa aplicação Spring Boot usando o Maven e gerando o arquivo executável `.jar`, o próximo passo é criar um arquivo chamado **`Dockerfile`** (sem extensão) na raiz do projeto. 

Ele servirá como a receita de bolo para construir a nossa imagem:

```dockerfile
# 1. Escolhemos uma imagem base leve com o JRE do Java 17 instalado
FROM eclipse-temurin:17-jre-alpine

# 2. Definimos a pasta de trabalho dentro do container
WORKDIR /app

# 3. Copiamos o nosso JAR compilado da pasta target local para o container
COPY target/*.jar app.jar

# 4. Expomos a porta lógica padrão do Spring
EXPOSE 8080

# 5. O comando padrão executado ao iniciar o container
ENTRYPOINT ["java", "-jar", "app.jar"]
```

> **Dica de Infra:**
> Usei a imagem base `eclipse-temurin:17-jre-alpine`. O sufixo `-alpine` indica que ela é baseada no Alpine Linux, uma distribuição extremamente minimalista voltada para segurança e tamanho reduzido. A imagem final fica minúscula!

---

## Construindo e Executando a Imagem no Terminal

Com o Docker instalado no seu Linux, abra o terminal e execute a seguinte sequência de comandos para gerar e subir a sua aplicação containerizada:

```bash
# Passo 1: Limpar e compilar o projeto gerando o JAR atualizado
./mvnw clean package

# Passo 2: Construir a imagem Docker chamada 'meu-app-java'
docker build -t meu-app-java .

# Passo 3: Executar a imagem expondo a porta 8080 do container para a porta 8080 do seu computador
docker run --rm -p 8080:8080 meu-app-java
```

A flag `--rm` serve para que o Docker remove o container automaticamente quando ele for finalizado, evitando acumular lixo no seu disco rígido.

---

## Colinha de Comandos Docker Úteis

Para facilitar o seu dia a dia, salvei os comandos que mais uso nas minhas rotinas de testes:

| Comando | Descrição |
| :--- | :--- |
| `docker ps` | Lista os containers ativos em execução no momento. |
| `docker ps -a` | Mostra todos os containers (ativos e parados). |
| `docker stop <ID>` | Para a execução do container informado. |
| `docker rm <ID>` | Remove permanentemente um container parado. |
| `docker rmi <NOME>` | Exclui uma imagem Docker local. |
| `docker logs -f <ID>` | Acompanha a saída de logs do container em tempo real (muito útil para ver erros do Spring!). |

---

## Entenda o Docker Compose

Quando sua aplicação cresce e precisa se conectar a um banco de dados PostgreSQL e um serviço de cache Redis, subir cada container separado via `docker run` vira uma bagunça. É aí que entra o **Docker Compose**.

Se você quiser ver como orquestrar múltiplos containers de forma simples, recomendo demais esse vídeo introdutório:

{{< youtube KzcPR218fb4 >}}

---

## E você?

Já usa Docker no seu fluxo de desenvolvimento ou ainda está quebrando a cabeça configurando bancos locais no sistema? Se tiver alguma dúvida ou comentário sobre Dockerfiles, manda bala nos comentários abaixo! Até mais!
