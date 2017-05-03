import { IAbstractModel } from "./abstract/abstract.model"

export interface IUserModel extends IAbstractModel{
    _firstName: String
    _lastName: String
    _email: String
    _password: String
    _username: String
}

