import { Document, Schema, Model, model } from "mongoose"
import { AbstractSchema } from './abstract/abstract.schema'
import { IInternshipModel } from '../model/internship.model'
import { SkillSchema } from './skill.schema'

class InternshipSchema extends AbstractSchema {
    constructor() {
        super({
            _updatedAt: Date,
            _createdAt: Date,
            _companyName: String,
            _role: String,
            _requiredSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            _preferedSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            _compensation: Number,
            _isCompanyPrivate: { type: Boolean, default: false },
            _isCompensationPrivate: { type: Boolean, default: false },
            _isActive: { type: Boolean, default: false },
            _contact: String,
            _area: String,
            _description: String
        })
    }
}

export const Internship = model<IInternshipModel>("Internship", new InternshipSchema)