import { NextFunction, Request, Response } from 'express'

import { AbstractController } from "./abstract/abstract.controller"
import { Profile } from '../schema/profile.schema'

export class ProfileController extends AbstractController {

    public save(req: Request, res: Response, next: NextFunction) {
        var profile = new Profile(req.body)
        console.log(req.user._id)
        Profile.findOneAndUpdate({ _user: req.user._id }, profile, { upsert: true, new: true })
            .populate("_user _likedSkills _experiencedSkills")
            .exec((err, data) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(data)
                }
            })
    }

    public findOne(req: Request, res: Response, next: NextFunction) {
        Profile.findOne({ _user: req.user._id }).populate("_user _likedSkills _experiencedSkills").exec(
            (err, data) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(data)
                }
            }
        )
    }
}