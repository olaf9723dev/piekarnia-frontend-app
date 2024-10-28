import {ProductModel} from './product.model';

export interface ProductImageModel {
    id: number;
    product: ProductModel;
    image: string;
    isPrimary: boolean;
    order: number;
}
