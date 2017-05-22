import { NextFunction, Request, Response } from 'express'

import { AbstractController } from "./abstract/abstract.controller"
import { Skill } from '../schema/skill.schema'

export class SkillController extends AbstractController {

    public insert(req: Request, res: Response, next: NextFunction) {
        var skill = new Skill(req.body)
        skill.save((err, docs) => {
            if (err) {
                console.log(err)
                res.status(500).json(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }

    public insertMany(req: Request, res: Response, next: NextFunction) {
        var result = []
        req.body.forEach(sk => {
            var skill = new Skill(sk)
            skill.save((err, docs) => {
                if (err) {
                    console.log(err)
                } else {
                    result.push(docs)
                }
            })
        })
        res.status(200).json(result)
    }

    public findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
        Skill.findByIdAndUpdate(req.body._id, req.body, (err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findById(req: Request, res: Response, next: NextFunction) {
        Skill.findById(req.params.id, (err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                // console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findAll(req: Request, res: Response, next: NextFunction) {
        Skill.find().sort({ name: 1 }).exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public delete(req, res, next) {
        Skill.remove({ "_id": req.params.id }, (err) => {
            if (err) {
                res.status(500).json(err)

            } else {
                res.status(200).send("Skill was deleted")
            }
        })
    }
}