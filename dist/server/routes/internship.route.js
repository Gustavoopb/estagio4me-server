"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const abstract_router_1 = require("./abstract/abstract.router");
const internship_controller_1 = require("../controller/internship.controller");
class InternshipRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/internship", new internship_controller_1.InternshipController());
    }
    init() {
        this.router.get("/findAll", passport.authenticate('jwt'), this.controller.findAll);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.controller.findById);
        this.router.post("/findByFilter", this.controller.findByFilter);
        this.router.post("/findOneByFilter", passport.authenticate('jwt'), this.controller.findOneByFilter);
        this.router.post("/insert", passport.authenticate('jwt'), this.controller.insert);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.controller.findOneAndUpdate.bind(this.controller));
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.controller.delete);
        super.beUsed();
    }
}
exports.InternshipRoute = InternshipRoute;
//# sourceMappingURL=internship.route.js.map