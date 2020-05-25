module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'indent': ['error', 2],
    'no-undef': 'off',
    'space-before-function-paren': ['error', 'never'], // 要求或禁止函数圆括号之前有一个空格
    'no-console': 'off'
  }
}
