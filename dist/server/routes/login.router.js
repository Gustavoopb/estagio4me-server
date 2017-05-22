"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const abstract_router_1 = require("./abstract/abstract.router");
const login_controller_1 = require("../controller/login.controller");
class LoginRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/login", new login_controller_1.LoginController());
    }
    init() {
        this.router.get("/reAuth", passport.authenticate('jwt'), this.controller.reAuth);
        this.router.post("/changePassword", this.controller.changePassword);
        this.router.post("/checkEmailUsername", this.controller.checkEmailUsername);
        this.router.post("/login", passport.authenticate('local'), this.controller.login);
        this.router.post("/recoverPassword", this.controller.recoverPassword);
        this.router.post("/singUp", this.controller.singUp);
        super.beUsed();
    }
}
exports.default = new LoginRoute();
//# sourceMappingURL=login.router.js.map