"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class UserSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            updatedAt: Date,
            createdAt: Date,
            firstName: String,
            secondName: String,
            username: String,
            email: {
                type: String,
                unique: true
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        });
        this.plugin(passportLocalMongoose, {
            usernameLowerCase: true
        });
    }
}
exports.User = mongoose_1.model("User", new UserSchema);
//# sourceMappingURL=user.schema.js.map