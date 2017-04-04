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
var passport_jwt_1 = require("passport-jwt");
var user_schema_1 = require("../schema/user.schema");
var AuthStrategy = (function (_super) {
    __extends(AuthStrategy, _super);
    function AuthStrategy(options) {
        return _super.call(this, options, function (payload, done) {
            if (payload) {
                var user = new user_schema_1.User(payload);
                return done(null, user);
            }
            else {
                return done(new Error("User not found"), null);
            }
        }) || this;
    }
    return AuthStrategy;
}(passport_jwt_1.Strategy));
AuthStrategy.defaultOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'estagio4me secret',
    ignoreExpiration: true
};
exports.AuthStrategy = AuthStrategy;
//# sourceMappingURL=auth.strategy.js.map