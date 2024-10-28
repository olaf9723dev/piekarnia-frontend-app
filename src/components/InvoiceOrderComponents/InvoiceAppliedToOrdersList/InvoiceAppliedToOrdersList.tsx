import './InvoiceAppliedToOrdersList.css'
import React from 'react';
import InvoiceAppliedToOrdersElement from '../InvoiceAppliedToOrdersElement/InvoiceAppliedToOrdersElement';
import {InvoiceModel} from '../../../models/invoice.model';

class InvoiceAppliedToOrdersList extends React.Component<{
    invoice: InvoiceModel
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.invoice.orders.map((order) => (
                    <InvoiceAppliedToOrdersElement
                        order={order}
                        key={order.id}
                    />
                ))
                }

            </div>
        );
    }
}

export default InvoiceAppliedToOrdersList;
