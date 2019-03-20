module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'space-before-function-paren': [1, 'never'],
    // allow async-await
    'prefer-promise-reject-errors': 'off',
    'linebreak-style': ['error', 'unix'], //换行风格
    'semi': [2, 'always'], //语句强制分号结尾
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}