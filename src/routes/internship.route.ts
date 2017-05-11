import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { Internship } from '../schema/internship.schema'
import { Skill } from '../schema/skill.schema';
import * as passport from 'passport'


class InternshipRoute extends AbstractRouter {

    constructor() {
        super("/api/internship")
        this.init()
    }

    public insert(req: Request, res: Response, next: NextFunction) {
        var internship = new Internship(req.body)
        internship.save((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).json(err)
            } else {
                res.status(200).json(data)
            }
        })
    }

    public findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
        var internship = new Internship(req.body)
        Internship.findByIdAndUpdate(internship.get('id'), internship)
            .populate('_preferredSkills _requiredSkills')
            .exec((err, docs) => {
                if (!err) {
                    res.status(200).json(docs)
                } else {
                    console.log(err)
                    res.status(500).json(err)
                }
            })
    }

    public findById(req: Request, res: Response, next: NextFunction) {
        Internship.findById(req.params.id, function (err, docs) {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findAll(req: Request, res: Response, next: NextFunction) {
        Internship.find().populate('_preferredSkills _requiredSkills').exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findByFilter(req: Request, res: Response, next: NextFunction) {
        Internship.find(req.body).populate('_preferredSkills _requiredSkills').sort({ _createdAt: -1 }).exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public findOneByFilter(req: Request, res: Response, next: NextFunction) {
        Internship.findOne(req.body).populate('_preferredSkills _requiredSkills').exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs)
            } else {
                console.log(err)
                res.status(500).json(err)
            }
        })
    }

    public delete(req, res, next) {
        Internship.remove({ "_id": req.params.id }, (err) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json({ message: "Internship was deleted" })
            }
        })

    }

    init() {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete)
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate)
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll)
        this.router.post("/findByFilter", this.findByFilter)
        this.router.post("/findOneByFilter", passport.authenticate('jwt'), this.findOneByFilter)
        this.router.post("/insert", passport.authenticate('jwt'), this.insert)
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById)
        super.beUsed()
    }
}

export default new InternshipRoute().router