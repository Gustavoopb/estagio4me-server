import {Document} from 'mongoose';

export interface IAbstractModel extends Document {
    createdAt: Date;
    updatedAt: Date;
}