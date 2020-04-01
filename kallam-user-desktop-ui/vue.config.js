// vue.config.js
module.exports = {
    //prod
    publicPath: '/desktop/',
    // proxy all webpack dev-server requests starting with /api
    // to our Spring Boot backend (localhost:8088) using http-proxy-middleware
    // see https://cli.vuejs.org/config/#devserver-proxy
    devServer: {
        proxy: {
            '^/oauth/token': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:8080",
                pathRewrite: { "^/oauth/token": "/oauth/token" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            }
        }
    },
    // Change build paths to make them Maven compatible
    // see https://cli.vuejs.org/config/
    outputDir: 'target/dist',
    assetsDir: 'static'
};