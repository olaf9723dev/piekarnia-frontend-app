export interface CategoryModel {
    id: number;
    image: string;
    isEnabled: boolean;
    name: string;
    parent: {
        id: number;
        image: string;
        isEnabled: boolean;
        name: string;
    };
    dotykackaId: string;
}
