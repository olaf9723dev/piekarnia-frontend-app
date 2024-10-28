export interface ProductsFiltersModel {
    sortValue: string;
    priceValue: {gt: number, lt?: number};
    rateValue: number;
    typeValue: number;
    rangeValue: {lower: number, upper: number};
}
