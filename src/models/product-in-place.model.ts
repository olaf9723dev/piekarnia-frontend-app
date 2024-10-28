import {PlaceModel} from './place.model';
import {ProductVariantModel} from './product-variant.model';
import {ProductModel} from './product.model';

export interface ProductInPlaceModel {
    price: number;
    id: number;
    product: ProductModel;
    variant: ProductVariantModel[];
    place: PlaceModel;
    customPrice: number;
}
