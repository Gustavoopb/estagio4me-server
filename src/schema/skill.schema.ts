import { AbstractSchema } from './abstract/abstract.schema'
import { ISkillModel } from '../model/skill.model'
import { model } from "mongoose"

export class SkillSchema extends AbstractSchema {
    constructor() {
        super({
            _name: {
                type: String,
                unique: true,
            }
        })
    }
}

export const Skill = model<ISkillModel>("Skill", new SkillSchema)

