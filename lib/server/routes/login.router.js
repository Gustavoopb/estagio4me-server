"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_router_1 = require("./abstract/abstract.router");
var user_schema_1 = require("../schema/user.schema");
var server_config_1 = require("../config/server.config");
var passport = require("passport");
var jwt = require("jwt-simple");
var UserRoute = (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute() {
        var _this = _super.call(this, "/api/login") || this;
        _this.init();
        return _this;
    }
    UserRoute.prototype.singUp = function (req, res, next) {
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
    };
    UserRoute.prototype.checkEmailUsername = function (req, res, next) {
        console.log(req.body);
        user_schema_1.User.findOne(req.body, function (err, result) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    };
    UserRoute.prototype.login = function (req, res, next) {
        var token = jwt.encode(new user_schema_1.User(req.user), server_config_1.ServerConfig.jwtSecret);
        var user = user_schema_1.User.findOne(req.user, function (err, result) {
            var body = {
                user: result,
                token: token,
                message: "You have been successful logedin!"
            };
            res.status(200).json(body);
        });
    };
    UserRoute.prototype.init = function () {
        this.router.post("/singUp", this.singUp);
        this.router.post("/checkEmailUsername", this.checkEmailUsername);
        this.router.post("/login", passport.authenticate('local'), this.login);
        _super.prototype.beUsed.call(this);
    };
    return UserRoute;
}(abstract_router_1.AbstractRouter));
exports.default = new UserRoute().router;
//# sourceMappingURL=login.router.js.map