import { Schema, SchemaDefinition, SchemaOptions, Query } from 'mongoose'
import { IRatingModel } from "../../model/rating.model";
var timestamp = require('mongoose-timestamp')
export abstract class AbstractSchema extends Schema {
    constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
        super(definition, options)
        this.plugin(timestamp, {
            createdAt: '_createdAt',
            updatedAt: '_updatedAt'
        })
    }
}