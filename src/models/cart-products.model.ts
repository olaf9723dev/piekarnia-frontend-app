import {CartProductModel} from './cart-product.model';

export interface CartProductsModel {
    [id: number]: CartProductModel[];
}
