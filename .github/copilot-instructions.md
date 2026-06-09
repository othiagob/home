# Instruções únicas para o GitHub Copilot — Reparar e reorganizar o Blog Hugo

## Contexto do problema

O projeto é um blog Hugo usando o tema `archie`, publicado via GitHub Pages.
O layout foi quebrado após alterações visuais. O comportamento atual indica que o Hugo/tema não está aplicando corretamente os layouts e estilos.

Antes de alterar qualquer coisa, trate esta tarefa como **reparo de arquitetura e restauração do tema**, não como apenas troca de CSS.

## Objetivo final

Restaurar o funcionamento correto do blog Hugo, mantendo:

- nome correto: `Thiago Borghardt`;
- marca visual curta: `OTB`;
- paleta azul no lugar de vermelho/rosa/verde chamativo;
- home organizada, mostrando cards/listagem limpa dos posts;
- conteúdo fácil de manter;
- nenhuma alteração direta dentro de `themes/archie`;
- build Hugo funcionando sem erro;
- publicação via GitHub Pages preservada.

---

# 1. Regras obrigatórias antes de editar

Siga estas regras para evitar quebrar o tema novamente:

1. **Não edite arquivos dentro de `themes/archie/`**.  
   O tema é baixado no GitHub Actions durante o deploy. Qualquer edição dentro de `themes/archie` será perdida ou causará inconsistência.

2. **Não crie partials completos sem copiar o original do tema**.  
   Um partial Hugo como `layouts/partials/header.html` não deve conter `<!doctype html>`, `<html>`, `<head>` nem `<body>`, a menos que o partial original do tema também contenha isso.

3. **Não force links manuais para CSS em partials improvisados**, especialmente caminhos como:

```html
<link rel="stylesheet" href="{{ "assets/css/dark.css" | relURL }}">
<link rel="stylesheet" href="{{ "themes/archie/assets/css/main.css" | relURL }}">
```

Esses caminhos podem não existir em `public/` porque `assets/` é usado pelo Hugo Pipes e não é publicado diretamente como pasta estática.

4. **Use overrides mínimos e seguros**:
   - layout override somente quando necessário;
   - CSS customizado em um local previsível;
   - front matter limpo em todos os `.md`.

5. Ao final, rode obrigatoriamente:

```bash
hugo --gc --minify
```

Se falhar, corrija antes de finalizar.

---

# 2. Diagnóstico do estado atual

Corrija primeiro estes problemas encontrados no repositório atual.

## 2.1. `content/about.md` está quebrado

O arquivo atual começa com front matter duplicado:

```markdown
---
---
title: "Sobre mim"
```

Também existe um `---` extra no final do arquivo.

Isso precisa ser corrigido para existir **somente um bloco de front matter no início**.

## 2.2. `layouts/partials/header.html` está quebrando a estrutura do tema

O arquivo atual contém um documento HTML completo dentro de um partial:

```html
<!doctype html>
<html lang="{{ .Site.LanguageCode }}">
<head>
...
<body>
...
```

Isso não deve existir nesse override. Esse arquivo provavelmente é a principal causa do blog carregar sem layout correto.

## 2.3. CSS está sendo tratado de forma insegura

O projeto possui `assets/css/dark.css` e `assets/css/extended.css`. O tema Archie pode usar Hugo Pipes para carregar assets, então nem todo arquivo novo em `assets/css/` é carregado automaticamente.

Portanto, não dependa de `extended.css` ser carregado sozinho, a menos que o template do tema realmente faça isso.

---

# 3. Ordem correta de correção

Aplique as etapas abaixo exatamente nesta ordem.

---

# 4. Restaurar funcionamento base do tema

## 4.1. Remover override quebrado do header

Apague o arquivo:

```text
layouts/partials/header.html
```

Não substitua por outro neste primeiro momento.

O objetivo é deixar o tema Archie voltar a controlar o HTML principal, o `<head>`, o `<body>`, o menu e o carregamento de CSS.

Depois de apagar, rode:

```bash
hugo --gc --minify
```

Se o build funcionar, continue.

---

# 5. Corrigir `content/about.md`

