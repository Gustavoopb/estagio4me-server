"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const abstract_router_1 = require("./abstract/abstract.router");
const rating_controller_1 = require("../controller/rating.controller");
class RatingRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/rating", new rating_controller_1.RatingController());
    }
    init() {
        this.router.get("/findByAuthUser", passport.authenticate('jwt'), this.controller.findByAuthUser);
        this.router.post("/findOne", passport.authenticate('jwt'), this.controller.findOne);
        this.router.post("/save", passport.authenticate('jwt'), this.controller.save);
        this.router.delete("/delete/:userId/:internshipId", passport.authenticate('jwt'), this.controller.delete);
        super.beUsed();
    }
}
exports.default = new RatingRoute();
//# sourceMappingURL=rating.route.js.map