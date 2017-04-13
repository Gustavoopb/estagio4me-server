"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_schema_1 = require("../schema/user.schema");
class AuthStrategy extends passport_jwt_1.Strategy {
    constructor(options) {
        super(options, (payload, done) => {
            if (payload) {
                var user = new user_schema_1.User(payload);
                return done(null, user);
            }
            else {
                return done(new Error("User not found"), null);
            }
        });
    }
}
AuthStrategy.defaultOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
    secretOrKey: 'estagio4me secret',
    ignoreExpiration: true
};
exports.AuthStrategy = AuthStrategy;
//# sourceMappingURL=auth.strategy.js.map