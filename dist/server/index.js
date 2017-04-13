"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = require("./config/server.config");
const database_config_1 = require("./config/database.config");
var consign = require('consign');
class Index {
    constructor() {
        var _serverApp = server_config_1.ServerConfig.getInstance();
        consign().include('dist/server/routes').into(_serverApp);
        console.log(process.env.NODE_ENV);
        database_config_1.DatabaseConfig.connect();
        server_config_1.ServerConfig.startServer();
    }
}
exports.default = new Index();
//# sourceMappingURL=index.js.map