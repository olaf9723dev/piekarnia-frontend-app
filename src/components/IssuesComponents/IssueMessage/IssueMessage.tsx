import './IssueMessage.css'
import React from 'react';
import {IssueMessageModel} from '../../../models/issue-message.model';

class IssueMessage extends React.Component<{
    message: IssueMessageModel,
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <span className={this.props.message.author === 'user' && this.props.message.message ? 'user-message message' : this.props.message.author === 'user' && this.props.message.image ? 'user-message message-image' : 'admin-message message'}>
                <div>
                    {this.props.message.message}
                </div>
                {this.props.message.image &&
                    <div>
                        <img src={this.props.message.image}/>
                    </div>
                }
            </span>
        );
    }
}

export default IssueMessage;
