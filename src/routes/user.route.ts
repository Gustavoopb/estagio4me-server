import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { User } from '../schema/user.schema'
import * as passport from 'passport'


class UserRoute extends AbstractRouter {

    constructor() {
        super("/api/user")
        this.init()
    }

    public findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
        User.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findById(req: Request, res: Response, next: NextFunction) {
        User.findById(req.params.id, function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findAll(req: Request, res: Response, next: NextFunction) {
        User.find(function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)   
            }
        })
    }

    public delete(req, res, next) {
        User.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err)
            } else {
                res.send("User was deleted")
            }
        })

    }

    init() {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete)
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate)
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll)
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById)
        super.beUsed()
    }
}

export default new UserRoute().router