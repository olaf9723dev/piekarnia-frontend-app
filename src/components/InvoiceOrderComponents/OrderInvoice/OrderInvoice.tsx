import './OrderInvoice.css'
import React from 'react';
import {IonButton, IonCheckbox, IonContent, IonIcon, IonItem, IonListHeader, IonPage} from '@ionic/react';
import {OrderDetailsModel} from '../../../models/order-details.model';
import {getOrdersWithoutInvoices, orderInvoice} from '../../../services/invoices-service';
import Card from '../../../UI/Card';
import {addCircleOutline} from 'ionicons/icons';
import {getClientInvoicesData} from '../../../services/client-data.service';
import {ClientInvoiceDataModel} from '../../../models/client-invoice-data.model';
import InvoicesModal from '../../InvoicesComponents/InvoicesModal/InvoicesModal';
import InvoiceDataList from '../../InvoicesComponents/InvoiceDataList/InvoiceDataList';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';

class OrderInvoice extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {
    selectedOrders: number[],
    ordersList: OrderDetailsModel[],
    clientInvoicesData: ClientInvoiceDataModel[],
    invoiceModal: boolean,
    selectedInvoiceData: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedOrders: [],
            ordersList: [],
            clientInvoicesData: [],
            invoiceModal: false,
            selectedInvoiceData: 0
        }
    }

    componentDidMount() {
        Promise.all([getOrdersWithoutInvoices(), getClientInvoicesData()])
            .then((res) => {
                this.setState({ordersList: res[0], clientInvoicesData: res[1]})
            })
    }

    handleCallbackSelectInvoice = (invoiceDataId: number) => {
        this.setState({selectedInvoiceData: invoiceDataId})
    }

    handleCallbackInvoice = (status: boolean) => {
        this.setState({invoiceModal: status})
    }

    updateStateList = (e: any, value: any) => {
        if (e.target.checked) {
            //append to array
            this.setState({
                selectedOrders: this.state.selectedOrders.concat([value])
            })
        } else {
            //remove from array
            this.setState({
                selectedOrders: this.state.selectedOrders.filter((val) => {
                    return val !== value
                })
            })
        }
    }

    get isValid(): boolean {
        return this.state.selectedOrders.length > 0 && this.state.selectedInvoiceData !== 0;
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Zamówienie faktury'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div>
                        <div className={'order-invoice-header'}>
                            Do których zamówień chcesz wygenerować fakturę?
                        </div>
                    </div>

                    <div id={'choose-invoices'}>
                        {this.state.ordersList.map((order) => (
                            <div className={'order-checkbox'}>
                                <div>Zamówienie nr <span style={{fontWeight: 'bold'}}>{order.orderId}</span></div>
                                <div>
                                    <IonCheckbox
                                        value={order.id}
                                        color="light"
                                        onIonChange={(e) => this.updateStateList(e, order.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {this.state.clientInvoicesData.length > 1 &&
                        <IonItem className={'ion-no-padding'} lines={'none'} style={{marginTop: '2vh'}}>
                            <div className={'delivery-address'}>
                                <div>
                                    <IonListHeader
                                        style={{
                                            fontSize: '20px',
                                            padding: 0,
                                        }}>Dane do faktury:</IonListHeader>
                                </div>

                                {this.state.clientInvoicesData.length > 1 ?
                                    <div className={'order-invoice-swiper-wrapper'}>
                                        <InvoiceDataList
                                            data={this.state.clientInvoicesData}
                                            styleSource={'order-invoice'}
                                            callbackSelectInvoice={this.handleCallbackSelectInvoice}
                                        />
                                    </div>
                                    :
                                    <div className={'add-address-cart-wrapper'}>
                                        <Card className={'address-card'}>
                                            <div className={'new-address-inner'}>
                                                <div style={{
                                                    textAlign: 'center',
                                                    fontSize: '20px'
                                                }}>Dodaj nowe dane
                                                </div>
                                                <IonButton
                                                    fill={'clear'}
                                                    className={'plus-btn'}
                                                    style={{marginLeft: 'auto', marginRight: 'auto'}}
                                                    onClick={() => this.setState({invoiceModal: true})}
                                                ><IonIcon className={'plus'}
                                                          icon={addCircleOutline}/></IonButton>
                                            </div>
                                        </Card>
                                    </div>
                                }
                            </div>
                        </IonItem>
                    }

                    <div className={'order-invoice-btn-wrapper'} style={{marginBottom: '15vh'}}>
                        <IonButton
                            className={'custom-button single-button'}
                            color={'dark'}
                            shape={'round'}
                            onClick={() => {
                                orderInvoice(
                                    this.state.selectedOrders,
                                    this.state.selectedInvoiceData
                                )
                            }}
                        >
                            Zamów fakturę
                        </IonButton>
                    </div>
                </IonContent>

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

export default OrderInvoice;
