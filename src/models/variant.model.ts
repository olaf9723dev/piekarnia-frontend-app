import {VariantGroupModel} from './variant-group.model';

export interface VariantModel {
    id: number;
    name: string;
    group: VariantGroupModel;
    extraPrice: number;
}
