import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { producerService } from "../../config/rabbitmq";


export const forgotpasswordController = (dependencies: IDependencies) => {
    const {usecases:{forgotPasswordUsecase}} = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email , newPassword } = req.body
            console.log(req.body)
            if (email) {
                let data = await forgotPasswordUsecase(dependencies).execute(email , newPassword)
                if(data) {
                    // await messageHandler.sendNewPassword(data)
            //$ HERE THIS PRODUCER IS USED TO SEND THE CHANGED PASSWORD TO USER OR
            //$ COMPNAY SERVICE
                    await producerService.publishToUserQueueForPassword(data)
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json(data)
                }
            } else {
                throw new Error('Please enter password')
            }
        } catch (error) {
            next(error)
        }
    }
}