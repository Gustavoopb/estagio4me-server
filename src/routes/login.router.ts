import * as passport from 'passport'

import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { LoginController } from "../controller/login.controller"

export class LoginRoute extends AbstractRouter<LoginController> {

    constructor() {
        super("/api/login", new LoginController())
    }

    public init() {
        this.router.get("/reAuth", passport.authenticate('jwt'), this.controller.reAuth)
        this.router.post("/changePassword", this.controller.changePassword)
        this.router.post("/checkEmailUsername", this.controller.checkEmailUsername)
        this.router.post("/login", passport.authenticate('local'), this.controller.login)
        this.router.post("/recoverPassword", this.controller.recoverPassword)
        this.router.post("/singUp", this.controller.singUp)
        super.beUsed()
    }
}