import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { Skill } from '../schema/skill.schema';
import * as passport from 'passport'


class SkillRoute extends AbstractRouter {

    constructor() {
        super("/api/skill")
        this.init()
    }

    public insert(req: Request, res: Response, next: NextFunction) {
        var skill = new Skill(req.body)
        skill.save((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(200).json(data)
            }
        })
    }

    public findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
        Skill.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
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
        Skill.findById(req.params.id, function (err, docs) {
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
        Skill.find((err, docs) => {
            if (!err) {
                console.log(req.headers)
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).send(err)
                throw err
            }
        })
    }

    public delete(req, res, next) {
        Skill.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err)
                throw err
            } else {
                res.send("Skill was deleted")
            }
        })

    }

    init() {
        this.router.delete("/delete/:id", this.delete)
        this.router.post("/updateOne", this.findOneAndUpdate)
        this.router.get("/findAll", this.findAll)
        this.router.post("/insert", this.insert)
        this.router.get("/findById/:id", this.findById)
        super.beUsed()
    }
}

export default new SkillRoute().router