import { IListCategory , IAddCategoryUsecase, IDeleteCategoryUsecase, IUpdateCategoryUsecase, IAddSectorUsecase } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    addCategoryUsecase:(dependencies:IDependencies) => IAddCategoryUsecase
    listCategoryUsecase:(dependencies:IDependencies) => IListCategory
    deleteCategoryUsecase:(dependencies:IDependencies) => IDeleteCategoryUsecase
    updateCategoryUsecase:(dependencies:IDependencies) => IUpdateCategoryUsecase
    addSectorUsecase:(dependencies:IDependencies) => IAddSectorUsecase
}