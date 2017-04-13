"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class InternshipSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            updatedAt: Date,
            createdAt: Date,
            companyName: String,
            role: String,
            requiredSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            preferedSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            compensation: Number,
            isCompanyPrivate: Boolean,
            isCompesationPrivate: Boolean,
            isActive: { type: Boolean, default: false },
            contact: String,
            area: String
        });
        this.pre("validate", true, function (next, done) {
            let now = new Date();
            if (!this.createdAt) {
                this.createdAt = now;
            }
            this.updatedAt = now;
            next();
            setTimeout(done, 1000);
        });
    }
}
exports.Internship = mongoose_1.model("Internship", new InternshipSchema);
//# sourceMappingURL=internship.schema.js.map