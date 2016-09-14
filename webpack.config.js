var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './client/main.js'
    },
    //入口文件输出配置
    output: {
        path: './client',
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.less/, loader: 'style!css!less?sourceMap'},
            { test: /\.json$/, loader: 'json-loader'},
        ]
    },
    //其它解决方案配置
    resolve: {
        root: './', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            Counter : './client/Counter/counter-module.js',
            UserInfo : './client/UserInfo/userinfo-module.js'
        }
    }
};