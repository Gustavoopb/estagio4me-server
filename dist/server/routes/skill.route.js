"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const abstract_router_1 = require("./abstract/abstract.router");
const skill_controller_1 = require("../controller/skill.controller");
class SkillRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/skill", new skill_controller_1.SkillController);
    }
    init() {
        this.router.get("/findAll", passport.authenticate('jwt'), this.controller.findAll);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.controller.findById);
        this.router.post("/insert", passport.authenticate('jwt'), this.controller.insert);
        this.router.post("/insertMany", passport.authenticate('jwt'), this.controller.insertMany);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.controller.findOneAndUpdate);
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.controller.delete);
        super.beUsed();
    }
}
exports.default = new SkillRoute();
//# sourceMappingURL=skill.route.js.map