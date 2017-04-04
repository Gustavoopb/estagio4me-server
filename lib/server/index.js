"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_config_1 = require("./config/server.config");
var database_config_1 = require("./config/database.config");
var consign = require('consign');
var Index = (function () {
    function Index() {
        var _serverApp = server_config_1.ServerConfig.getInstance();
        consign().include('lib/server/routes').into(_serverApp);
        console.log(process.env.NODE_ENV);
        database_config_1.DatabaseConfig.connect();
        server_config_1.ServerConfig.startServer();
    }
    return Index;
}());
exports.default = new Index();
//# sourceMappingURL=index.js.map