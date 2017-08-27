import * as passport from 'passport'

import { NextFunction, Request, Response } from 'express'

import { AbstractRouter } from './abstract/abstract.router'
import { RatingController } from "../controller/rating.controller"

export class RatingRoute extends AbstractRouter<RatingController> {

    constructor() {
        super("/api/rating", new RatingController())
    }

    public init() {
        this.router.get("/findByAuthUser", passport.authenticate('jwt'), this.controller.findByAuthUser)
        this.router.post("/findOne", passport.authenticate('jwt'), this.controller.findOne)
        this.router.post("/save", passport.authenticate('jwt'), this.controller.save)
        this.router.delete("/delete/:userId/:internshipId", passport.authenticate('jwt'), this.controller.delete)
        super.beUsed()
    }
}