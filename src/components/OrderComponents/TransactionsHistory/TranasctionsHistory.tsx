import './TransactionsHistory.css'
import React from 'react';
import {IonContent, IonPage} from '@ionic/react';
import TransactionsHistoryList from '../TransactionsHistoryList/TransactionsHistoryList';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';

class TransactionsHistory extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            orderHistoryData: []
        }
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Historia transakcji'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div className={'orders-transactions-history-container'}>
                        <TransactionsHistoryList/>
                    </div>
                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        );
    }
}

export default TransactionsHistory;
