import { UserEntity } from "../../../../domain/entities";
import { authModel } from "../models/authModel";


export const adminLogin = async (email: string,password: string): Promise<UserEntity | null> => {
    try {
        if(email && password) {
            const admin = await authModel.findOne({email})
            if(admin && admin.role == 'admin') {
                if(await admin.password == password){
                    return admin as UserEntity
                } else {
                    throw new Error('Password is incorrect')
                }
            } else {
                throw new Error('Admin not found');
            }
        } else {
            throw new Error('provide email and password')
        }
    } catch (error:Error | any) {
        throw new Error(error?.message)
    }
}