const path = require('path')

module.exports = {
    mode: 'deployment',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundel.js'
    },
    watch: true
}