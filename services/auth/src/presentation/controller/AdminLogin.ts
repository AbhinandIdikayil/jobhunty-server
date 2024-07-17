import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { loginValidator } from "../../utils/validator/loginValidator"




export const adminLoginController = (dependencies: IDependencies) => {
    const {usecases:{adminLoginUsecase}} = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            const { value , error } = loginValidator.validate(req.body)
            if(error){
                throw new Error(error?.message)
            }
            const {email , password} = value
            const data = await adminLoginUsecase(dependencies).execute(email,password)
            if(data) {
                return res.status(200).json(data)
            } else {
                return res.status(400).json('something  has happened')
            }
        } catch (error) {
            next(error)
        }
    }
}