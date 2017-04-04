"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_config_1 = require("../../config/server.config");
var AbstractRouter = (function () {
    function AbstractRouter(url) {
        this.app = server_config_1.ServerConfig.getInstance();
        this.router = express_1.Router();
        this.url = url;
    }
    AbstractRouter.prototype.configureAuthSession = function () {
    };
    AbstractRouter.prototype.beUsed = function () {
        this.app.use(this.url, this.router);
    };
    return AbstractRouter;
}());
exports.AbstractRouter = AbstractRouter;
//# sourceMappingURL=abstract.router.js.map