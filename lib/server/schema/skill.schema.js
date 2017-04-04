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
var abstract_schema_1 = require("./abstract/abstract.schema");
var SkillSchema = (function (_super) {
    __extends(SkillSchema, _super);
    function SkillSchema() {
        return _super.call(this, {
            name: {
                type: String,
                unique: true,
            }
        }) || this;
    }
    return SkillSchema;
}(abstract_schema_1.AbstractSchema));
exports.SkillSchema = SkillSchema;
exports.Skill = mongoose_1.model("Skill", new SkillSchema);
//# sourceMappingURL=skill.schema.js.map