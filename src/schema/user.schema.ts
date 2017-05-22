import * as passportLocalMongoose from 'passport-local-mongoose'

import { Schema, model } from "mongoose"

import { AbstractSchema } from './abstract/abstract.schema'
import { IUserModel } from '../model/user.model'

export class UserSchema extends AbstractSchema {
    constructor() {
        super({
            _firstName: String,
            _lastName: String,
            _username: {
                type: String,
                unique: true
            },
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