export interface OrdersFiltersModel {
    sortValue: string;
    priceValue: {gt: number, lt?: number};
    repeatability: string;
    dateRangeValue: {gt?: number, lt?: number}
}
