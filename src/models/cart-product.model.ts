import {ProductInPlaceModel} from './product-in-place.model';
import {ClientCartModel} from './client-cart.model';
import {ProductVariantModel} from './product-variant.model';

export interface CartProductModel {
    cartProduct: ClientCartModel;
    extra_price: number;
    id: number;
    quantity: number;
    variant: ProductInPlaceModel;
    place: number;
    selectedVariant: number;
    selectedProductVariant: ProductVariantModel;
    productPriceSum: number;
}
