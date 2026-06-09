# Instruções para o GitHub Copilot — Blog Thiago Borghardt

Este arquivo descreve todas as alterações a serem aplicadas no projeto Hugo (tema Archie) hospedado no GitHub Pages.
Aplique cada seção na ordem em que aparecem.

---

## 1. Correção de nome em todo o projeto

Substitua **todas** as ocorrências de `Othiago Barbosa` e `Othiago Barbosa` pelo nome correto:

- Nome completo: **Thiago Borghardt**
- Sigla/logomarca: **OTB**

Arquivos afetados:
- `config.toml` — campos `title` e `copyright`
- `content/about.md` — título e parágrafo de apresentação
- Qualquer outro arquivo `.md` ou template que contenha o nome antigo

### config.toml — alterações de nome

```toml
title = "Blog - Thiago Borghardt"
copyright = "© Thiago Borghardt"
```

### content/about.md — alterações de nome

Substituir `Othiago Barbosa` por `Thiago Borghardt` no título e no corpo do texto.

---

## 2. Atualização das redes sociais no config.toml

Substitua o bloco `[[params.social]]` atual pelos dados corretos abaixo:

```toml
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
icon = "whatsapp"
url = "https://wa.me/5569993684773"
```

---

## 3. Logomarca OTB no cabeçalho (substituir texto do site-title)

O tema Archie renderiza o título do site dentro de `.site-title > a`. Em vez de exibir texto puro, queremos exibir uma caixa/badge com a sigla **OTB**.

### 3a. Criar partial override do header

Crie o arquivo `layouts/partials/header.html` copiando o original do tema e localizando o trecho que renderiza `.site-title`. Substitua o conteúdo do link pelo HTML abaixo:

```html
<a href="{{ .Site.BaseURL }}">
  <span class="logo-otb">OTB</span>
</a>
```

> Se não quiser sobrescrever o partial inteiro, adicione a classe via JavaScript ou use o CSS abaixo para transformar o texto existente visualmente.

### 3b. CSS para a logomarca — adicionar em assets/css/extended.css (ou no final de dark.css)

Crie o arquivo `assets/css/extended.css` (o tema Archie carrega automaticamente arquivos extras em `assets/css/`) com o conteúdo abaixo. Se preferir, adicione ao final de `assets/css/dark.css`.

```css
/* ── Logomarca OTB ─────────────────────────────────────────── */
.site-title a {
  text-decoration: none !important;
  border: none !important;
  background: none !important;
}

.logo-otb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ffffff;
  background-color: #1a6ed8;       /* azul principal */
  border: 2px solid #1a6ed8;
  border-radius: 6px;              /* cantos levemente arredondados */
  line-height: 1.4;
  transition: background-color 0.2s, border-color 0.2s;
}

.logo-otb:hover {
  background-color: #155bbf;
  border-color: #155bbf;
}
```

---

## 4. Paleta de cores — trocar vermelho/rosa por azul

O tema Archie usa vermelho (`#ff0000` ou similar) como cor primária. Substitua **todas** as ocorrências das cores abaixo pela nova paleta azul.

### Mapeamento de cores

| Cor antiga (vermelho/rosa) | Nova cor (azul)  | Uso                          |
|---------------------------|-----------------|------------------------------|
| `#ff0000`                 | `#1a6ed8`       | Cor primária (links, bordas) |
| `#cc0000`                 | `#155bbf`       | Hover / estados ativos       |
| `#ee0000`                 | `#1a6ed8`       | Variações do vermelho        |
| `red`                     | `#1a6ed8`       | Palavra-chave CSS            |
| `crimson`                 | `#1a6ed8`       | Palavra-chave CSS            |

### Arquivos a verificar e editar

1. **`assets/css/dark.css`** — já contém variáveis como `--color-primary-dark`, `--color-border-dark`. Atualize:

```css
/* Substitua os valores das variáveis de cor primária */
--color-primary-dark: #1a6ed8;   /* era #50fa7b ou vermelho */
--color-border-dark: #1a6ed8;    /* era #0066ff — manter azul, apenas ajustar tom */
```

2. **`themes/archie/assets/css/main.css`** (arquivo do tema) — procure por `color: red`, `border.*red`, `#ff`, `crimson`, etc. e substitua pelos valores azuis do mapeamento acima.

3. Se o tema usa variável `--color-primary`, adicione override no início de `assets/css/extended.css`:

```css
:root {
  --color-primary: #1a6ed8;
  --color-primary-hover: #155bbf;
  --color-border: #1a6ed8;
  --color-primary-dark: #1a6ed8;
  --color-border-dark: #1a6ed8;
}
```

---

## 5. Layout da home — organização visual dos posts

O problema atual: o sumário da home mistura o título do post com o conteúdo interno (headings do markdown como `# Bem-vindo!`), tornando a listagem confusa.

### 5a. Adicionar `summary` manual nos posts existentes

Edite cada arquivo em `content/posts/` e adicione o campo `summary` no front matter. Isso controla o que aparece na listagem da home sem mostrar os headings internos.

**content/posts/bem-vindo.md**
```yaml
---
title: "Bem-vindo ao meu Blog"
date: 2026-06-09
draft: false
tags: ["blog", "início"]
summary: "Post de boas-vindas ao blog. Aqui você encontrará tutoriais práticos, análises técnicas e experiências pessoais sobre programação e tecnologia."
---
```

**content/posts/docker-containers.md** e **content/posts/introducao-ao-go.md** — adicione também um `summary` descritivo de 1-2 linhas no front matter.

