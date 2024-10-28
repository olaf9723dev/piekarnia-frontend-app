import {OrderDetailsModel} from './order-details.model';

export interface InvoiceModel {
    id: number;
    orders: OrderDetailsModel[];
    name: string;
    invoice: string;
    netPrice: number;
    grossPrice: number;
    createDate: string;
    status: number;
    statusName: string;
}
