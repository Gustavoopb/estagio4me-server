"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("./config/database.config");
const router_config_1 = require("./config/router.config");
const server_config_1 = require("./config/server.config");
class Index {
    constructor() {
        database_config_1.DatabaseConfig.connect();
        // consign({ verbose: false }).include('dist/server/routes').into(ServerConfig.getHttpInstance())
        router_config_1.RouterConfig.initRoutes();
        server_config_1.ServerConfig.startServer();
    }
}
exports.default = new Index();
//# sourceMappingURL=index.js.map