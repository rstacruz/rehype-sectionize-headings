module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],

  parserOptions: {
    ecmaVersion: 2018,

    // == Allows 'import' and 'export'
    sourceType: 'module',

    // == Allows JSX syntax for React
    ecmaFeatures: { jsx: true }
  },

  // == Enable React support
  plugins: ['react'],
  settings: {
    react: {
      version: '16.5.0'
    }
  },

  // == Enables parser for Flow annotatinos
  parser: 'babel-eslint',

  rules: {
    // == Disable React proptypes in favor of using Flow
    'react/prop-types': 0
  }
}
