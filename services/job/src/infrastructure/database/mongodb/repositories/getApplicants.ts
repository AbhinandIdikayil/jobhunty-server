import { ApplicantsEntity } from "../../../../domain/entities"
import { applicantModel } from "../model/applicantModel"
import { jobModel } from "../model/jobModel"


export const getApplicants = async (companyId: string): Promise<ApplicantsEntity[] | null> => {
    try {
        const applicants = await applicantModel.find({companyId}).populate('jobId').populate('userId')
        if(applicants.length > 0){
            return applicants as unknown as ApplicantsEntity[]
        } else {
            return null
        }
    } catch (error: Error | any) {
        throw new Error(error?.message)
    }
}