console.log("Babel config loaded");
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
    "babel-plugin-root-import",
    {
      "rootPathPrefix": "@",
      "rootPathSuffix": "src"
    },
  ]
}