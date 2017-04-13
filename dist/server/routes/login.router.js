"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = require("./abstract/abstract.router");
const user_schema_1 = require("../schema/user.schema");
const server_config_1 = require("../config/server.config");
const passport = require("passport");
const jwt = require("jwt-simple");
class UserRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/login");
        this.init();
    }
    singUp(req, res, next) {
        user_schema_1.User.register(new user_schema_1.User(req.body.user), req.body.password, function (err, result) {
            if (err) {
                console.log('error while user register!', err);
                res.status(500).json(err);
            }
            else {
                result = {
                    account: result,
                    message: "You have been successful registred!"
                };
                res.status(200).json(result);
            }
        });
    }
    checkEmailUsername(req, res, next) {
        console.log(req.body);
        user_schema_1.User.findOne(req.body, function (err, result) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    }
    login(req, res, next) {
        var token = jwt.encode(new user_schema_1.User(req.user), server_config_1.ServerConfig.jwtSecret);
        var user = user_schema_1.User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token,
                message: "You have been successful logedin!"
            };
            res.status(200).json(body);
        });
    }
    init() {
        this.router.post("/singUp", this.singUp);
        this.router.post("/checkEmailUsername", this.checkEmailUsername);
        this.router.post("/login", passport.authenticate('local'), this.login);
        super.beUsed();
    }
}
exports.default = new UserRoute().router;
//# sourceMappingURL=login.router.js.map