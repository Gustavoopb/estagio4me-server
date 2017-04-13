import {Schema, SchemaDefinition, SchemaOptions} from 'mongoose'

export abstract class AbstractSchema extends Schema {
    constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
        super(definition, options)
        this.pre("validate", true, function (next, done) {
            let now = new Date()
            if (!this.createdAt) {
                this.createdAt = now
            }
            this.updatedAt = now
            next()
            setTimeout(done, 1000)
        })
        this.pre("findByIdAndUpdate", true, function (next, done) {
            let now = new Date()
            if (!this.createdAt) {
                this.createdAt = now
            }
            this.updatedAt = now
            next()
            setTimeout(done, 1000)
        })
    }
}