Substitua todo o conteúdo de `content/about.md` por:

```markdown
---
title: "Sobre mim"
date: 2026-06-09
draft: false
---

# Sobre Thiago Borghardt

Olá! Sou Thiago Borghardt, estudante e desenvolvedor em formação, com foco em programação backend, Java, Spring Boot e fundamentos de Ciência da Computação.

## Sobre minha jornada

Estou construindo meu conhecimento em desenvolvimento de software com foco em soluções práticas, organização de código, boas práticas e evolução constante como programador.

## Tecnologias e interesses

Tenho estudado e praticado principalmente:

* **Backend** — Java, Spring Boot e APIs REST
* **Banco de dados** — SQL e modelagem básica de dados
* **DevOps e ferramentas** — Git, GitHub, Docker e automação de deploy
* **Arquitetura** — organização de projetos, separação de responsabilidades e manutenção de código
* **Tecnologia** — desenvolvimento web, sistemas, produtividade e aprendizado contínuo

## Contato

| Canal | Link / Informação |
|---|---|
| E-mail | thiago.backend@gmail.com |
| LinkedIn | [linkedin.com/in/thiago-borghardt-5234b0334](https://www.linkedin.com/in/thiago-borghardt-5234b0334/) |
| GitHub | [github.com/othiagob](https://github.com/othiagob) |
| WhatsApp | [69 9.9368-4773](https://wa.me/5569993684773) |

---

**Obrigado por visitar meu blog!**
```

---

# 6. Corrigir `config.toml`

Substitua o conteúdo de `config.toml` por uma versão limpa e organizada:

```toml
baseURL = "https://othiagob.github.io/home/"
languageCode = "pt-br"
title = "Blog - Thiago Borghardt"
theme = "archie"
copyright = "© Thiago Borghardt"

pygmentsstyle = "monokai"
pygmentscodefences = true
pygmentscodefencesguesssyntax = true

[pagination]
  pagerSize = 5

[params]
  mode = "auto"
  useCDN = false
  subtitle = "Programação backend, tecnologia e aprendizado em Ciência da Computação"
  mainSections = ["posts"]
  summaryLength = 30

[[params.social]]
  name = "GitHub"
  icon = "github"
  url = "https://github.com/othiagob"

[[params.social]]
  name = "LinkedIn"
  icon = "linkedin"
  url = "https://www.linkedin.com/in/thiago-borghardt-5234b0334/"

[[params.social]]
  name = "Email"
  icon = "mail"
  url = "mailto:thiago.backend@gmail.com"

[[params.social]]
  name = "WhatsApp"
  icon = "message-circle"
  url = "https://wa.me/5569993684773"

[[menu.main]]
  name = "Home"
  url = "/"
  weight = 1

[[menu.main]]
  name = "Posts"
  url = "/posts/"
  weight = 2

[[menu.main]]
  name = "Sobre"
  url = "/about/"
  weight = 3

[[menu.main]]
  name = "Tags"
  url = "/tags/"
  weight = 4

[[menu.main]]
  name = "Buscar"
  url = "/search/"
  weight = 5
```

Observação: usei `message-circle` no WhatsApp porque temas que usam Feather Icons geralmente não possuem ícone `whatsapp`. Se o tema suportar `whatsapp`, pode trocar de volta, mas somente depois de confirmar visualmente.

---

# 7. Corrigir summaries dos posts

Verifique todos os arquivos em:

```text
content/posts/
```

Cada post deve ter front matter válido e um campo `summary` curto.

## 7.1. `content/posts/bem-vindo.md`

Garanta que o front matter seja:

```yaml
---
title: "Bem-vindo ao meu Blog"
date: 2026-06-09
draft: false
tags: ["blog", "início"]
summary: "Apresentação do blog, com os temas que serão abordados: programação, tecnologia, backend e aprendizados práticos."
---
```

## 7.2. `content/posts/docker-containers.md`

Garanta que o front matter seja:

```yaml
---
title: "Docker: Containerizando Aplicações"
date: 2026-06-07
draft: false
tags: ["docker", "devops", "containers"]
summary: "Introdução prática ao Docker, explicando containers, vantagens e comandos básicos para começar."
---
```

