import {ProductModel} from './product.model';

export interface ProductDescriptionModel {
    product: ProductModel;
    name: string;
    content: string;
}
