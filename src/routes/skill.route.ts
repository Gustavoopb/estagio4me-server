import * as passport from 'passport'

import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { SkillController } from '../controller/skill.controller'

export class SkillRoute extends AbstractRouter<SkillController> {

    constructor() {
        super("/api/skill", new SkillController)
    }

    public init() {
        this.router.get("/findAll", passport.authenticate('jwt'), this.controller.findAll)
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.controller.findById)
        this.router.post("/insert", passport.authenticate('jwt'), this.controller.insert)
        this.router.post("/insertMany", passport.authenticate('jwt'), this.controller.insertMany)
        this.router.post("/updateOne", passport.authenticate('jwt'), this.controller.findOneAndUpdate)
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.controller.delete)
        super.beUsed()
    }
}