module.exports = {
  presets: [
    '@babel/preset-flow',
    ['@babel/preset-env', { modules: 'commonjs' }]
  ],
  plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'h' }]]
}