## 7.3. `content/posts/introducao-ao-go.md`

Garanta que o front matter seja:

```yaml
---
title: "Introdução ao Go: Uma Linguagem Moderna e Eficiente"
date: 2026-06-08
draft: false
tags: ["go", "programação", "tutorial"]
summary: "Visão geral da linguagem Go, suas características, exemplos iniciais e motivos para estudá-la."
---
```

Não remova o conteúdo dos posts abaixo do front matter.

---

# 8. Corrigir a listagem da home com override seguro

Crie ou substitua o arquivo:

```text
layouts/_default/list.html
```

Use este conteúdo:

```html
{{ define "main" }}
<main>
  {{ if .Title }}
    {{ if not .IsHome }}
      <h1>{{ .Title }}</h1>
    {{ end }}
  {{ end }}

  <section class="post-list" aria-label="Lista de posts">
    {{ range .Pages }}
      <article class="post-item">
        <h2 class="post-title">
          <a href="{{ .RelPermalink }}">{{ .Title }}</a>
        </h2>

        <div class="post-meta">
          <time datetime="{{ .Date.Format "2006-01-02" }}">
            {{ .Date.Format "02/01/2006" }}
          </time>

          {{ with .Params.tags }}
            <span class="post-tags">
              {{ range . }}
                <a href="{{ (printf "/tags/%s/" (. | urlize)) | relURL }}">#{{ . }}</a>
              {{ end }}
            </span>
          {{ end }}
        </div>

        <p class="post-summary">
          {{ with .Params.summary }}
            {{ . }}
          {{ else }}
            {{ .Summary | plainify | truncate 160 }}
          {{ end }}
        </p>
      </article>
    {{ else }}
      <p>Nenhum post encontrado.</p>
    {{ end }}
  </section>
</main>
{{ end }}
```

Importante: esse override define apenas o bloco `main`. Ele não deve conter `<!doctype html>`, `<html>`, `<head>` nem `<body>`.

---

# 9. Aplicar personalização visual sem quebrar o tema

## 9.1. Estratégia segura

Como não temos garantia de que `assets/css/extended.css` será carregado automaticamente pelo tema, aplique os estilos principais no arquivo que o Archie já costuma carregar/usar como override:

```text
assets/css/dark.css
```

Se o tema também tiver `assets/css/main.css` no projeto, não substitua o arquivo inteiro sem copiar o original. Apenas acrescente overrides ao final.

## 9.2. Substituir `assets/css/dark.css`

Substitua o conteúdo de `assets/css/dark.css` por este CSS enxuto:

```css
:root {
  --color-primary: #1a6ed8;
  --color-primary-hover: #155bbf;
  --color-border: #1a6ed8;
  --color-primary-dark: #1a6ed8;
  --color-border-dark: #1a6ed8;
}

body {
  color: var(--color-text-dark, #ffffff);
  background-color: var(--color-background-dark, #202124);
}

::selection,
::-moz-selection {
  background: var(--color-primary-dark);
  color: #ffffff;
  text-shadow: none;
}

a {
  border-block-end-color: var(--color-primary-dark);
}

a:hover,
a:focus {
  background-color: var(--color-primary-dark);
  color: #ffffff;
  outline-color: var(--color-primary-dark);
}

hr,
pre,
blockquote,
.header nav,
footer,
table th,
table td,
.search-panel,
.search-result-card,
.search-input,
kbd {
  border-color: var(--color-border-dark) !important;
}

h1::before,
h2::before,
h3::before,
h4::before,
h5::before,
h6::before,
.tags a,
.search-tag {
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.site-title a {
  text-decoration: none !important;
  border: none !important;
  background: none !important;
}

.site-title a::before {
  content: "OTB";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ffffff;
  background-color: var(--color-primary-dark);
  border: 2px solid var(--color-primary-dark);
  border-radius: 6px;
  line-height: 1.4;
  transition: background-color 0.2s, border-color 0.2s;
}

.site-title a:hover::before,
.site-title a:focus::before {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.site-title a {
  font-size: 0;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-item {
  border-bottom: 1px solid rgba(128, 128, 128, 0.28);
  padding-bottom: 1.5rem;
}

.post-title {
  margin-bottom: 0.25rem;
}

.post-title a {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  border-bottom: none !important;
  text-decoration: none;
}

.post-title a:hover,
.post-title a:focus {
  color: #ffffff;
  background-color: var(--color-primary-hover);
  text-decoration: none;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  margin: 0.25rem 0 0.65rem;
  font-size: 0.82rem;
  color: #999999;
}

.post-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.post-tags a {
  border-bottom: none !important;
  color: #999999;
  text-decoration: none;
}

.post-tags a:hover,
.post-tags a:focus {
  color: #ffffff;
  background-color: var(--color-primary-hover);
}

.post-summary {
  margin: 0;
  line-height: 1.65;
}
```

