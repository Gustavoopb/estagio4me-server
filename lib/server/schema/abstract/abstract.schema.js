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
var AbstractSchema = (function (_super) {
    __extends(AbstractSchema, _super);
    function AbstractSchema(definition, options) {
        var _this = _super.call(this, definition, options) || this;
        _this.pre("save", true, function (next, done) {
            var now = new Date();
            if (!this.createdAt) {
                this.createdAt = now;
            }
            this.updatedAt = now;
            next();
            setTimeout(done, 100);
        });
        _this.pre("findByIdAndUpdate", true, function (next, done) {
            var now = new Date();
            if (!this.createdAt) {
                this.createdAt = now;
            }
            this.updatedAt = now;
            next();
            setTimeout(done, 100);
        });
        return _this;
    }
    return AbstractSchema;
}(mongoose_1.Schema));
exports.AbstractSchema = AbstractSchema;
//# sourceMappingURL=abstract.schema.js.map