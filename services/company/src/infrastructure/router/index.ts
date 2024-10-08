import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import { verifyToken } from "../../utils/verifyToken";


export const routes = (dependencies: IDependencies) => {
    const router = Router()

    const { getCompany, updateProfile, updateSocialLinks,
        sendRequest, updateRequest, listRequest, getAllCompany,
        getCompanyDetail, searchCompanies } = controller(dependencies)

    //! ROUTE FOR USER

    router.route('/company/:id').get(getCompanyDetail)

    //! ROUTES FOR COMPANY

    router.route('/company').get(verifyToken, getCompany);

    router.route('/company-overview').post(verifyToken, updateProfile);

    router.route('/company-social').put(verifyToken, updateSocialLinks);

    router.route('/compnay-request').post(verifyToken, sendRequest);

    //! ROUTES FOR ADMIN AND USER FUNCTIONALITIES

    router.route('/search-company').get(searchCompanies)
    router.route('/all-company').get(getAllCompany)

    router.route('/update-request').put(updateRequest)

    router.route('/list-request').get(listRequest)

    return router
}