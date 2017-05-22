"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_schema_1 = require("./abstract/abstract.schema");
const mongoose_1 = require("mongoose");
class SkillSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            _name: {
                type: String,
                unique: true,
            }
        });
    }
}
exports.SkillSchema = SkillSchema;
exports.Skill = mongoose_1.model("Skill", new SkillSchema);
//# sourceMappingURL=skill.schema.js.map