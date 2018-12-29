// Place your settings in this file to overwrite the default settings
{
  "editor.renderWhitespace": "all",
  "editor.cursorBlinking": "smooth",
  "editor.detectIndentation": false,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,

  "emmet.syntaxProfiles": {
    "javascript": "jsx",
    "vue": "html",
    "vue-html": "html"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },

  "eslint.autoFixOnSave": true,
  "eslint.options": {
    //"plugins": ["html"],
    "extensions": [
      ".js",
      ".vue",
    ]
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "vue-html",
    "html",
  ],

  "extensions.autoUpdate": true,
  "extensions.ignoreRecommendations": false,

  // "files.autoSave": "onFocusChange",
  // "files.autoSaveDelay": 3000,
  "files.associations": {
    "*.vue": "vue",
    "*.ftl": "html",
    "*.js": "javascriptreact",
    "*.cjson": "jsonc",
    "*.wxml": "html",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  // When enabled, insert a final new line at the end of the file when saving it.
  "files.insertFinalNewline": true,
  // When enabled, will trim trailing whitespace when saving a file.
  "files.trimTrailingWhitespace": true,

  "html.format.wrapAttributes": "force-expand-multiline",

  "search.showLineNumbers": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true
  },

  "terminal.integrated.fontFamily": "Menlo, Monaco, 'Courier New', monospace",
  "typescript.check.npmIsInstalled": false,

  "vsicons.dontShowNewVersionMessage": true,

  "window.title": "${activeEditorLong}${separator}${rootName}",
  "window.zoomLevel": 1,
  "workbench.iconTheme": "vscode-icons",
  "workbench.colorTheme": "Monokai",
}