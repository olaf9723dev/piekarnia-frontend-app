import './IssueMessagesList.css'
import React from 'react';
import {IssueMessageModel} from '../../../models/issue-message.model';
import IssueMessage from '../IssueMessage/IssueMessage';

class IssueMessagesList extends React.Component<{
    messages: IssueMessageModel[],

}, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<{ messages: IssueMessageModel[] }>, prevState: Readonly<{}>, snapshot?: any) {
        // @ts-ignore
        document.getElementById('messages-list-container').scrollIntoView({block: 'end'})
    }

    render() {
        return (
            <div id={'messages-list-container'}>
                {this.props.messages.map((message) => (
                    <IssueMessage
                        message={message}
                        key={message.id}
                    />
                ))}
            </div>
        );
    }
}

export default IssueMessagesList;
