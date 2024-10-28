import './Invoice.css'
import React from 'react';
import {InvoiceModel} from '../../../models/invoice.model';
import Card from '../../../UI/Card';
import moment from 'moment';
import {IonButton} from '@ionic/react';

class Invoice extends React.Component<{
    invoice: InvoiceModel
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card className={'transaction-history-element-card invoice-card'} style={{height: '20vh'}}>
                <div className={'order-history-element-card-details'}>
                    <div className={'order-history-element-card-details-header'}>
                        <div id={'order-number'}>{this.props.invoice.name}</div>
                    </div>
                    <div className={'order-history-element-card-details-date'}>
                        <div>
                            {moment(this.props.invoice.createDate).format('DD.MM.YYYY  HH:mm')}
                        </div>
                        <div id={'transaction-price-history'}>
                            {this.props.invoice.grossPrice && this.props.invoice.grossPrice.toFixed(2) + ' zł'}
                        </div>
                    </div>
                    <div id={'invoice-details-btn'}>
                        <IonButton
                            className={'single-button-order-details'}
                            color={'light'}
                            shape={'round'}
                            style={{width: "80%"}}
                            routerLink={`/app/invoices/${this.props.invoice.id}/invoice-details/`}
                        >
                            Szczegóły faktury
                        </IonButton>
                    </div>
                </div>
            </Card>
        );
    }
}

export default Invoice;
