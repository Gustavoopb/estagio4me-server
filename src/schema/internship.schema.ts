import { Document, Schema, Model, model } from "mongoose"
import { DatabaseConfig } from '../config/database.config'
import { AbstractSchema } from './abstract/abstract.schema'
import { IInternshipModel } from '../model/internship.model'
import { SkillSchema } from './skill.schema'

class InternshipSchema extends AbstractSchema {
    constructor() {
        super({
            companyName: String,
            role: String,
            required: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
            prefered: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
            compensation: Number,
            isCompanyPrivate: Boolean,
            isCompesationPrivate: Boolean,
            isActive: {type: Boolean, default: false},
            area: String
        })
      
    }
}

export const Internship = model<IInternshipModel>("Internship", new InternshipSchema)