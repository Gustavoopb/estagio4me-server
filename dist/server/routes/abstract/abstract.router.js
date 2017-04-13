"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_config_1 = require("../../config/server.config");
class AbstractRouter {
    constructor(url) {
        this.app = server_config_1.ServerConfig.getInstance();
        this.router = express_1.Router();
        this.url = url;
    }
    configureAuthSession() {
    }
    beUsed() {
        this.app.use(this.url, this.router);
    }
}
exports.AbstractRouter = AbstractRouter;
//# sourceMappingURL=abstract.router.js.map