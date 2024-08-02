const detect = require('detect-port');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config.dev.js');

const DEFAULT_PORT = 3000;

detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
        console.log(`Port ${DEFAULT_PORT} uygun, bu port kullanılacak.`);
    } else {
        console.log(`Port ${DEFAULT_PORT} meşgul, port ${port} kullanılacak.`);
        config.devServer.port = port;
    }

    const compiler = webpack(config);
    const server = new WebpackDevServer(config.devServer, compiler);

    server.startCallback(() => {
        console.log(`Geliştirme sunucusu port ${config.devServer.port} üzerinde çalışıyor.`);
    });
});
