"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class InternshipSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            _companyName: String,
            _role: String,
            _requiredSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            _preferredSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            _compensation: Number,
            _isCompanyPrivate: { type: Boolean, default: false },
            _isCompensationPrivate: { type: Boolean, default: false },
            _isActive: { type: Boolean, default: false },
            _contact: String,
            _area: String,
            _description: String
        });
    }
}
exports.InternshipSchema = InternshipSchema;
exports.Internship = mongoose_1.model("Internship", new InternshipSchema);
//# sourceMappingURL=internship.schema.js.map