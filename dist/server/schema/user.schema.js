"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class UserSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            _updatedAt: Date,
            _createdAt: Date,
            _firstName: String,
            _lastName: String,
            _username: String,
            _email: {
                type: String,
                unique: true
            },
            _isAdmin: {
                type: Boolean,
                default: false
            }
        });
        this.plugin(passportLocalMongoose, {
            usernameLowerCase: true,
            usernameField: '_username',
            passwordField: '_password'
        });
    }
}
exports.User = mongoose_1.model("User", new UserSchema);
//# sourceMappingURL=user.schema.js.map