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
                res.status(500).send(err)
                throw err
            }
        })
    }

    public findById(req: Request, res: Response, next: NextFunction) {
        User.findById(req.params.id, function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public findAll(req: Request, res: Response, next: NextFunction) {
        console.log("Chegou aqui")
        User.findOne(function (err, docs) {
            if (!err) {
                console.log(req.headers,docs)
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public delete(req, res, next) {
        User.remove({ __v: 0 }, function (err) {
            if (err) {
                res.json(err)
            }
        })
        res.send("Deu certo")
    }

    init() {
        this.router.delete("/delete", this.delete)
        this.router.post("/updateOne", this.findOneAndUpdate)
        this.router.get("/findAll", this.findAll)
        this.router.get("/findById/:id", this.findById)
        super.beUsed()
    }
}

export default new UserRoute().router