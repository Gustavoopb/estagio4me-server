"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_config_1 = require("../../config/server.config");
class AbstractRouter {
    constructor(url, controller, app = server_config_1.ServerConfig.getInstance(), router = express_1.Router()) {
        this.url = url;
        this.controller = controller;
        this.app = app;
        this.router = router;
        this.init();
    }
    beUsed() {
        this.app.use(this.url, this.router);
        console.log("+ ".concat(this.url));
        this.router.stack.forEach((st) => {
            for (var method in st.route.methods) {
                console.log("   - ".concat(method)
                    .concat(" ".repeat(10 - method.length))
                    .concat(st.route.path));
            }
        });
        console.log("");
    }
}
exports.AbstractRouter = AbstractRouter;
//# sourceMappingURL=abstract.router.js.map