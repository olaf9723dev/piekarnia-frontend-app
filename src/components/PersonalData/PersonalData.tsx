import './PersonalData.css'
import React from 'react';
import ClientAddressList from '../AddressesComponents/ClientAddressList/ClientAddressList';
import {getClientAddresses, getClientInvoicesData} from '../../services/client-data.service';
import InvoiceDataList from '../InvoicesComponents/InvoiceDataList/InvoiceDataList';
import {IonButton, IonContent, IonIcon, IonListHeader, IonPage} from '@ionic/react';
import InvoicesModal from '../InvoicesComponents/InvoicesModal/InvoicesModal';
import AddressesModal from '../AddressesComponents/AddressesModal/AddressesModal';
import {ClientAddressModel} from '../../models/client-address.model';
import {ClientInvoiceDataModel} from '../../models/client-invoice-data.model';
import Card from '../../UI/Card';
import {addCircleOutline} from 'ionicons/icons';
import {personalDataUpdateDate$} from '../../services/event-bus.service';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

class PersonalData extends React.Component<{
    cartId: any,
    cartProductsCount: number,
    tabSelected: number
}, {
    clientAddresses: ClientAddressModel[],
    clientInvoicesData: ClientInvoiceDataModel[],
    addressModal: boolean,
    invoiceModal: boolean,
    personalDataUpdateDate: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            clientAddresses: [],
            clientInvoicesData: [],
            addressModal: false,
            invoiceModal: false,
            personalDataUpdateDate: 0
        }
        personalDataUpdateDate$.subscribe(res => this.setState({personalDataUpdateDate: res}))
    }

    componentDidMount() {
        Promise.all(
            [getClientAddresses(), getClientInvoicesData()]
        )
            .then(res => {
                this.setState({
                    clientAddresses: res[0],
                    clientInvoicesData: res[1]
                })
            })
    }

    handleCallbackInvoice = (status: boolean) => {
        this.setState({invoiceModal: status})
    }

    handleCallbackAddress = (status: boolean) => {
        this.setState({addressModal: status})
    }

    handleCallbackRemoveAddress = (addressId: number) => {
        this.setState({
            clientAddresses: this.state.clientAddresses.filter(address => address.id !== addressId)
        })
    }

    handleCallbackRemoveInvoice = (invoiceId: number) => {
        this.setState({
            clientInvoicesData: this.state.clientInvoicesData.filter(invoice => invoice.id !== invoiceId)
        })
    }

    handleCallbackSetDefaultInvoice = (invoiceId: number) => {
        let invoiceData = this.state.clientInvoicesData;
        invoiceData.forEach(invoice => invoice.isDefault = false)
        let setToDefault = invoiceData.find(invoice => invoice.id === invoiceId)
        // @ts-ignore
        setToDefault.isDefault = true
        this.setState({
            clientInvoicesData: invoiceData
        })
    }

    handleCallbackSetDefaultAddress = (addressId: number) => {
        let addressData = this.state.clientAddresses;
        addressData.forEach(address => address.isDefault = false)
        let setToDefault = addressData.find(address => address.id === addressId)
        // @ts-ignore
        setToDefault.isDefault = true
        this.setState({
            clientAddresses: addressData
        })
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Moje dane'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div id={'data-cards-container'}>

                        <div>
                            <IonListHeader
                                style={{fontSize: '20px', padding: 0, marginBottom: '4vh', marginLeft: '5vw'}}>Adres
                                dostawy:</IonListHeader>
                            {this.state.clientAddresses.length > 1 ?
                                <ClientAddressList
                                    data={this.state.clientAddresses}
                                    styleSource={'personal-data'}
                                    key={this.state.personalDataUpdateDate}
                                    callbackRemoveAddress={this.handleCallbackRemoveAddress}
                                    callbackSetDefaultAddress={this.handleCallbackSetDefaultAddress}
                                />
                                :
                                <Card className={'address-card'}>
                                    <div id={'new-address-inner'}>
                                        <div style={{textAlign: 'center', fontSize: '20px'}}>Dodaj nowy adres</div>
                                        <IonButton
                                            fill={'clear'}
                                            className={'plus-btn'}
                                            style={{marginLeft: 'auto', marginRight: 'auto'}}
                                            onClick={() => this.setState({addressModal: true})}
                                        ><IonIcon className={'plus'} icon={addCircleOutline}/></IonButton>
                                    </div>
                                </Card>
                            }
                        </div>

                        <div style={{marginTop: '2vh'}}>
                            <IonListHeader
                                style={{fontSize: '20px', padding: 0, marginBottom: '2vh', marginLeft: '5vw'}}>Dane do
                                faktury:</IonListHeader>
                            {this.state.clientInvoicesData.length > 1 ?
                                <InvoiceDataList
                                    data={this.state.clientInvoicesData}
                                    key={this.state.personalDataUpdateDate}
                                    styleSource={'personal-data'}
                                    callbackRemoveInvoice={this.handleCallbackRemoveInvoice}
                                    callbackSetDefaultInvoice={this.handleCallbackSetDefaultInvoice}
                                />
                                :
                                <Card className={'address-card'}>
                                    <div id={'new-address-inner'}>
                                        <div style={{textAlign: 'center', fontSize: '20px'}}>Dodaj nowe dane do
                                            faktury
                                        </div>
                                        <IonButton
                                            fill={'clear'}
                                            className={'plus-btn'}
                                            style={{marginLeft: 'auto', marginRight: 'auto'}}
                                            onClick={() => this.setState({invoiceModal: true})}
                                        ><IonIcon className={'plus'} icon={addCircleOutline}/></IonButton>
                                    </div>
                                </Card>
                            }
                        </div>

                    </div>
                </IonContent>

                <AddressesModal
                    addressModalOpen={this.state.addressModal}
                    parentCallbackAddress={this.handleCallbackAddress}
                    saveDisplay={'Zapisz'}
                />

                <InvoicesModal
                    invoiceModalOpen={this.state.invoiceModal}
                    parentCallbackInvoice={this.handleCallbackInvoice}
                    saveDisplay={'Zapisz'}
                />
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        );
    }
}

export default PersonalData;
