import './IssuesList.css'
import React from 'react';
import {IssueModel} from '../../../models/issue.model';
import {getOrderIssues} from '../../../services/issues.service';
import Issue from '../Issue/Issue';

class IssuesList extends React.Component<{
    orderId: number
}, {
    issuesList: IssueModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            issuesList: []
        }
    }

    componentDidMount() {
        getOrderIssues(this.props.orderId)
            .then((res) => {
                this.setState({issuesList: res})
            })
    }

    render() {
        return (
            <div>
                {this.state.issuesList.map((issue) => (
                    <Issue issue={issue}/>
                ))}
            </div>
        );
    }
}

export default IssuesList;
