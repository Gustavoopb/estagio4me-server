"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var timestamp = require('mongoose-timestamp');
class AbstractSchema extends mongoose_1.Schema {
    constructor(definition, options) {
        super(definition, options);
        this.plugin(timestamp, {
            createdAt: '_createdAt',
            updatedAt: '_updatedAt'
        });
    }
}
exports.AbstractSchema = AbstractSchema;
//# sourceMappingURL=abstract.schema.js.map