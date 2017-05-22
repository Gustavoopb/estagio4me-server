import { Schema, model } from "mongoose"

import { AbstractSchema } from './abstract/abstract.schema'
import { IRatingModel } from "../model/rating.model"

export class RatingSchema extends AbstractSchema {
    constructor() {
        super({
            _internship: { type: Schema.Types.ObjectId, ref: 'Internship' },
            _user: { type: Schema.Types.ObjectId, ref: 'User' },
            _stars: Number
        })
        this.index({ _user: 1, _internship: 1 }, { unique: true })
    }
}

export const Rating = model<IRatingModel>("Rating", new RatingSchema)