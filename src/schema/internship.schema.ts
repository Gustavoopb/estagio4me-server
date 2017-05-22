import { Schema, model } from "mongoose"

import { AbstractSchema } from './abstract/abstract.schema'
import { IInternshipModel } from '../model/internship.model'

export class InternshipSchema extends AbstractSchema {
    constructor() {
        super({
            _companyName: String,
            _role: String,
            _requiredSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            _preferredSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
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