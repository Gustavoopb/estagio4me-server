import { IAbstractModel } from "./abstract/abstract.model"


export interface IUserModel extends IAbstractModel{
    name: String
    lastName: String
    email: String
    password: String
}

