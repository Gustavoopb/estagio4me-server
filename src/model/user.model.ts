import { IAbstractModel } from "./abstract/abstract.model"


export interface IUserModel extends IAbstractModel{
    firstName: String
    lastName: String
    email: String
    password: String
    username: String
}

