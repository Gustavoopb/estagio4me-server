"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consign = require("consign");
const database_config_1 = require("./config/database.config");
const server_config_1 = require("./config/server.config");
class Index {
    constructor(_serverApp = server_config_1.ServerConfig.getInstance()) {
        this._serverApp = _serverApp;
        database_config_1.DatabaseConfig.connect();
        consign({ verbose: false }).include('dist/server/routes').into(_serverApp);
        server_config_1.ServerConfig.startServer();
    }
}
exports.default = new Index();
//# sourceMappingURL=index.js.map