import {UserModel} from './user.model';

export interface NotificationModel {
    id: number;
    title: string;
    content: string;
    createDate: string;
    user: UserModel;
}
