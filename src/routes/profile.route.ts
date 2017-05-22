import * as passport from 'passport'

import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { ProfileController } from '../controller/profile.controller'

class ProfileRoute extends AbstractRouter<ProfileController> {

    constructor() {
        super("/api/profile", new ProfileController)
    }

    public init() {
        this.router.get("/findOne", passport.authenticate('jwt'), this.controller.findOne)
        this.router.post("/save", passport.authenticate('jwt'), this.controller.save)
        super.beUsed()
    }
}

export default new ProfileRoute()