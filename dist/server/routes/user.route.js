"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const abstract_router_1 = require("./abstract/abstract.router");
const user_controller_1 = require("../controller/user.controller");
class UserRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super('/api/user', new user_controller_1.UserController());
    }
    init() {
        this.router.get('/findAll', passport.authenticate('jwt'), this.controller.findAll);
        this.router.get('/findById/:id', passport.authenticate('jwt'), this.controller.findById);
        this.router.post('/updateOne', passport.authenticate('jwt'), this.controller.findOneAndUpdate);
        this.router.delete('/delete/:id', passport.authenticate('jwt'), this.controller.delete);
        super.beUsed();
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map