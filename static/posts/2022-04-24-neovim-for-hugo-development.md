---
title: Neovim for Hugo development (to replace vscode)
slug: 2022-04-24-neovim-for-hugo-development-to-replace-vscode
date_published: 2022-04-24
date_updated: 2022-04-24
tags:
  - Neovim
  - Hugo
  - Linux
  - Development
---

This is my attempt to set up a confortable environment for hugo to replace VSCode.
The starting point in [AstroNvim](https://astronvim.github.io/)

<!-- more -->

## Syntax Highlighting (Go Template)

[This post](https://discourse.gohugo.io/t/vim-syntax-highlighting-for-hugo-html-templates/19398/10) has some great info about [vim-go](https://github.com/fatih/vim-go) plugin and a script to detect if file is a hugo template.

I just needed to make some little tweaks and convert it to lua. But the I found this!

[https://github.com/phelipetls/vim-hugo](https://github.com/phelipetls/vim-hugo)

## Snippets

Adding snippets is [really easy](https://astronvim.github.io/recipes/snippets) in AstroNvim: just need to setup the snippets directory, add the snippets file go the folder and set it up in package.json

For this case I will add the snippets from the [theNewDynamic language-hugo-vscode repo](https://github.com/theNewDynamic/language-hugo-vscode/).

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FtheNewDynamic%2Flanguage-hugo-vscode%2Fblob%2Fmaster%2Fsrc%2Fsnippets%2Fhugo.code-snippets.json&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>

## Result

![Hugo Vim](images/hugo.png)
