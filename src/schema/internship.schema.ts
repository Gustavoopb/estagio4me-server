import { Document, Schema, Model, model } from "mongoose"
import { DatabaseConfig } from '../config/database.config'
import { AbstractSchema } from './abstract/abstract.schema'
import { IInternshipModel } from '../model/internship.model'
import { SkillSchema } from './skill.schema'

class InternshipSchema extends AbstractSchema {
    constructor() {
        super({
            updatedAt: Date,
            createdAt: Date,
            companyName: String,
            role: String,
            requiredSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            preferedSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            compensation: Number,
            isCompanyPrivate: Boolean,
            isCompesationPrivate: Boolean,
            isActive: { type: Boolean, default: false },
            contact: String,
            area: String
        })
        this.pre("validate", true, function (next, done) {
            let now = new Date()
            if (!this.createdAt) {
                this.createdAt = now
            }
            this.updatedAt = now
            next()
            setTimeout(done, 1000)
        })
    }
}

export const Internship = model<IInternshipModel>("Internship", new InternshipSchema)