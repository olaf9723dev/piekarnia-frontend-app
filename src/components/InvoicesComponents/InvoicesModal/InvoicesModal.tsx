import './InvoicesModal.css';
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
import {doAddInvoiceData, doEditInvoiceData, getDataFromGUS} from '../../../services/client-data.service';


class InvoicesModal extends React.Component<{
    invoiceModalOpen: boolean,
    editModeActive?: boolean,
    parentCallbackInvoice: any,
    saveDisplay: string,
    invoiceDataId?: number,
    name?: string,
    nip?: string,
    companyName?: string,
    address?: string,
    zipCode?: string,
    city?: string,
}, {
    name: string,
    nip: string,
    companyName: string,
    address: string,
    zipCode: string,
    city: string,
    isDefault: boolean,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            nip: '',
            companyName: '',
            address: '',
            zipCode: '',
            city: '',
            isDefault: false,
        };
    }

    get isValid(): boolean {
        return (this.state.nip !== '' || this.props.nip !== '') &&
            (this.state.name !== '' || this.props.name !== '') &&
            (this.state.companyName !== '' || this.props.companyName !== '') &&
            (this.state.address !== '' || this.props.address !== '') &&
            (this.state.zipCode !== '' || this.props.zipCode !== '') &&
            (this.state.city !== '' || this.props.city !== '');
    }

    onTriggerInvoice = (event: any) => {
        event.preventDefault();
        this.props.parentCallbackInvoice(false);
    }

    render() {
        return (
            <IonModal
                isOpen={this.props.invoiceModalOpen}
                onDidDismiss={this.onTriggerInvoice}
                swipeToClose
                mode={'ios'}
            >
                <IonHeader mode={'ios'}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow'} text={''}/>
                        </IonButtons>
                        <IonTitle className={'title-styled'}>Edycja danych do faktury</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="inputs">
                    <IonList>
                        {/*<IonItem>*/}
                        {/*    <IonLabel position={'stacked'}>Nazwa kompletu danych</IonLabel>*/}
                        {/*    <IonInput*/}
                        {/*        value={this.state.name || this.props.name}*/}
                        {/*        onIonChange={e => this.setState({name: e.detail.value || ''})}*/}
                        {/*    />*/}
                        {/*</IonItem>*/}
                        <div className={'gus-div'}>
                            <IonItem lines={'none'} className={'modal-input'} style={{width: '50vw', marginTop: 0}}>
                                <IonInput
                                    placeholder={'NIP'}
                                    value={this.state.nip || this.props.nip}
                                    onIonChange={e => this.setState({nip: e.detail.value || ''})}
                                ><img src={'assets/img/user.svg'} style={{marginRight: '8px'}}/></IonInput>
                            </IonItem>
                            <IonButton
                                color={'light'}
                                shape={'round'}
                                className={'gus-btn'}
                                onClick={() => {
                                    getDataFromGUS(this.state.nip)
                                        .then(result => {
                                            let fullAddress = result.adsiedzmiejscowosc_nazwa + ' ' + result.adsiedznumernieruchomosci
                                            if (result.adsiedznumerlokalu) {
                                                fullAddress += '/' + result.adsiedznumerlokalu
                                            }
                                            let parsedZipCode = result.adsiedzkodpocztowy.slice(0, 2) + '-' + result.adsiedzkodpocztowy.slice(2)
                                            this.setState({
                                                companyName: result.nazwa,
                                                city: result.adsiedzmiejscowosc_nazwa,
                                                address: fullAddress,
                                                zipCode: parsedZipCode
                                            })
                                        })
                                }}>Pobierz z GUS</IonButton>
                        </div>

                        <IonItem lines={'none'} className={'modal-input'}>
                            <IonInput
                                placeholder={'Nazwa firmy'}
                                value={this.state.companyName || this.props.companyName}
                                onIonChange={e => this.setState({companyName: e.detail.value || ''})}
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
                    </IonList>

                    <div id={'invoices-modal-buttons'}>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            disabled={!this.isValid}
                            onClick={this.props.editModeActive ?
                                () => doEditInvoiceData(this.props.invoiceDataId,
                                    this.state.name || this.props.name,
                                    this.state.nip || this.props.nip,
                                    this.state.companyName || this.props.companyName,
                                    this.state.address || this.props.address,
                                    this.state.zipCode || this.props.zipCode,
                                    this.state.city || this.props.city)
                                    .then(this.props.parentCallbackInvoice(false)) :
                                () => doAddInvoiceData(this.state.name,
                                    this.state.nip,
                                    this.state.companyName,
                                    this.state.address,
                                    this.state.zipCode,
                                    this.state.city)
                                    .then(this.props.parentCallbackInvoice(false))
                            }
                        >{this.props.saveDisplay}</IonButton>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            onClick={this.onTriggerInvoice}
                        >Zamknij</IonButton>
                    </div>

                </IonContent>
            </IonModal>
        )
    }
}

export default InvoicesModal;
