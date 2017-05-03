import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose'

export abstract class AbstractSchema extends Schema {
    private _createdAt: Date
    private _updatedAt: Date

    constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
        super(definition, options)
        this.pre("validate", true, function (next, done) {
            let now = new Date()
            if (!this._createdAt) {
                this._createdAt = now
            }
            this._updatedAt = now
            next()
            setTimeout(done, 1000)
        })

        this.pre("findByIdAndUpdate", true, function (next, done) {
            let now = new Date()
            if (!this._createdAt) {
                this._createdAt = now
            }
            this._updatedAt = now
            next()
            setTimeout(done, 1000)
        })

        this.pre("save", true, function (next, done) {
            let now = new Date()
            if (!this._createdAt) {
                this._createdAt = now
            }
            this._updatedAt = now
            next()
            setTimeout(done, 1000)
        })
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }

    public set updatedAt(v: Date) {
        this._updatedAt = v
    }
}