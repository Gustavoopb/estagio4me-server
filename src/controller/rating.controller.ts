import { NextFunction, Request, Response } from 'express'

import { AbstractController } from "./abstract/abstract.controller"
import { Rating } from '../schema/rating.schema'

export class RatingController extends AbstractController {

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
        Rating.find({ _user: req.user._id }).sort({ _stars: 1 })
            .populate("_internship _user")
            .populate({ path: "_internship", model: "Internship", match: { _isActive: true }, populate: [{ path: "_requiredSkills", model: "Skill" }, { path: "_preferredSkills", model: "Skill" }] })
            .exec((err, docs) => {
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
}
