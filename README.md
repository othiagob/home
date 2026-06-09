# Blog Thiago Borghardt

Blog estático feito com Hugo e o tema Archie.

## Executar localmente

O projeto usa Hugo `0.147.9` e uma revisão fixa do Archie. Se o Hugo estiver
instalado, os comandos usam o binário local. Caso contrário, usam Docker.

```bash
make serve
```

Abra `http://localhost:1313/home/`.

Para gerar o site de produção:

```bash
make build
```

O resultado será criado em `public/`. O comando `make setup` pode ser usado
separadamente para baixar apenas o tema em `themes/archie/`.
