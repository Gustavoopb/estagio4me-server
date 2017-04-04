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
var InternshipSchema = (function (_super) {
    __extends(InternshipSchema, _super);
    function InternshipSchema() {
        return _super.call(this, {
            companyName: String,
            role: String,
            requiredSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            preferedSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            compensation: Number,
            isCompanyPrivate: Boolean,
            isCompesationPrivate: Boolean,
            isActive: { type: Boolean, default: false },
            area: String
        }) || this;
    }
    return InternshipSchema;
}(abstract_schema_1.AbstractSchema));
exports.Internship = mongoose_1.model("Internship", new InternshipSchema);
//# sourceMappingURL=internship.schema.js.map