import { IAbstractModel } from './abstract/abstract.model'
import { ISkillModel } from './skill.model';

export interface IInternshipModel extends IAbstractModel{
    _companyName: String,
    _role: String,
    _requiredSkills: ISkillModel[],
    _preferredSkills: ISkillModel[],
    _compensation: Number,
    _isCompanyPrivate: Boolean,
    _isCompensationPrivate: Boolean,
    _isActive: Boolean,
    _contact: String,
    _area: String,
    _description: String
}