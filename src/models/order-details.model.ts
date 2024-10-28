import {DeliveryTypeModel} from './delivery-type.model';
import {PaymentMethodModel} from './payment-method.model';
import {CartProductModel} from './cart-product.model';
import {ClientAddressModel} from './client-address.model';

export interface OrderDetailsModel {
    id: number;
    deliveryType: DeliveryTypeModel;
    deliveryAddress: ClientAddressModel;
    paymentMethod: PaymentMethodModel;
    paymentStatus: number;
    paymentStatusName: string;
    isRepeated: boolean;
    status: number;
    statusName: string;
    products: CartProductModel[];
    orderPrice: number;
    createDate: string;
    notesForOrder: string;
    orderId: string;
    deliveryDate: string;
}
