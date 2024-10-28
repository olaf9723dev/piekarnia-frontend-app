import {IssueMessageModel} from './issue-message.model';
import {IssueModel} from './issue.model';

export interface IssueConversationModel {
    id: number;
    issue: IssueModel;
    messages: IssueMessageModel[];
}
