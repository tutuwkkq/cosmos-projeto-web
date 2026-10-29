# Cosmos – Site responsivo sobre o Sistema Solar

Projeto final da disciplina **Desenvolvimento Front-End para Web (DFEW.08)**,
Engenharia de Software – Universidade Positivo.

O site apresenta os oito planetas com ilustrações, tabela comparativa, galeria,
vídeo, áudio, curiosidades, quiz interativo e formulário de contato.
Funciona totalmente offline a partir do arquivo `index.html`.

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, media queries)
- JavaScript puro (ES6) com `localStorage`
- Bootstrap 5.3 (armazenado localmente)
- SVG para ilustrações e logotipo

## Páginas

| Página | Arquivo | Tecnologia |
| --- | --- | --- |
| Início | `index.html` | Bootstrap |
| Sobre | `sobre.html` | Bootstrap |
| Planetas | `planetas.html` | HTML/CSS/JS puros |
| Dados | `dados.html` | HTML/CSS/JS puros |
| Galeria | `galeria.html` | HTML/CSS/JS puros |
| Mídia | `multimidia.html` | Bootstrap |
| Curiosidades | `curiosidades.html` | Bootstrap |
| Quiz | `quiz.html` | HTML/CSS/JS puros |
| Contato | `contato.html` | Bootstrap |
| Mapa do site | `mapa-do-site.html` | Bootstrap |

## Como executar

Basta abrir `index.html` no navegador. Não há etapa de build nem dependência externa.

## Estrutura

```
.
├── index.html e demais páginas .html
├── css/    estilos (Bootstrap, estilo.css, puro.css)
├── js/     scripts de cada página
├── img/    ilustrações em SVG e imagens
├── audio/  trilha ambiente
├── video/  vídeo do Sistema Solar
└── doc/    documentação do projeto
```
