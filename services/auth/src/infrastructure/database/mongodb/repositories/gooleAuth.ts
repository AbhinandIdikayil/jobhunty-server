import { UserEntity } from "../../../../domain/entities";
import { generateRandomString } from "../../../../utils/password/generatePassword";
import { authModel } from "../models/authModel";



export const googleAuth = async (email: string, name: string, role: string, page: string): Promise<UserEntity | null> => {
    try {
        let user = await authModel.findOne({ email });
        if (page == "login" && user) {
            return user as UserEntity
        }
        if (!user) {
            let data = await authModel.create({
                name,
                email,
                role,
                password: generateRandomString(),
            })
            user = await authModel.findOne({ email });
        }
        return user as UserEntity
    } catch (error: any | Error) {
        console.log(error)
        throw new Error(error.message)
    }
}