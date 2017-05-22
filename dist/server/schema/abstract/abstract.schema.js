"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timestamp = require("mongoose-timestamp");
const mongoose_1 = require("mongoose");
class AbstractSchema extends mongoose_1.Schema {
    constructor(definition, options) {
        definition.__v = { type: Number, select: false };
        super(definition, options);
        this.plugin(timestamp, {
            createdAt: '_createdAt',
            updatedAt: '_updatedAt'
        });
    }
}
exports.AbstractSchema = AbstractSchema;
//# sourceMappingURL=abstract.schema.js.map