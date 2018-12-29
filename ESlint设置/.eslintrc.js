// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'space-before-function-paren': [1, 'never'],
    // allow async-await

    'linebreak-style': ['error', 'unix'], //换行风格

    'max-len': [1, 200],

    'semi': [2, 'always'],//语句强制分号结尾

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
