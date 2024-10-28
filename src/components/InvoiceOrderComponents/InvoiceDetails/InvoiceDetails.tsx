import './InvoiceDetails.css'
import React from 'react';
import {IonButton, IonContent, IonItem, IonPage} from '@ionic/react';
import {InvoiceModel} from '../../../models/invoice.model';
import {getInvoiceData} from '../../../services/invoices-service';
import moment from 'moment';
import InvoiceAppliedToOrdersList from '../InvoiceAppliedToOrdersList/InvoiceAppliedToOrdersList';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';

class InvoiceDetails extends React.Component<{
    cartId: number,
    cartProductsCount: number
}, {
    invoiceData: InvoiceModel,
    invoiceId: any
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            invoiceData: {
                id: 0,
                name: '',
                invoice: '',
                netPrice: 0,
                grossPrice: 0,
                status: 0,
                statusName: '',
                createDate: '',
                orders: []
            },
            invoiceId: window.location.pathname.split('/').at(-3)
        }
    }

    componentDidMount() {
        getInvoiceData(this.state.invoiceId)
            .then((res) => {
                this.setState({invoiceData: res[0]})
            })
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Szczegóły faktury'} cartId={this.props.cartId} cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <IonItem>
                        <div className={'invoice-details-header-wrapper'}>
                            <div className={'invoice-details-header'}>
                                <div style={{fontSize: '18px', fontWeight: 'bold'}}>Faktura nr {this.state.invoiceData.name}</div>
                                <div>{this.state.invoiceData.createDate ? moment(this.state.invoiceData.createDate).format('DD.MM.YYYY') : ''}</div>
                            </div>
                            <div className={'invoice-details-header'}>
                                <div>{this.state.invoiceData.netPrice + ' zł netto'}</div>
                                <div>{this.state.invoiceData.grossPrice + ' zł brutto'}</div>
                            </div>
                        </div>
                    </IonItem>

                    {this.state.invoiceData ?
                        <div>
                            <div className={'apply-to-orders'}>Dotyczy zamówień:</div>
                            <InvoiceAppliedToOrdersList
                                invoice={this.state.invoiceData}
                            />
                        </div> : <div></div>
                    }
                    <div id={'download-invoice-btn'}>
                        <IonButton
                            className={'custom-button single-button'}
                            color={'dark'}
                            shape={'round'}
                            routerLink={''}
                        >
                            Pobierz fakturę
                        </IonButton>
                    </div>

                </IonContent>
            </IonPage>
        );
    }
}

export default InvoiceDetails;
