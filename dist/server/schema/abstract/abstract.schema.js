"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AbstractSchema extends mongoose_1.Schema {
    constructor(definition, options) {
        super(definition, options);
        this.pre("validate", true, function (next, done) {
            let now = new Date();
            if (!this.createdAt) {
                this.createdAt = now;
            }
            this.updatedAt = now;
            next();
            setTimeout(done, 10000);
        });
        this.pre("findByIdAndUpdate", true, function (next, done) {
            let now = new Date();
            if (!this.createdAt) {
                this.createdAt = now;
            }
            this.updatedAt = now;
            next();
            setTimeout(done, 10000);
        });
    }
}
exports.AbstractSchema = AbstractSchema;
//# sourceMappingURL=abstract.schema.js.map