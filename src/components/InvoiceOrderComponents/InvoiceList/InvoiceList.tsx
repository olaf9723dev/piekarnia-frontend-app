import './InvoiceList.css'
import React from 'react';
import {IonButton, IonContent, IonItem, IonPage} from '@ionic/react';
import {InvoiceModel} from '../../../models/invoice.model';
import {getInvoices} from '../../../services/invoices-service';
import Invoice from '../Invoice/Invoice';
import {FaFilter} from 'react-icons/fa';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FilterOrders from '../../FilterComponents/FilterOrders/FilterOrders';
import {OrdersFiltersModel} from '../../../models/orders-filters.model';

class InvoiceList extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {
    invoicesList: InvoiceModel[],
    filterInvoicesModalOpen: boolean,
    selectedFilters: OrdersFiltersModel,
    filteredInvoicesList: InvoiceModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            invoicesList: [],
            filterInvoicesModalOpen: false,
            selectedFilters: {
                sortValue: '',
                priceValue: {gt: 0, lt: 0},
                repeatability: '',
                dateRangeValue: {gt: 0, lt: 0}
            },
            filteredInvoicesList: []
        }
    }

    componentDidMount() {
        getInvoices()
            .then((res) => {
                this.setState({invoicesList: res})
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({filterInvoicesModalOpen: status})
    }

    handleSelectFilters = (res: { sortValue: string, priceValue: { gt: number, lt?: number }, dateRangeValue: { gt?: number, lt: number }, repeatability: string }) => {
        let filteredInvoicesList: InvoiceModel[] = this.state.invoicesList;
        if (res.priceValue) {
            if (res.priceValue.lt) {
                filteredInvoicesList = filteredInvoicesList.filter((invoice) => {
                    // @ts-ignore
                    return invoice.grossPrice >= res.priceValue.gt && invoice.grossPrice <= res.priceValue.lt
                })
            } else {
                filteredInvoicesList = filteredInvoicesList.filter((invoice) => {
                    return invoice.grossPrice >= res.priceValue.gt
                })
            }
        }
        if (res.dateRangeValue.lt !== 0) {
            if (res.dateRangeValue.gt) {
                filteredInvoicesList = filteredInvoicesList.filter((invoice) => {
                    let invoiceDateTimestamp = new Date(invoice.createDate).getTime()
                    const todayDateTimestamp = new Date().getTime()
                    const timeDiff = (todayDateTimestamp - invoiceDateTimestamp) / (1000 * 3600 * 24)
                    // @ts-ignore
                    return timeDiff >= res.dateRangeValue.gt && timeDiff <= res.dateRangeValue.lt
                })
            } else {
                filteredInvoicesList = filteredInvoicesList.filter((invoice) => {
                    let invoiceDateTimestamp = new Date(invoice.createDate).getTime()
                    const todayDateTimestamp = new Date().getTime()
                    const timeDiff = (todayDateTimestamp - invoiceDateTimestamp) / (1000 * 3600 * 24)
                    return timeDiff <= res.dateRangeValue.lt
                })
            }
        }
        if (res.sortValue) {
            // @ts-ignore
            filteredOrderHistoryList = filteredOrderHistoryList.sort((a, b) => {
                if (res.sortValue === 'order_date') {
                    return b.id - a.id
                } else if (res.sortValue === 'order_price') {
                    return b.grossPrice - a.grossPrice
                }
            })
        }
        this.setState({filteredInvoicesList: filteredInvoicesList})
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Lista faktur'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <IonItem className={'filter-div-history-wrapper'}>
                        <div className={'filter-div-order-history'}>
                            <IonButton
                                fill={'clear'}
                                style={{color: '#aaa', fontSize: '18px', height: '24px'}}
                                onClick={() => this.setState({filterInvoicesModalOpen: true})}
                            >
                                Filtry
                                <FaFilter style={{marginLeft: '10px'}}/>
                            </IonButton>
                        </div>
                    </IonItem>

                    <div className={'order-invoice-btn-wrapper'} style={{marginTop: '3vh'}}>
                        <IonButton
                            className={'single-button-order-details order-invoice-btn'}
                            color={'dark'}
                            shape={'round'}
                            routerLink={`/app/invoices/order-invoice/`}
                        >
                            Zamów fakturę
                        </IonButton>
                    </div>

                    <div id={'invoice-list-wrapper'}>
                        {this.state.invoicesList.map((invoice) => (
                                invoice.name &&
                                <Invoice
                                    invoice={invoice}
                                    key={invoice.id}
                                />
                            )
                        )}
                    </div>

                </IonContent>

                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

                <FilterOrders
                    filterOrdersModalOpen={this.state.filterInvoicesModalOpen}
                    callbackCloseModal={this.handleCloseModal}
                    cartId={this.props.cartId}
                    cartProductsCount={this.props.cartProductsCount}
                    callbackSelectFilters={this.handleSelectFilters}
                    source={'invoice_list'}
                />

            </IonPage>
        );
    }
}

export default InvoiceList;
