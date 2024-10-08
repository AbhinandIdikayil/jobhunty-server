import { UserEntity } from "../../../../domain/entities";
import { userModel } from "../model/userModel";


export const updateProfile = async (data: UserEntity): Promise<UserEntity | null> => {
    try {
        if (data) {
            const user = await userModel.findOne({ email: data?.email })
            let createdOrUpdated;
            if (user) {
                createdOrUpdated = await userModel.findOneAndUpdate(
                    { email: data?.email },
                    {
                        $set: { ...data }
                    },
                    { new: true }
                )
                if (createdOrUpdated?.about && createdOrUpdated?.socialLink.length > 0 && createdOrUpdated?.skills.length > 0 && createdOrUpdated.phonenumber
                    && createdOrUpdated.education.length > 0
                ) {
                    createdOrUpdated.profileCompleted = true
                    await createdOrUpdated.save()
                }
                if (createdOrUpdated) {
                    return createdOrUpdated as unknown as UserEntity
                } else {
                    return null
                }
            } else {
                createdOrUpdated = await userModel.create({ ...data })
                return createdOrUpdated ? createdOrUpdated as unknown as UserEntity : null
            }
        } else {
            throw new Error('data not provided')
        }
    } catch (error: any | Error) {
        throw new Error(error?.message)
    }
}