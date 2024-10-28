import {ProductModel} from './product.model';
import {VariantModel} from './variant.model';

export interface ProductVariantModel {
    id: number;
    product: ProductModel;
    variant: VariantModel[];
    extraPrice: number;
    useCustomStock: boolean
    stock: number;
    unit: number;
    deliveryTime: number;
    image: string;
    weight: number;
    isEnabled: boolean;
    unitName: string
}
