import { Document, Schema, Model, model } from "mongoose"
import { DatabaseConfig } from '../config/database.config'
import * as passportLocalMongoose from 'passport-local-mongoose'
import { AbstractSchema } from './abstract/abstract.schema'
import { IUserModel } from '../model/user.model'

class UserSchema extends AbstractSchema {
    constructor() {
        super({
            updatedAt: Date,
            createdAt: Date,
            firstName: String,
            secondName: String,
            username: String,
            email: {
                type: String,
                unique: true
            }
        })
        this.plugin(passportLocalMongoose, {
            usernameLowerCase: true
        })
    }
}

export const User = model<IUserModel>("User", new UserSchema)