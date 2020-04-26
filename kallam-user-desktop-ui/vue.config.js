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
            // '^/middleware/api/secured/broker-count': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/broker-count": "/middleware/api/secured/broker-count" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            // '^/middleware/api/secured/get-masterdata': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/get-masterdata": "/middleware/api/secured/get-masterdata" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            // '^/middleware/api/secured/update-masterdata': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/update-masterdata": "/middleware/api/secured/update-masterdata" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            '^/security': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:8182",
                pathRewrite: { "^/security": "/security" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            },
            '^/images': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:8182",
                pathRewrite: { "^/images": "/images" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            },
            // '^/middleware/api/secured/get-broker-Lst': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/get-broker-Lst": "/middleware/api/secured/get-broker-Lst" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            // '^/middleware/api/secured/broker-account-code': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/broker-account-code": "/middleware/api/secured/broker-account-code" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            // '^/middleware/api/secured/existing-broker-check': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/existing-broker-check": "/middleware/api/secured/existing-broker-check" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            // '^/middleware/api/secured/get-postal': {
            //     // target: 'http://localhost:8080/oauth/token',
            //     target: "http://localhost:9002",
            //     pathRewrite: { "^/middleware/api/secured/get-postal": "/middleware/api/secured/get-postal" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
            //     ws: true,
            //     changeOrigin: true,
            //     logLevel: "debug"
            // },
            '^/middleware/api/secured': {
                // target: 'http://localhost:8080/oauth/token',
                target: "http://localhost:9002",
                pathRewrite: { "^/middleware/api/secured": "/middleware/api/secured" }, // this configuration needs to correspond to the Spring Boot backends' application.properties server.port
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