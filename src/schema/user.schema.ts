import { Schema } from 'mongoose';
import { DatabaseConfig } from '../config/database.config';
export var UserSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    email: String,
    name: String
});
UserSchema.pre("save", true, function(next, done) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    this.updatedAt = now;
    next();
    setTimeout(done, 100);
});
UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
