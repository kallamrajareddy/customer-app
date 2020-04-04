// vue.config.js
module.exports = {
    //prod
    publicPath: '/desktop/',
    // proxy all webpack dev-server requests starting with /api
    // to our Spring Boot backend (localhost:8088) using http-proxy-middleware
    // see https://cli.vuejs.org/config/#devserver-proxy
    devServer: {
        proxy: {
            '^/desktop/oauth/token': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:9001",
                pathRewrite: { "^/desktop/oauth/token": "/desktop/oauth/token" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            },
            '^/middleware/api/secured/broker-count': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:9002",
                pathRewrite: { "^/middleware/api/secured/broker-count": "/middleware/api/secured/broker-count" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            },
            '^/middleware/api/secured/get-masterdata': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:9002",
                pathRewrite: { "^/middleware/api/secured/get-masterdata": "/middleware/api/secured/get-masterdata" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            },
            '^/security/users/user-details': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:8182",
                pathRewrite: { "^/security/users/user-details": "/security/users/user-details" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
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