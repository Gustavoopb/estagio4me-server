import { Document, Schema, Model, model } from "mongoose"
import * as passportLocalMongoose from 'passport-local-mongoose'
import { AbstractSchema } from './abstract/abstract.schema'
import { IUserModel } from '../model/user.model'

class UserSchema extends AbstractSchema {
    constructor() {
        super({
            _updatedAt: Date,
            _createdAt: Date,
            _firstName: String,
            _lastName: String,
            _username: String,
            _email: {
                type: String,
                unique: true
            },
            _isAdmin: {
                type: Boolean,
                default: false
            }
        })
        this.plugin(passportLocalMongoose, {
            usernameLowerCase: true,
            usernameField: '_username',
            passwordField: '_password'
        })
    }
}

export const User = model<IUserModel>("User", new UserSchema)