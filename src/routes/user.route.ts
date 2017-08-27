import * as passport from 'passport'

import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { UserController } from '../controller/user.controller'

export class UserRoute extends AbstractRouter<UserController> {

    constructor() {
        super('/api/user', new UserController())
    }

    public init() {
        this.router.get('/findAll', passport.authenticate('jwt'), this.controller.findAll)
        this.router.get('/findById/:id', passport.authenticate('jwt'), this.controller.findById)
        this.router.post('/updateOne', passport.authenticate('jwt'), this.controller.findOneAndUpdate)
        this.router.delete('/delete/:id', passport.authenticate('jwt'), this.controller.delete)
        super.beUsed()
    }
}