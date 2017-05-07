import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { Rating } from '../schema/rating.schema';
import * as passport from 'passport'
import { IRatingModel } from "../model/rating.model";


class RatingRoute extends AbstractRouter {

    constructor() {
        super("/api/rating")
        this.init()
    }

    public save(req: Request, res: Response, next: NextFunction) {
        var rating = req.body
        Rating.findOneAndUpdate({ _internship: rating._internship, _user: rating._user }, rating, { upsert: true, new: true })
            .populate("_internship _user")
            .exec((err, docs) => {
                if (!err) {
                    res.status(200).json(docs)
                } else {
                    console.log(err)
                    res.status(500).json(err)
                }
            })
    }

    public findOne(req: Request, res: Response, next: NextFunction) {
        Rating.findOne(req.body)
            .populate("_internship _user")
            .exec((err, docs) => {
                if (!err) {
                    res.status(200).json(docs)
                } else {
                    console.log(err)
                    res.status(500).json(err)
                }
            })

    }

    public findByAuthUser(req: Request, res: Response, next: NextFunction) {
        Rating.find({ _user: req.user._id })
            .populate("_internship _user")
            .populate({ path: "_internship", model: "Internship", match: { _isActive: true }, populate: [{ path: "_requiredSkills", model: "Skill" }, { path: "_preferredSkills", model: "Skill" }] })
            .exec((err, docs: IRatingModel[]) => {
                if (!err) {
                    res.status(200).json(docs.filter((rating) => rating._internship))
                } else {
                    console.log(err)
                    res.status(500).json(err)
                }
            })
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Rating.remove({ _user: req.params.userId, _internship: req.params.internshipId }, (err) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json({ message: "Objeto removido." })
            }
        })
    }

    public init() {
        this.router.delete("/delete/:userId/:internshipId", passport.authenticate('jwt'), this.delete)
        this.router.post("/save", passport.authenticate('jwt'), this.save)
        this.router.post("/findOne", passport.authenticate('jwt'), this.findOne)
        this.router.get("/findByAuthUser", passport.authenticate('jwt'), this.findByAuthUser)
        super.beUsed()
    }
}

export default new RatingRoute().router