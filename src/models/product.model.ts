import {CategoryModel} from './category.model';

export interface ProductModel {
    id: number;
    avgRate: number;
    name: string;
    category: CategoryModel;
    netPrice: number;
    vatBase: number;
    shortDescription: string;
    description: string;
    isPromo: boolean;
    isNew: boolean;
    // similarProducts: ;
    isEnabled: boolean;
    productCode: string;
    // tags: ;
    // availableDeliveryTypes: ;
    nutrition: string;
    fat: number;
    fattyAcids: number;
    carbohydrates: number;
    sugar: number;
    protein: number;
    fiber: number;
    salt: number;
}
