import './OrderHistoryList.css'
import React from 'react';
import OrderHistoryElement from '../OrderHistoryElement/OrderHistoryElement';
import {OrderDetailsModel} from '../../../models/order-details.model';

class OrderHistoryList extends React.Component<{
    orderHistoryList: OrderDetailsModel[],
}, {
}> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                {this.props.orderHistoryList.map((order) => (
                    <OrderHistoryElement
                        orderHistoryElement={order}
                        key={order.id}
                    />
                ))
                }
            </div>
        );
    }
}

export default OrderHistoryList;
