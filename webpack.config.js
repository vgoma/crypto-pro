const path = require('path');
const packageJson = require('./package.json');
const tsConfig = require(`./${process.env.TS_CONFIG}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: `./${packageJson.entryPoint}.ts`,
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: process.env.TS_CONFIG
        },
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, tsConfig.compilerOptions.outDir),
    filename: process.env.NODE_ENV === 'production' ? `${packageJson.entryPoint}.min.js` : `${packageJson.entryPoint}.js`,
    libraryTarget: 'umd',
    library: 'cryptoPro',
    umdNamedDefine: true
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map'
};
