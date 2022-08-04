---
title: Neovim as IDE
slug: 2022-04-17-neovim-as-ide
date_published: 2022-05-01
date_updated: 2022-08-03
tags:
  - Neovim
  - Linux
  - Development
---

This is my attempt to migrate to neovim and use it as IDE for web Development.

<!-- more -->

# Option #1 - Based on bushblade/nvim

This is what I ended up using as for August 2023. The starting point was [bushblade/nvim](https://github.com/bushblade/nvim) and some changes were made.

The final config is available at [this repo](https://github.com/ajboni/nvim-2)

# Option #2 - Based on AstroNvim

The starting point is [AstroNvim](https://astronvim.github.io/)

Complete config can be found at https://github.com/ajboni/astronvim_config

# Config Tips

## ⊙ Keyboard goodies

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
plugins = {
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

## Nice shortcuts

```lua
-- -- Copy / Paste / Cut

map("v", "<C-c>", "y") -- Copy: As mostly in visual mode.
map("i", "<C-v>", "<c-r>+") -- Copy: As in visual mode.
map("v", "<C-x>", "d") -- Copy: As in visual mode.
map("i", "<C-x>", "<c-o>dd") -- In insert mode cut whole line.
map("n", "<C-v>", "a<c-r>+<esc>") -- Enter insert mode, get register, paste it, back to normal mode.
--
map("i", "<C-ins>", "<Esc>") -- exit insert mode.
map("n", "<ins>", "a") -- Enter insert mode (appending)

map("n", "<C-a>", "ggVGygv") -- Select and yank entire buffer
map("i", "<C-a>", "<esc>ggVGygv") -- Select and yank entire buffer

-- -- Undo/Redo
map("i", "<C-z>", "<C-o>u") -- Undo
map("n", "<C-z>", "u") -- undo
map("v", "<C-z>", "u") -- undo
map("n", "<C-y>", ":redo<cr>") -- Redo

-- "fine grained" undo.
-- https://stackoverflow.com/questions/2895551/how-do-i-get-fine-grained-undo-in-vim
map("i", "<Space>", "<Space><C-g>u")
map("i", "<Return>", "<Return><C-g>u")
map("i", "<Tab>", "<Tab><C-g>u")

-- -- Navigate through buffers
map("n", "<S-Tab>", ":BufferLineCyclePrev<cr>")
map("n", "<Tab>", ":BufferLineCycleNext <cr>")
map("n", "<C-s>", ":w<cr>") -- Save buffer
map("i", "<C-s>", "<Esc>:w<cr>") -- Save buffer
map("n", "<C-e>", "<C-w>") -- Close buffer
map("n", "<C-w>", ":bdelete<cr>") -- Close buffer

-- Hop
map("n", "<C-f>", "<cmd>HopWord<cr>") -- Hop through words in whole "viewport"
map("n", "F", "<cmd>HopLine<cr>") -- Hop through lines in whole "viewport"
map({ "n", "v" }, "f", "<esc><cmd>HopWordCurrentLine<cr>") -- Hop through words on current line
map({ "i" }, "<C-f>", "<esc><cmd>HopWordCurrentLine<cr>") -- Hop through lines in whole "viewport" in edit mode.

-- Global shorcuts
map({ "n", "i" }, "<F2>", ":Telescope keymaps <cr>")
map({ "n", "i" }, "<F3>", ":Telescope commands <cr>")
map({ "n", "i" }, "<F4>", "<cmd>lua require('telescope.builtin').current_buffer_fuzzy_find()<cr>", opts)
map({ "n", "i" }, "<F10>", "<esc>:Telescope lsp_dynamic_workspace_symbols<cr>")
map({ "n", "i" }, "<F11>", "<esc>:Telescope lsp_document_symbols<cr>")
map({ "n", "i" }, "<F12>", "<esc><cmd>lua vim.lsp.buf.definition()<cr>")

-- File Picker
map({ "n", "i" }, "<C-]>", "<esc>:Telescope oldfiles hidden=true<cr>")

-- Comments
map("n", "<C-/>", "<Cmd>lua require('Comment.api').toggle_current_blockwise_op()<CR>") -- (CTRL + /) Add a comment
map("i", "<C-/>", "<Esc><Cmd>lua require('Comment.api').toggle_current_blockwise_op()<CR>^i") -- (CTRL + /) Add a comment
map("x", "<C-/>", '<ESC><CMD>lua require("Comment.api").toggle_blockwise_op(vim.fn.visualmode())<CR>')

-- LSP via Telescope
local telescope = require("telescope.builtin")
map("n", "gD", vim.lsp.buf.declaration) -- Go to declaration
map("n", "gd", telescope.lsp_definitions) -- Go to definition
map("n", "gr", telescope.lsp_references) -- (Go to) references
map("n", "gi", telescope.lsp_implementations) -- (Go to) Implementations
```

## More Awesome Plugins

- https://github.com/folke/trouble.nvim - For a vscode similar "problems" tab.
- https://github.com/phaazon/hop.nvim - For easier navigation.
- https://github.com/tpope/vim-surround - Delete/change/add parentheses/quotes/XML-tags/much more with ease
- Glow for markdown preview
