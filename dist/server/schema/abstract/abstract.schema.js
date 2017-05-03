"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AbstractSchema extends mongoose_1.Schema {
    constructor(definition, options) {
        super(definition, options);
        this.pre("validate", true, function (next, done) {
            let now = new Date();
            if (!this._createdAt) {
                this._createdAt = now;
            }
            this._updatedAt = now;
            next();
            setTimeout(done, 1000);
        });
        this.pre("findByIdAndUpdate", true, function (next, done) {
            let now = new Date();
            if (!this._createdAt) {
                this._createdAt = now;
            }
            this._updatedAt = now;
            next();
            setTimeout(done, 1000);
        });
        this.pre("save", true, function (next, done) {
            let now = new Date();
            if (!this._createdAt) {
                this._createdAt = now;
            }
            this._updatedAt = now;
            next();
            setTimeout(done, 1000);
        });
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    set updatedAt(v) {
        this._updatedAt = v;
    }
}
exports.AbstractSchema = AbstractSchema;
//# sourceMappingURL=abstract.schema.js.map