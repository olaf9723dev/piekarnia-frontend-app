import {OrderDetailsModel} from './order-details.model';
import {RepeatedDaysModel} from './repeated-days.model';

export interface OrderRepeatabilityModel {
    id: number;
    order: OrderDetailsModel;
    repeatedDays: RepeatedDaysModel[];
    frequency: string;
}
