import { Document, Schema, Model, model } from "mongoose"
import { DatabaseConfig } from '../config/database.config'
import {AbstractSchema} from './abstract/abstract.schema';
import { ISkillModel } from '../model/skill.model'

export class SkillSchema extends AbstractSchema {
    constructor() {
        super({
            updatedAt: Date,
            createdAt: Date,
            name: {
                type: String,
                unique: true,
            }
        })
    }
}

export const Skill = model<ISkillModel>("Skill", new SkillSchema)

