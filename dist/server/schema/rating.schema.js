"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const abstract_schema_1 = require("./abstract/abstract.schema");
class RatingSchema extends abstract_schema_1.AbstractSchema {
    constructor() {
        super({
            _internship: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Internship' },
            _user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            _stars: Number
        });
        this.index({ _user: 1, _internship: 1 }, { unique: true });
    }
}
exports.RatingSchema = RatingSchema;
exports.Rating = mongoose_1.model("Rating", new RatingSchema);
//# sourceMappingURL=rating.schema.js.map