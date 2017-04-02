import { IAbstractModel } from './abstract/abstract.model'
import { ISkillModel } from './skill.model';

export interface IInternshipModel extends IAbstractModel{
    companyName: String,
    role: String,
    required: ISkillModel[],
    prefered: ISkillModel[],
    compensation: Number,
    isCompanyPrivate: Boolean,
    isCompesationPrivate: Boolean,
    isActive: Boolean,
    area: String
}