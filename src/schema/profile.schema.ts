import { Schema, model } from 'mongoose'

import { AbstractSchema } from './abstract/abstract.schema'
import { IProfileModel } from '../model/profile.model'

export class ProfileSchema extends AbstractSchema {
    constructor() {
        super({
            _likedSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            _experiencedSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
            _user: { type: Schema.Types.ObjectId, ref: 'User', unique: true }
        })
    }
}

export const Profile = model<IProfileModel>("Profile", new ProfileSchema)