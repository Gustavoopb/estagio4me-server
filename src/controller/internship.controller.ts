import { NextFunction, Request, Response } from 'express'

import { AbstractController } from "./abstract/abstract.controller"
import { Internship } from '../schema/internship.schema'

export class InternshipController extends AbstractController {

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
}