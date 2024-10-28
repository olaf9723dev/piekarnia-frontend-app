import {IssueImageModel} from './issue-image.model';
import {OrderDetailsModel} from './order-details.model';

export interface IssueModel {
    id: number;
    order: OrderDetailsModel;
    issueType: string;
    customIssueType: string;
    description: string;
    issueImages: IssueImageModel[];
    status: number;
    statusName: string;
    createDate: string
}
