"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class ProfileSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            _likedSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            _experiencedSkills: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Skill' }],
            _user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', unique: true }
        });
    }
}
exports.ProfileSchema = ProfileSchema;
exports.Profile = mongoose_1.model("Profile", new ProfileSchema);
//# sourceMappingURL=profile.schema.js.map