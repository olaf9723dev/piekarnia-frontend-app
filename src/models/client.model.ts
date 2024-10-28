export interface ClientModel {
    birthDate: any;
    id: number;
    notificationsEnabled: boolean;
    points: number;
    telephone: string;
    user: {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string
    }
}
