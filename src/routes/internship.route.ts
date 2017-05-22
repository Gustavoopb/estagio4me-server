import * as passport from 'passport'

import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { InternshipController } from '../controller/internship.controller'

class InternshipRoute extends AbstractRouter<InternshipController> {

    constructor() {
        super("/api/internship", new InternshipController())
    }

    public init() {
        this.router.get("/findAll", passport.authenticate('jwt'), this.controller.findAll)
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.controller.findById)
        this.router.post("/findByFilter", this.controller.findByFilter)
        this.router.post("/findOneByFilter", passport.authenticate('jwt'), this.controller.findOneByFilter)
        this.router.post("/insert", passport.authenticate('jwt'), this.controller.insert)
        this.router.post("/updateOne", passport.authenticate('jwt'), this.controller.findOneAndUpdate)
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.controller.delete)
        super.beUsed()
    }
}

export default new InternshipRoute()