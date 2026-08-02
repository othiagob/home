# Blog Thiago Borghardt

Blog estático feito com Hugo e o tema Archie.

## Executar localmente

O projeto usa Hugo `0.147.9` e uma revisão fixa do Archie. Existem duas formas
de rodar: com o binário Hugo local ou com Docker (recomendado — não precisa
instalar nada além do Docker).

### Com Docker (recomendado)

Pré-requisito: Docker com o plugin Compose v2 (`docker compose version`).

```bash
# Sobe o servidor de desenvolvimento em http://localhost:1313/home/
docker compose up

# Em background
docker compose up -d

# Acompanhar os logs
docker compose logs -f

# Parar
docker compose down
```

Para gerar o site de produção dentro do container (resultado em `public/`):

```bash
docker compose run --rm blog --gc --minify
```

Como funciona: a imagem oficial `ghcr.io/gohugoio/hugo:v0.147.9` já inclui git,
nodejs, npm e dart-sass. O entrypoint do projeto (`scripts/docker-entrypoint.sh`)
roda `scripts/setup-theme.sh` (que baixa o Archie na revisão pinada em
`themes/archie/`) e depois executa o Hugo. Como `themes/` é gitignored, o clone
acontece dentro do container e nunca vai para o Git.

### Com Hugo local

Se o Hugo `0.147.9` (extended) estiver instalado no PATH, os comandos do Makefile
usam o binário local:

```bash
make serve   # http://localhost:1313/home/
make build   # gera public/
```

O comando `make setup` pode ser usado separadamente para baixar apenas o tema em
`themes/archie/`.
