import { Document, Schema, Model, model} from "mongoose";
import { IAbstractModel } from "./abstract/abstract.model";
import { UserSchema } from '../schema/user.schema';

interface IUserModel extends IAbstractModel{
    name: String;
    email: String;
}

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);