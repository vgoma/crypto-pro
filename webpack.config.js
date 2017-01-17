module.exports = {
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: 'dist',
        filename: 'crypto-pro.js',
        library: 'CryptoPro'
    },
    devtool: 'source-map',
    watch: true
};