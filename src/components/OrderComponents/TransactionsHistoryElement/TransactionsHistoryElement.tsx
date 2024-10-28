import './TransactionsHistoryElement.css'
import React from 'react';
import Card from '../../../UI/Card';
import {OrderDetailsModel} from '../../../models/order-details.model';
import moment from 'moment';

class TransactionsHistoryElement extends React.Component<{
    transactionsHistoryElement: OrderDetailsModel,
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Card className={'transaction-history-element-card'}>
                <div className={'order-history-element-card-details'}>
                    <div className={'order-history-element-card-details-header'}>
                        <div id={'order-number'}>{this.props.transactionsHistoryElement.orderId}</div>
                    </div>
                    <div className={'order-history-element-card-details-status'}>
                        Status: <span
                        style={{color: this.props.transactionsHistoryElement.paymentStatus === 0 ? '#eaa249' : this.props.transactionsHistoryElement.paymentStatus === 1 ? '#d5410c' : this.props.transactionsHistoryElement.paymentStatus === 3 ? '#d5410c' : 'green'}}>{this.props.transactionsHistoryElement.paymentStatusName}</span>
                    </div>
                    <div className={'order-history-element-card-details-status'}>
                        Sposób płatności: {this.props.transactionsHistoryElement.paymentMethod.displayName}
                    </div>
                    <div className={'order-history-element-card-details-date'}>
                        <div>
                            {this.props.transactionsHistoryElement.products ? this.props.transactionsHistoryElement.products.length > 0 && moment(this.props.transactionsHistoryElement.products[0].cartProduct.cart.lastUpdateDate).format('DD.MM.YYYY  HH:mm') : ''}
                        </div>
                        <div id={'transaction-price-history'}>
                            {this.props.transactionsHistoryElement.orderPrice.toFixed(2)} zł
                        </div>
                    </div>
                </div>

            </Card>
        );
    }
}

export default TransactionsHistoryElement;
