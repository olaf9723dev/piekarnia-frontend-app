import './TransactionsHistoryList.css'
import React from 'react';
import {getOrderHistory} from '../../../services/order-history.service';
import OrderHistoryElement from '../OrderHistoryElement/OrderHistoryElement';
import {OrderDetailsModel} from '../../../models/order-details.model';
import {IonLoading} from '@ionic/react';
import {Redirect} from 'react-router-dom';
import TransactionsHistoryElement from '../TransactionsHistoryElement/TransactionsHistoryElement';

class TransactionsHistoryList extends React.Component<{

}, {
    transactionsHistoryList: OrderDetailsModel[],
    ordersLoaded: boolean
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            transactionsHistoryList: [],
            ordersLoaded: true
        }
    }

    componentDidMount() {
        getOrderHistory()
            .then(res => {
                if (res.length === 0) {
                    this.setState({
                        ordersLoaded: false
                    })
                    return <Redirect to={'/app/empty-order-history'}/>
                }
                this.setState({transactionsHistoryList: res, ordersLoaded: false})
            })
    }

    render() {
        return (
            <div>
                {this.state.transactionsHistoryList.map((transaction) => (
                    <TransactionsHistoryElement
                        transactionsHistoryElement={transaction}
                        key={transaction.id}
                    />
                ))
                }

                <IonLoading
                    isOpen={this.state.ordersLoaded}
                    message={'Trwa pobieranie danych'}
                />

            </div>
        );
    }
}

export default TransactionsHistoryList;
