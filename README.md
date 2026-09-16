# Portfólio — Gustavo Holanda

Portfólio pessoal de um desenvolvedor no começo da carreira. Feito à mão em HTML, CSS e JavaScript puro, sem framework e sem dependências.

🔗 **Ver online:** https://gugaholandaa.github.io

## Estrutura

```
portfolio/
├── index.html        estrutura e conteúdo da página
├── css/
│   └── style.css     toda a aparência (tokens, temas, layout)
├── js/
│   └── main.js       revelação ao rolar + botão de copiar e-mail
├── assets/           imagens, ícones, currículo em PDF
└── README.md
```

Cada tipo de código no seu próprio arquivo: HTML é estrutura, CSS é aparência, JavaScript é comportamento.

## Decisões técnicas

- **Variáveis CSS (`:root`)** — todas as cores e tamanhos ficam em um lugar só. Trocar o tema inteiro é redefinir as variáveis.
- **Tema claro e escuro sem JavaScript** — via `prefers-color-scheme`, respeitando a preferência do sistema da pessoa.
- **Tipografia fluida** — `clamp()` faz o texto acompanhar o tamanho da tela sem media query.
- **Layout com Grid e Flexbox** — espaçamento por `gap`, nunca por margem entre elementos irmãos.
- **Acessibilidade** — HTML semântico, foco visível pelo teclado e `prefers-reduced-motion` respeitado.
- **Zero dependências** — nenhuma biblioteca, nenhum build. Abre direto no navegador.

## Rodando localmente

```bash
git clone https://github.com/gugaholandaa/gugaholandaa.github.io.git
cd gugaholandaa.github.io
```

Abra o `index.html` no navegador. Se usa VS Code, a extensão **Live Server** recarrega a página sozinha a cada alteração.

## Publicação

Hospedado no GitHub Pages. Todo `push` na branch `main` publica automaticamente.
