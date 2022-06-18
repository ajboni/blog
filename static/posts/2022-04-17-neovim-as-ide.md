---
title: Neovim as IDE
slug: 2022-04-17-neovim-as-ide
date_published: 2022-05-01
date_updated: 2022-05-01
tags:
  - Neovim
  - Linux
  - Development
---

This is my attempt to migrate to neovim and use it as IDE for web Development.
The starting point is [AstroVim](https://astronvim.github.io/)

Complete config can be found at https://github.com/ajboni/astronvim_config

<!-- more -->

### ⊙ Out of the box Goodies

Nothing to configure here, these are awesome thinsg to know.

- `jk | jj ` exits insert mode.
- `<C-r>` open register menu.

### ⊙ Keyboard goodies

```lua
vim.opt.keymodel = "startsel,stopsel" -- Allow selection with shift+arrow keys
```

## ⊙ Prettier

```lua
-- generic LSP settings
local formatters = require "lvim.lsp.null-ls.formatters"
formatters.setup {
  {
    command = "prettier",
  },
}
```

> `prettier` should be installed globally (`npm i -g prettier`) `.prettierrc` should be present on the local repo.  
> `jsconfig` file was needed to for autoimport to work properly with js files and react components:

```json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```

## ⊙ (cmp) Disable automatic autocompletion.

It is useful to have a command by hand to disable automatic auto-completion, for example in markdown files.
[This post](https://www.reddit.com/r/neovim/comments/rh0ohq/nvimcmp_temporarily_disable_autocompletion/) has useful information.

```lua
-- Autocommands (https://neovim.io/doc/user/autocmd.html)
lvim.autocommands.custom_groups = {
    { "BufWinEnter", "*.md", ":lua require('cmp').setup.buffer { enabled = false }" },
}
```

## ⊙ (cmp) Disable Annoying automcompletion by default and some nice keymappings

```lua
cmp = {
  completion = {
   keyword_length = 2,
  },
   mapping = cmp.mapping.preset.insert({
    ['<C-b>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-e>'] = cmp.mapping.abort(),
    ['<CR>'] = cmp.mapping.confirm({ select = false }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
    ["<PageUp>"] = function(fallback)
      for i = 1, 5 do
        cmp.mapping.select_prev_item()(fallback)
      end
    end,
    ["<PageDown>"] = function(fallback)
      for i = 1, 5 do
        cmp.mapping.select_next_item()(fallback)
      end
    end,
  }),
}
```

## ⊙ Emmet support

Follow This repo https://github.com/aca/emmet-ls.

Install globally:

```
npm install -g emmet-ls
```

Add `emmet.lua` file and source it on `init.lua`

```lua
local lspconfig = require'lspconfig'
local configs = require'lspconfig.configs'

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true

if not configs.ls_emmet then
  configs.ls_emmet = {
    default_config = {
      cmd = { 'ls_emmet', '--stdio' };
      filetypes = {
        'html',
        'css',
        'scss',
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
        'haml',
        'xml',
        'xsl',
        'pug',
        'slim',
        'sass',
        'stylus',
        'less',
        'sss',
        'hbs',
        'handlebars',
      };
      root_dir = function(fname)
        return vim.loop.cwd()
      end;
      settings = {};
    };
  }
end

lspconfig.ls_emmet.setup { capabilities = capabilities }

```

## Autotag not working on regular HTML files

This one took me a while, https://github.com/windwp/nvim-ts-autotag/issues/36

## More granular undo

https://stackoverflow.com/questions/2895551/how-do-i-get-fine-grained-undo-in-vim

```lua
map("i", "<Space>", "<Space><C-g>u")
map("i", "<Return>", "<Return><C-g>u")
map("i", "<Tab>", "<Tab><C-g>u")
```

## Tailwind CSS support

```
:LspInstall tailwindcss
```

## More Awesome Plugins

- https://github.com/folke/trouble.nvim - For a vscode similar "problems" tab.
- https://github.com/phaazon/hop.nvim - For easier navigation.
- https://github.com/tpope/vim-surround - Delete/change/add parentheses/quotes/XML-tags/much more with ease
- Glow for markdown preview
