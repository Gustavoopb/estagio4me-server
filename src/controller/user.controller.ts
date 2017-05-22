import { NextFunction, Request, Response } from 'express'

import { AbstractController } from './abstract/abstract.controller'
import { User } from '../schema/user.schema'

export class UserController extends AbstractController {

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
}