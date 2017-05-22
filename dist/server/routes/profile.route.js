"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const abstract_router_1 = require("./abstract/abstract.router");
const profile_controller_1 = require("../controller/profile.controller");
class ProfileRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/profile", new profile_controller_1.ProfileController);
    }
    init() {
        this.router.get("/findOne", passport.authenticate('jwt'), this.controller.findOne);
        this.router.post("/save", passport.authenticate('jwt'), this.controller.save);
        super.beUsed();
    }
}
exports.default = new ProfileRoute();
//# sourceMappingURL=profile.route.js.map