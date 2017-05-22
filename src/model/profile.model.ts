import { IAbstractModel } from "./abstract/abstract.model"
import { ISkillModel } from "./skill.model"
import { IUserModel } from "./user.model"

export interface IProfileModel extends IAbstractModel {
    _likedSkills: ISkillModel[]
    _experiencedSkills: ISkillModel[]
    _user: IUserModel
}