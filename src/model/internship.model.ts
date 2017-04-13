import { IAbstractModel } from './abstract/abstract.model'
import { ISkillModel } from './skill.model';

export interface IInternshipModel extends IAbstractModel{
    companyName: String,
    role: String,
    requiredSkills: ISkillModel[],
    preferedSkills: ISkillModel[],
    compensation: Number,
    isCompanyPrivate: Boolean,
    isCompesationPrivate: Boolean,
    isActive: Boolean,
    contact: String,
    area: String
}