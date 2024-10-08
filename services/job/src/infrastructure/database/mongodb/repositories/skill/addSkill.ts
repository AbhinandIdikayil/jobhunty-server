import { SkillEntity } from "../../../../../domain/entities/SkillEntity";
import { SkillModel } from "../../model/skillsModel";

export const addSkill = async (data: SkillEntity): Promise<SkillEntity | null> => {
    try {
        if (data) {
            const existing = await SkillModel.findOne({ name: { $regex: new RegExp(`^${data.name}$`, 'i') } });
            if(existing){
                throw new Error('Skill exist')
            }
            const skill = await SkillModel.create(data)
            return skill ? skill as unknown as SkillEntity : null
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}