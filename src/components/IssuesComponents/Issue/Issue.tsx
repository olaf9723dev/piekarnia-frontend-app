import './Issue.css'
import React from 'react';
import {IssueModel} from '../../../models/issue.model';
import {IonButton} from '@ionic/react';
import moment from 'moment';

class Issue extends React.Component<{
    issue: IssueModel
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={{marginBottom: '3vh'}}>
                <div id={'issue-num'}>
                    <div>
                        Zgłoszenie #{this.props.issue.id}
                    </div>
                    <div>
                        {moment(this.props.issue.createDate).format('DD.MM.YYYY  HH:mm')}
                    </div>
                </div>

                <div id={'issue-status'}>
                    <div>
                        Status: <span
                        style={{color: this.props.issue.status === 1 ? 'green' : '#d5410c'}}>{this.props.issue.statusName}</span>
                    </div>
                    <div>
                        <IonButton
                            color={'dark'}
                            shape={'round'}
                            className={'single-button-order-details'}
                            routerLink={`/app/order-history/${this.props.issue.order.id}/order-details/issues/${this.props.issue.id}/issue-details`}
                        >
                            Szczegóły zgłoszenia
                        </IonButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default Issue;
