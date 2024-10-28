import React from 'react';
import {getClientInfo} from '../../services/client-data.service';
import {ClientModel} from '../../models/client.model';
import './ClientInfo.css'
import ClientInfoModal from './ClientInfoModal/ClientInfoModal';

class ClientInfo extends React.Component<{}, {
    clientInfo: ClientModel,
    clientInfoModalOpen: boolean
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            clientInfo: {
                birthDate: null,
                id: 0,
                notificationsEnabled: false,
                points: 0,
                telephone: '',
                user: {id: 0, username: '', email: '', firstName: '', lastName: ''}
            },
            clientInfoModalOpen: false
        }
    }

    componentDidMount() {
        getClientInfo()
            .then((result) => {
                if (result.length > 0) {
                    this.setState({clientInfo: result[0]})
                }
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({clientInfoModalOpen: status})
    }

    render() {
        return (
            <div id={'client-info-div'}>
                {
                    this.state.clientInfo &&
                    <div>
                        <p style={{fontSize: '18px'}}><b>{this.state.clientInfo.user.username}</b></p>
                        <p style={{color: '#999'}}>{this.state.clientInfo.user.email}</p>
                        <p style={{color: '#f1a243'}}>{this.state.clientInfo.points} punktów lojalnościowych</p>
                        <img
                            src={'assets/img/pencil.svg'}
                            className={'edit-pencil-user'}
                            onClick={() => this.setState({clientInfoModalOpen: true})}
                        />
                    </div>
                }
                <hr style={{width: '90vw', backgroundColor: '#eee'}}/>

                <div style={{position: 'absolute', bottom: 0}}>
                    <ClientInfoModal
                        clientModalOpen={this.state.clientInfoModalOpen}
                        clientInfo={this.state.clientInfo}
                        closeModalCallback={this.handleCloseModal}
                    />
                </div>
            </div>
        );
    }
}

export default ClientInfo;