### 5b. Configurar o Hugo para usar summary e não renderizar conteúdo raw na home

No `config.toml`, adicione ou confirme:

```toml
[params]
  # Limita o resumo automático a 30 palavras caso summary manual não exista
  summaryLength = 30
```

### 5c. CSS para a listagem de posts — adicionar em assets/css/extended.css

```css
/* ── Lista de posts na home ─────────────────────────────────── */

/* Card de cada post */
.post-item,
article.post {
  border-bottom: 1px solid rgba(128, 128, 128, 0.25);
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Título do post — destaque claro */
.post-item h2 a,
.post-title a,
h2.post-title a {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a6ed8;
  border-bottom: none !important;
  text-decoration: none;
}

.post-item h2 a:hover,
.post-title a:hover {
  text-decoration: underline;
  background: none !important;
  color: #155bbf;
}

/* Metadados (data, tags) — discretos, abaixo do título */
.post-meta,
.post-date,
time {
  display: block;
  font-size: 0.82rem;
  color: #888;
  margin: 0.2rem 0 0.6rem 0;
}

/* Resumo do post */
.post-summary,
.summary,
p.post-summary {
  font-size: 0.97rem;
  line-height: 1.65;
  color: inherit;
  margin: 0;
}

/* Separador visual entre título e data — evita colisão visual */
.post-item h2,
.post-title {
  margin-bottom: 0.15rem;
}
```

### 5d. Override do template list.html (se CSS não for suficiente)

Se o tema estiver renderizando o conteúdo completo dos posts na home (ao invés do summary), crie `layouts/_default/list.html` com a estrutura abaixo:

```html
{{ define "main" }}
<main>
  <div class="post-list">
    {{ range .Pages }}
    <article class="post-item">
      <h2 class="post-title">
        <a href="{{ .Permalink }}">{{ .Title }}</a>
      </h2>
      <div class="post-meta">
        <time datetime="{{ .Date.Format "2006-01-02" }}">
          {{ .Date.Format "Jan 2, 2006" }}
        </time>
        {{ with .Params.tags }}
        <span class="post-tags">
          {{ range . }}
          <a href="{{ "/tags/" | relURL }}{{ . | urlize }}">{{ . }}</a>
          {{ end }}
        </span>
        {{ end }}
      </div>
      <p class="post-summary">{{ .Summary }}</p>
    </article>
    {{ end }}
  </div>
</main>
{{ end }}
```

---

## 6. Atualização do about.md com dados de contato

Substitua o conteúdo de `content/about.md` pelo texto abaixo (mantendo o estilo e os bullets, apenas atualizando nome e contatos):

```markdown
---
title: "Sobre mim"
date: 2026-06-09
draft: false
---

# Sobre Thiago Borghardt

Olá! Sou Thiago Borghardt, desenvolvedor de software apaixonado por tecnologia e inovação.

## Experiência

Trabalho com desenvolvimento de software, com foco em:

* **Backend** - Node.js, Go, Python
* **DevOps** - Docker, Kubernetes, CI/CD
* **Cloud** - AWS, GCP
* **Arquitetura** - Microserviços, Sistemas Distribuídos

## Interesses

Além de programação, tenho interesse em:

* Open source
* Segurança da informação
* Machine Learning
* Educação em tecnologia

## Contato

| Canal      | Link / Informação |
|------------|-------------------|
| E-mail     | thiago.backend@gmail.com |
| LinkedIn   | [linkedin.com/in/thiago-borghardt-5234b0334](https://www.linkedin.com/in/thiago-borghardt-5234b0334/) |
| GitHub     | [github.com/othiagob](https://github.com/othiagob) |
| WhatsApp   | [69 9.9368-4773](https://wa.me/5569993684773) |

---

**Obrigado por visitar meu blog!** 🙏
```

---

## 7. Resumo de arquivos a criar/editar

| Ação   | Arquivo                              | Motivo                                      |
|--------|--------------------------------------|---------------------------------------------|
| Editar | `config.toml`                        | Nome, social links, summaryLength           |
| Editar | `content/about.md`                   | Nome correto + dados de contato             |
| Editar | `content/posts/bem-vindo.md`         | Adicionar campo `summary`                   |
| Editar | `content/posts/docker-containers.md` | Adicionar campo `summary`                   |
| Editar | `content/posts/introducao-ao-go.md`  | Adicionar campo `summary`                   |
| Editar | `assets/css/dark.css`                | Variáveis de cor (azul)                     |
| Criar  | `assets/css/extended.css`            | Logomarca OTB + layout posts + paleta azul  |
| Criar  | `layouts/partials/header.html`       | Injetar `<span class="logo-otb">OTB</span>` |
| Criar  | `layouts/_default/list.html`         | Listagem limpa com summary na home          |

---

## 8. Ordem de execução sugerida ao Copilot

1. Edite `config.toml` (nome, social, summaryLength)
2. Edite `content/about.md` (nome + contatos)
3. Adicione `summary` nos três posts em `content/posts/`
4. Crie `assets/css/extended.css` com todo o CSS de logomarca, paleta e layout
5. Edite `assets/css/dark.css` atualizando variáveis de cor primária para azul
6. Crie `layouts/partials/header.html` com o badge OTB
7. Crie `layouts/_default/list.html` para a listagem limpa
8. Faça commit com a mensagem: `feat: redesign visual — logo OTB, paleta azul, layout home, dados atualizados`