Essa solução troca visualmente o texto do título por `OTB` usando CSS, sem precisar sobrescrever `header.html`.

---

# 10. Remover `assets/css/extended.css` se ele não estiver sendo carregado

Verifique se o tema realmente importa `assets/css/extended.css`.

- Se o tema não importar esse arquivo, apague `assets/css/extended.css` para evitar confusão.
- Se o tema importar, mantenha-o apenas se não duplicar regras de `dark.css`.

Preferência para este projeto: **remover `assets/css/extended.css` por enquanto** e manter os overrides centralizados em `assets/css/dark.css`.

---

# 11. Corrigir ou manter `content/search.md`

Mantenha `content/search.md` somente se existir um layout de busca funcional no tema ou no projeto.

Arquivo atual aceitável:

```markdown
---
title: "Buscar"
layout: "search"
outputs:
  - html
  - json
---
```

Se o build reclamar que não existe template relacionado a busca, remova temporariamente o item `Buscar` do menu em `config.toml` ou implemente o layout corretamente.

---

# 12. Workflow do GitHub Pages

Mantenha o arquivo:

```text
.github/workflows/hugo.yml
```

Não precisa alterar o workflow, exceto se o build acusar problema de versão.

O workflow já faz:

```yaml
- name: Download Archie theme
  run: git clone --depth 1 https://github.com/athul/archie.git themes/archie
```

Isso reforça a regra: **não editar `themes/archie` no repositório**.

---

# 13. Local correto para instruções do Copilot

O arquivo de instruções não deve ficar dentro de:

```text
.github/workflows/copilot-instructions.md
```

Essa pasta deve conter workflows `.yml`/`.yaml`.

Mova o arquivo de instruções para:

```text
.github/copilot-instructions.md
```

Se a pasta `.github/` já existir, apenas crie o arquivo no local correto.

---

# 14. Checklist final obrigatório

Antes de finalizar, confirme todos os itens:

- [ ] `layouts/partials/header.html` removido ou refeito somente copiando o original do tema.
- [ ] Nenhum partial contém `<!doctype html>` indevidamente.
- [ ] `content/about.md` tem apenas um bloco de front matter.
- [ ] Nenhum `.md` possui `---` solto no final sem necessidade.
- [ ] `config.toml` está limpo e indentado.
- [ ] Todos os posts em `content/posts/` têm `summary`.
- [ ] `layouts/_default/list.html` contém apenas `{{ define "main" }}`.
- [ ] `assets/css/dark.css` concentra os overrides visuais.
- [ ] `assets/css/extended.css` foi removido ou comprovadamente carregado pelo tema.
- [ ] Nada foi editado em `themes/archie/`.
- [ ] `hugo --gc --minify` roda com sucesso.
- [ ] O site renderiza com layout do tema, e não como HTML puro.

---

# 15. Commit sugerido

Use uma mensagem clara:

```bash
git add .
git commit -m "fix: restore Hugo theme layout and organize blog overrides"
git push
```

---

# 16. Observação importante para manutenção futura

Para personalizações futuras:

- prefira mudar conteúdo em `content/`;
- prefira configurações em `config.toml`;
- prefira CSS em arquivo de override já carregado pelo tema;
- só crie override em `layouts/` quando realmente precisar;
- nunca substitua um partial do tema por HTML inventado sem comparar com o original.
