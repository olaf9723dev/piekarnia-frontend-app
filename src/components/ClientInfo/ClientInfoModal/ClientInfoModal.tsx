import './ClientInfoModal.css';
import React from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {updateClientInfo} from '../../../services/client-data.service';
import {ClientModel} from '../../../models/client.model';


class ClientInfoModal extends React.Component<{
    clientModalOpen: boolean,
    clientInfo: ClientModel,
    closeModalCallback: any,
}, {
    firstName: string,
    lastName: string,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
        };
    }

    get isValid(): boolean {
        return (this.state.firstName !== '' || this.props.clientInfo.user.firstName !== '') &&
            (this.state.lastName !== '' || this.props.clientInfo.user.lastName !== '')
    }

    onCloseModal = () => {
        this.props.closeModalCallback(false);
    }


    render() {
        return (
            <IonModal
                isOpen={this.props.clientModalOpen}
                className={'client-info-modal'}
                onDidDismiss={this.onCloseModal}
                swipeToClose
                mode={'ios'}
            >
                <IonContent className={'inputs'}>
                    <h3 id={'client-info-modal-title'}>Zmień swoje dane</h3>

                    <IonList>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Imię'}
                                value={this.state.firstName || this.props.clientInfo.user.firstName}
                                onIonChange={e => this.setState({firstName: e.detail.value || ''})}
                            ><img src={'assets/img/user.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Nazwisko'}
                                value={this.state.lastName || this.props.clientInfo.user.lastName}
                                onIonChange={e => this.setState({lastName: e.detail.value || ''})}
                            ><img src={'assets/img/user.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                    </IonList>

                    <div id={'client-info-modal-buttons'}>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            disabled={!this.isValid}
                            onClick={() => updateClientInfo(
                                this.state.firstName || this.props.clientInfo.user.firstName,
                                this.state.lastName || this.props.clientInfo.user.lastName
                            )
                                .then(this.onCloseModal)
                            }
                        >Zapisz</IonButton>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            onClick={this.onCloseModal}
                        >Zamknij</IonButton>
                    </div>
                </IonContent>
            </IonModal>
        )
    }
}

export default ClientInfoModal;
