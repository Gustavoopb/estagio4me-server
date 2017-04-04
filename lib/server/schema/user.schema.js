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
var mongoose_1 = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var abstract_schema_1 = require("./abstract/abstract.schema");
var UserSchema = (function (_super) {
    __extends(UserSchema, _super);
    function UserSchema() {
        var _this = _super.call(this, {
            updatedAt: Date,
            createdAt: Date,
            firstName: String,
            secondName: String,
            username: String,
            email: {
                type: String,
                unique: true
            }
        }) || this;
        _this.plugin(passportLocalMongoose, {
            usernameLowerCase: true
        });
        return _this;
    }
    return UserSchema;
}(abstract_schema_1.AbstractSchema));
exports.User = mongoose_1.model("User", new UserSchema);
//# sourceMappingURL=user.schema.js.map