import './OrderHistory.css'
import React from 'react';
import {IonButton, IonContent, IonItem, IonLoading, IonPage, NavContext} from '@ionic/react';
import OrderHistoryList from '../OrderHistoryList/OrderHistoryList';
import {FaFilter} from 'react-icons/fa';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FilterOrders from '../../FilterComponents/FilterOrders/FilterOrders';
import {getOrderHistory} from '../../../services/order-history.service';
import {Redirect} from 'react-router-dom';
import {OrderDetailsModel} from '../../../models/order-details.model';
import {OrdersFiltersModel} from '../../../models/orders-filters.model';
import {preloaderState$} from '../../../services/event-bus.service';

class OrderHistory extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {
    filterOrdersModalOpen: boolean,
    orderHistoryList: OrderDetailsModel[],
    ordersLoaded: boolean,
    filteredOrderHistoryList: OrderDetailsModel[],
    selectedFilters: OrdersFiltersModel
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            filterOrdersModalOpen: false,
            orderHistoryList: [],
            ordersLoaded: true,
            filteredOrderHistoryList: [],
            selectedFilters: {
                sortValue: '',
                priceValue: {gt: 0, lt: 0},
                repeatability: '',
                dateRangeValue: {gt: 0, lt: 0}
            }
        }
    }

    static contextType = NavContext;

    redirectFunction(destination: string) {
        preloaderState$.next('')
        this.context.navigate(destination)
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
                this.setState({
                    orderHistoryList: res,
                    ordersLoaded: false,
                    filteredOrderHistoryList: res
                })
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({filterOrdersModalOpen: status})
    }

    handleSelectFilters = (res: { sortValue: string, priceValue: { gt: number, lt?: number }, dateRangeValue: { gt?: number, lt: number }, repeatability: string }) => {
        let filteredOrderHistoryList: OrderDetailsModel[] = this.state.orderHistoryList;
        if (res.priceValue) {
            if (res.priceValue.lt) {
                filteredOrderHistoryList = filteredOrderHistoryList.filter((order) => {
                    // @ts-ignore
                    return order.orderPrice >= res.priceValue.gt && order.orderPrice <= res.priceValue.lt
                })
            } else {
                filteredOrderHistoryList = filteredOrderHistoryList.filter((order) => {
                    return order.orderPrice >= res.priceValue.gt
                })
            }
        }
        if (res.dateRangeValue.lt !== 0) {
            if (res.dateRangeValue.gt) {
                filteredOrderHistoryList = filteredOrderHistoryList.filter((order) => {
                    let orderDateTimestamp = new Date(order.createDate).getTime()
                    const todayDateTimestamp = new Date().getTime()
                    const timeDiff = (todayDateTimestamp - orderDateTimestamp) / (1000 * 3600 * 24)
                    // @ts-ignore
                    return timeDiff >= res.dateRangeValue.gt && timeDiff <= res.dateRangeValue.lt
                })
            } else {
                filteredOrderHistoryList = filteredOrderHistoryList.filter((order) => {
                    let orderDateTimestamp = new Date(order.createDate).getTime()
                    const todayDateTimestamp = new Date().getTime()
                    const timeDiff = (todayDateTimestamp - orderDateTimestamp) / (1000 * 3600 * 24)
                    return timeDiff <= res.dateRangeValue.lt
                })
            }
        }
        if (res.repeatability) {
            filteredOrderHistoryList = filteredOrderHistoryList.filter((order) => {
                return order.isRepeated === (res.repeatability === 'repeated')
            })
        }
        if (res.sortValue) {
            // @ts-ignore
            filteredOrderHistoryList = filteredOrderHistoryList.sort((a, b) => {
                if (res.sortValue === 'order_date') {
                    return b.id - a.id
                } else if (res.sortValue === 'order_price') {
                    return b.orderPrice - a.orderPrice
                } else if (res.sortValue === 'order_status') {
                    return b.status - a.status
                }
            })
        }
        this.setState({filteredOrderHistoryList: filteredOrderHistoryList})
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Historia zamówień'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <IonItem className={'filter-div-history-wrapper'}>
                        <div className={'filter-div-order-history'}>
                            <IonButton
                                fill={'clear'}
                                style={{color: '#aaa', fontSize: '18px', height: '24px'}}
                                onClick={() => this.setState({filterOrdersModalOpen: true})}
                            >
                                Filtry
                                <FaFilter style={{marginLeft: '10px'}}/>
                            </IonButton>
                        </div>
                    </IonItem>

                    <div className={'orders-transactions-history-container'}>
                        <OrderHistoryList
                            orderHistoryList={this.state.filteredOrderHistoryList || this.state.orderHistoryList}
                        />
                    </div>
                </IonContent>

                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

                <FilterOrders
                    filterOrdersModalOpen={this.state.filterOrdersModalOpen}
                    callbackCloseModal={this.handleCloseModal}
                    cartId={this.props.cartId}
                    cartProductsCount={this.props.cartProductsCount}
                    callbackSelectFilters={this.handleSelectFilters}
                    source={'orders_history'}
                />

                <IonLoading
                    isOpen={this.state.ordersLoaded}
                    message={'Trwa pobieranie danych'}
                />

            </IonPage>
        );
    }
}

export default OrderHistory;
