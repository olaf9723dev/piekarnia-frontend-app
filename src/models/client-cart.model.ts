export interface ClientCartModel {
    id: number;
    cart: {
        id: number;
        cartCount: number;
        createDate: string;
        lastUpdateDate: string;
        client: {
            birthDate: string;
            id: number;
            notificationsEnabled: boolean;
            points: number;
            telephone: string;
            user: {
                email: string;
                firstName: string;
                id: number;
                lastName: string;
                username: string;
            }
        }
    }
}
