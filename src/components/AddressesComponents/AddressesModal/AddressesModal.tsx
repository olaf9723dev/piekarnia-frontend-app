import './AddressesModal.css';
import React from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {doAddAddress, doEditAddress} from '../../../services/client-data.service';


class AddressesModal extends React.Component<{
    addressModalOpen: boolean,
    editModeActive?: boolean,
    saveDisplay: string,
    parentCallbackAddress: any,
    addressId?: number,
    addressName?: string,
    name?: string,
    surname?: string,
    address?: string,
    zipCode?: string,
    city?: string,
    comment?: string,
    phoneNumber?: string
}, {
    addressName: string,
    name: string,
    surname: string,
    address: string,
    zipCode: string,
    city: string,
    comment: string,
    isDefault: boolean,
    phoneNumber: string

}> {
    constructor(props: any) {
        super(props);
        this.state = {
            addressName: '',
            name: '',
            surname: '',
            address: '',
            zipCode: '',
            city: '',
            comment: '',
            isDefault: false,
            phoneNumber: ''
        };
    }

    get isValid(): boolean {
        return (this.state.addressName !== '' || this.props.addressName !== '') &&
            (this.state.name !== '' || this.props.name !== '') &&
            (this.state.surname !== '' || this.props.surname !== '') &&
            (this.state.address !== '' || this.props.address !== '') &&
            (this.state.zipCode !== '' || this.props.zipCode !== '') &&
            (this.state.city !== '' || this.props.city !== '') &&
            (this.state.phoneNumber !== '' || this.props.phoneNumber !== '');
    }

    onTriggerAddress = (event: any) => {
        event.preventDefault();
        this.props.parentCallbackAddress(false);
    }


    render() {
        return (
            <IonModal
                isOpen={this.props.addressModalOpen}
                onDidDismiss={this.onTriggerAddress}
                swipeToClose
                mode={'ios'}
            >
                <IonHeader mode={'ios'}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow'} text={''}/>
                        </IonButtons>
                        <IonTitle className={'title-styled'}>Nowy adres dostawy</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="inputs">
                    <IonList>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Nazwa adresu'}
                                value={this.state.addressName || this.props.addressName}
                                onIonChange={e => this.setState({addressName: e.detail.value || ''})}
                            ><img src={'assets/img/user.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Imię'}
                                value={this.state.name || this.props.name}
                                onIonChange={e => this.setState({name: e.detail.value || ''})}
                            ><img src={'assets/img/user.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Nazwisko'}
                                value={this.state.surname || this.props.surname}
                                onIonChange={e => this.setState({surname: e.detail.value || ''})}
                            ><img src={'assets/img/user.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Adres'}
                                value={this.state.address || this.props.address}
                                onIonChange={e => this.setState({address: e.detail.value || ''})}
                            ><img src={'assets/img/address.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Numer telefonu'}
                                value={this.state.phoneNumber || this.props.phoneNumber}
                                onIonChange={e => this.setState({phoneNumber: e.detail.value || ''})}
                            ><img src={'assets/img/phone.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Kod pocztowy'}
                                value={this.state.zipCode || this.props.zipCode}
                                onIonChange={e => this.setState({zipCode: e.detail.value || ''})}
                            ><img src={'assets/img/home.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Miejscowość'}
                                value={this.state.city || this.props.city}
                                onIonChange={e => this.setState({city: e.detail.value || ''})}
                            ><img src={'assets/img/home.svg'} style={{marginRight: '8px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'}>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '2vh', marginBottom: '2vh'}}>
                                <img src={'assets/img/comment.svg'} style={{marginRight: '12px'}}/>
                                <IonLabel position={'stacked'}
                                          style={{color: '#999', marginTop: '1vh'}}>Komentarz</IonLabel>
                            </div>
                            <IonTextarea
                                value={this.state.comment || this.props.comment}
                                onIonChange={e => this.setState({comment: e.detail.value || ''})}
                                className={'modal-comment-input'}
                            />
                        </IonItem>
                    </IonList>

                    <div id={'address-modal-buttons'}>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            disabled={!this.isValid}
                            onClick={this.props.editModeActive ?
                                () => doEditAddress(this.props.addressId,
                                    this.state.addressName || this.props.addressName,
                                    this.state.name || this.props.name,
                                    this.state.surname || this.props.surname,
                                    this.state.address || this.props.address,
                                    this.state.zipCode || this.props.zipCode,
                                    this.state.city || this.props.city,
                                    this.state.comment || this.props.comment,
                                    this.state.phoneNumber || this.props.phoneNumber
                                )
                                    .then(this.props.parentCallbackAddress(false)
                                    ) :
                                () => doAddAddress(this.state.addressName,
                                    this.state.name,
                                    this.state.surname,
                                    this.state.address,
                                    this.state.zipCode,
                                    this.state.city,
                                    this.state.comment,
                                    this.state.phoneNumber
                                )
                                    .then(this.props.parentCallbackAddress(false))
                            }
                        >{this.props.saveDisplay}</IonButton>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            onClick={this.onTriggerAddress}
                        >Zamknij</IonButton>
                    </div>
                </IonContent>
            </IonModal>
        )
    }
}

export default AddressesModal;
