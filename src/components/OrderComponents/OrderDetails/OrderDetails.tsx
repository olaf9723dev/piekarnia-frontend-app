import './OrderDetails.css'
import React from 'react';
import {
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonList,
    IonListHeader,
    IonLoading,
    IonPage,
} from '@ionic/react';
import {
    copyToCart,
    getOrderDetails,
    getOrderInvoice,
    getOrderRepeatability,
    turnOffRepeat
} from '../../../services/order-history.service';
import {OrderDetailsModel} from '../../../models/order-details.model';
import {InvoiceModel} from '../../../models/invoice.model';
import moment from 'moment';
import {OrderRepeatabilityModel} from '../../../models/order-repeatability.model';
import {add} from 'ionicons/icons';
import IssuesList from '../../IssuesComponents/IssuesList/IssuesList';
import OrderedProductsList from '../OrderedProductsList/OrderedProductsList';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import {
    cartId$,
    cartUpdateDate$,
    orderIssuesUpdateDate$,
    productsInCart$,
    toastState$
} from '../../../services/event-bus.service';
import EditRepeatabilityModal from '../EditRepeatabilityModal/EditRepeatabilityModal';

class OrderDetails extends React.Component<{
    cartId: number,
    cartProductsCount: number
}, {
    orderDetails: OrderDetailsModel,
    orderId: any,
    orderLoaded: boolean,
    invoiceData: InvoiceModel,
    orderRepeatability: OrderRepeatabilityModel,
    isRepeated: boolean,
    cartId: number,
    editRepeatability: boolean,
    orderIssuesUpdateDate: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            cartId: 0,
            orderDetails: {
                id: 0,
                createDate: '',
                notesForOrder: '',
                orderId: '',
                deliveryDate: '',
                deliveryType: {
                    id: 0,
                    name: '',
                    price: 0,
                    icon: ''
                },
                deliveryAddress: {
                    address: '',
                    addressName: '',
                    city: '',
                    client_id: 0,
                    comment: '',
                    id: 0,
                    isDefault: true,
                    latitude: 0,
                    longitude: 0,
                    name: '',
                    phoneNumber: '',
                    surname: '',
                    zipCode: '',
                },
                paymentMethod: {
                    id: 0,
                    name: '',
                    codeName: '',
                    isEnabled: false,
                    displayName: ''
                },
                paymentStatus: 0,
                paymentStatusName: '',
                isRepeated: false,
                status: 0,
                statusName: '',
                products: [],
                orderPrice: 0,
            },
            orderId: window.location.pathname.split('/').at(-2),
            orderLoaded: true,
            invoiceData: {
                id: 0,
                orders: [],
                name: '',
                invoice: '',
                netPrice: 0,
                grossPrice: 0,
                createDate: '',
                status: 0,
                statusName: '',

            },
            orderRepeatability: {
                id: 0,
                order: {
                    id: 0,
                    createDate: '',
                    notesForOrder: '',
                    orderId: '',
                    deliveryDate: '',
                    deliveryType: {
                        id: 0,
                        name: '',
                        price: 0,
                        icon: ''
                    },
                    deliveryAddress: {
                        address: '',
                        addressName: '',
                        city: '',
                        client_id: 0,
                        comment: '',
                        id: 0,
                        isDefault: true,
                        latitude: 0,
                        longitude: 0,
                        name: '',
                        phoneNumber: '',
                        surname: '',
                        zipCode: '',
                    },
                    paymentMethod: {
                        id: 0,
                        name: '',
                        codeName: '',
                        isEnabled: false,
                        displayName: ''
                    },
                    paymentStatus: 0,
                    paymentStatusName: '',
                    isRepeated: false,
                    status: 0,
                    statusName: '',
                    products: [],
                    orderPrice: 0,
                },
                repeatedDays: [],
                frequency: ''
            },
            isRepeated: false,
            editRepeatability: false,
            orderIssuesUpdateDate: 0
        }
        orderIssuesUpdateDate$.subscribe((res) => this.setState({orderIssuesUpdateDate: res}))
    }

    componentDidMount() {
        Promise.all([getOrderDetails(this.state.orderId), getOrderInvoice(this.state.orderId), getOrderRepeatability(this.state.orderId)])
            .then(res => {
                const orderDetails = res[0][0]
                if (orderDetails.deliveryDate) {
                    const date = new Date(Date.parse(`${orderDetails.deliveryDate}`))
                    date.setHours(date.getHours() - 2)
                    orderDetails.deliveryDate = date.toISOString()
                }
                this.setState({
                    orderDetails: orderDetails,
                    invoiceData: res[1],
                    orderRepeatability: res[2][0],
                    orderLoaded: false
                })
                if (res[2].length !== 0) {
                    this.setState({isRepeated: true})
                }
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({editRepeatability: status})
    }

    handleDataCallback = (repeatFreq: string, repeatDays: number[]) => {
        // @ts-ignore
        this.setState(prevState => ({
            ...prevState,
            orderRepeatability: {
                ...prevState.orderRepeatability,
                repeatedDays: [
                    ...repeatDays.map((day) => {
                        switch (day) {
                            case 1:
                                return {id: 6, dayName: 'poniedziałek', dayNumber: 1}
                            case 2:
                                return {id: 7, dayName: 'wtorek', dayNumber: 2}
                            case 3:
                                return {id: 3, dayName: 'środa', dayNumber: 3}
                            case 4:
                                return {id: 8, dayName: 'czwartek', dayNumber: 4}
                            case 5:
                                return {id: 5, dayName: 'piątek', dayNumber: 5}
                        }
                    })
                ],
                frequency: repeatFreq
            }
        }))
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Szczegóły zamówienia'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <IonList className={'order-details-container'}>
                        <div id={'order-status-wrapper'}>
                            <IonListHeader
                                style={{fontSize: '20px', padding: 0, marginTop: '2vh', marginBottom: '2vh'}}>Zamówienie
                                nr
                                #{this.state.orderDetails.id}:</IonListHeader>
                            <div id={'order-status-inner'}>
                                <div className={'order-status-left'}>
                                    <div className={'order-status-header'}>Status</div>
                                    <div className={'order-status'}><span
                                        style={{color: [0, 1, 2].some((status) => status === this.state.orderDetails.status) ? '#eaa249' : 'green'}}>{this.state.orderDetails.statusName}</span>
                                    </div>
                                    <div className={'order-status-header'}>Liczba produktów</div>
                                    <div className={'order-status-bold'}>
                                        {this.state.orderDetails.products ? this.state.orderDetails.products.length > 0 && this.state.orderDetails.products[0].cartProduct.cart.cartCount : ''}
                                    </div>
                                </div>
                                <div className={'order-status-right'}>
                                    <div className={'order-status-header'}>Data złożenia</div>
                                    <div
                                        className={'order-status-bold'}>{this.state.orderDetails.products ? this.state.orderDetails.products.length > 0 && moment(this.state.orderDetails.products[0].cartProduct.cart.lastUpdateDate).format('DD.MM.YYYY  HH:mm') : ''}</div>
                                    <div className={'order-status-header'}>Wartość</div>
                                    <div className={'order-price'}>{this.state.orderDetails.orderPrice.toFixed(2)} zł
                                    </div>
                                </div>
                            </div>
                        </div>

                        <IonItem className={'ion-no-padding'} lines={'none'}>
                            <div id={'ordered-products-wrapper'}>
                                <IonListHeader
                                    style={{
                                        fontSize: '20px',
                                        padding: 0,
                                        marginTop: '2vh',
                                        marginBottom: '2vh',
                                        marginLeft: '9vw'
                                    }}>Zamówione
                                    produkty:</IonListHeader>
                                <OrderedProductsList
                                    orderedProducts={this.state.orderDetails.products}
                                />
                            </div>
                        </IonItem>

                        {this.state.orderDetails.deliveryDate &&
                            <IonItem className={'ion-no-padding'} lines={'none'}>
                                <div id={'notes-wrapper'}>
                                    <IonListHeader
                                        style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Data
                                        dostawy:</IonListHeader>
                                    <div className={'delivery-details'}>
                                        <div className={'notes-desc'}>
                                            <div>
                                                {this.state.orderDetails.deliveryDate ? moment(this.state.orderDetails.deliveryDate).format('DD.MM.YYYY  HH:mm') : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </IonItem>
                        }

                        <IonItem className={'ion-no-padding'} lines={'none'}>
                            <div id={'notes-wrapper'}>
                                <IonListHeader
                                    style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Uwagi do
                                    zamówienia:</IonListHeader>
                                <div className={'delivery-details'}>
                                    <div className={'notes-desc'}>
                                        <div>
                                            {this.state.orderDetails.notesForOrder ? this.state.orderDetails.notesForOrder : 'Brak uwag'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </IonItem>

                        <IonItem className={'ion-no-padding'} lines={'none'}>
                            <div id={'delivery-type-wrapper'}>
                                <IonListHeader
                                    style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Sposób
                                    dostawy:</IonListHeader>
                                <div className={'delivery-details'}>
                                    <div className={'delivery-img-wrapper'}><img
                                        src={'assets/img/delivery-transport.svg'}/>
                                    </div>
                                    <div className={'delivery-desc'}>
                                        <div
                                            className={'order-delivery-header'}>{this.state.orderDetails.deliveryType.name}</div>
                                        {this.state.orderDetails.deliveryAddress &&
                                            <div>
                                                <div
                                                    className={'order-delivery-address-details'}>{this.state.orderDetails.deliveryAddress.name} {this.state.orderDetails.deliveryAddress.surname}</div>
                                                <div
                                                    className={'order-delivery-address-details'}>{this.state.orderDetails.deliveryAddress.address}</div>
                                                <div
                                                    className={'order-delivery-address-details'}>{this.state.orderDetails.deliveryAddress.zipCode} {this.state.orderDetails.deliveryAddress.city}</div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </IonItem>

                        <IonItem className={'ion-no-padding'} lines={'none'}>
                            <div id={'order-payment-method-wrapper'}>
                                <IonListHeader
                                    style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Metoda
                                    płatności:</IonListHeader>
                                <div className={'payment-method'}>
                                    <div className={'payment-img-wrapper-order'}><img
                                        src={`assets/img/${this.state.orderDetails.paymentMethod.name}.svg`}/>
                                    </div>
                                    <div className={'payment-status'}>
                                        <div className={'payment-status-name'}>
                                            <div style={{width: '18vw'}}>
                                                {this.state.orderDetails.paymentMethod.displayName}
                                            </div>
                                            <div style={{marginLeft: '2vw'}}>
                                                Status: <span
                                                style={{color: this.state.orderDetails.paymentStatus === 0 ? '#eaa249' : this.state.orderDetails.paymentStatus === 1 ? '#d5410c' : this.state.orderDetails.paymentStatus === 3 ? '#d5410c' : 'green'}}>{this.state.orderDetails.paymentStatusName}</span>
                                            </div>
                                        </div>
                                        {this.state.orderDetails.paymentStatus !== 4 &&
                                            <div className={'pay-button'}>
                                                <IonButton
                                                    color={'light'}
                                                    shape={'round'}
                                                    className={'single-button-order-details'}
                                                >
                                                    Opłać
                                                </IonButton>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </IonItem>

                        <IonItem className={'ion-no-padding'} lines={'none'}>
                            <div id={'order-invoice-wrapper'}>
                                <IonListHeader
                                    style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Dokument
                                    rozliczeniowy:</IonListHeader>
                                <div id={'order-invoice-inner'}>
                                    <div id={'invoice-file'}>
                                        {this.state.invoiceData.name ? this.state.invoiceData.name : 'Brak faktury do zamówienia'}
                                    </div>
                                    <div id={'order-invoice-btn'}>
                                        <IonButton
                                            color={'light'}
                                            shape={'round'}
                                            className={'single-button-order-details'}
                                            routerLink={'/app/invoices/order-invoice/'}
                                        >
                                            {this.state.invoiceData.name ? 'Pokaż fakturę' : 'Wygeneruj fakturę'}
                                        </IonButton>
                                    </div>
                                </div>
                            </div>
                        </IonItem>

                        {this.state.isRepeated &&
                            <IonItem className={'ion-no-padding'} lines={'none'}>
                                <div id={'repeatability-wrapper'} style={{marginTop: '3vh'}}>
                                    <IonListHeader
                                        style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>To zamówienie jest
                                        powtarzalne:</IonListHeader>
                                    <div id={'repeatability'}>
                                        <div id={'repeated-on'}>
                                            <div>Powtarzaj:</div>
                                            <div>{this.state.orderRepeatability.repeatedDays.map(day => day.dayName).join(', ')}</div>
                                            <div>{this.state.orderRepeatability.frequency}</div>
                                        </div>

                                        <div id={'repeat-buttons'}>
                                            <IonButton
                                                color={'light'}
                                                shape={'round'}
                                                className={'single-button-order-details'}
                                                onClick={() => this.setState({editRepeatability: true})}
                                            >
                                                Edytuj powtarzanie
                                            </IonButton>
                                            <IonButton
                                                color={'dark'}
                                                shape={'round'}
                                                className={'single-button-order-details'}
                                                onClick={() => {
                                                    turnOffRepeat(this.state.orderId)
                                                    this.setState({isRepeated: false})
                                                    toastState$.next({
                                                        message: 'Wyłączono powtarzanie zamówienia',
                                                        color: 'success',
                                                        duration: 2000
                                                    })
                                                }}
                                            >
                                                Wyłącz powtarzanie
                                            </IonButton>
                                        </div>
                                    </div>
                                </div>
                            </IonItem>
                        }

                        <IonItem className={'ion-no-padding'} lines={'none'}>
                            <div id={'issues-wrapper'}>
                                <IonListHeader
                                    style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Zgłaszanie
                                    problemów:</IonListHeader>
                                <div id={'report-issue-button'}>
                                    <IonButton
                                        color={'light'}
                                        shape={'round'}
                                        className={'single-button-report-issue'}
                                        routerLink={`/app/order-history/${this.state.orderId}/order-details/report-issue`}
                                    >
                                        Dodaj nowe zgłoszenie<IonIcon icon={add} slot={'end'}/>
                                    </IonButton>

                                </div>

                                <div id={'issues-list-wrapper'}>
                                    <IssuesList
                                        orderId={this.state.orderId}
                                        key={this.state.orderIssuesUpdateDate}
                                    />
                                </div>
                            </div>
                        </IonItem>

                        <div id={'copy-to-cart-btn'}>
                            <IonButton
                                className={'custom-button single-button'}
                                shape={'round'}
                                color={'light'}
                                onClick={() => {
                                    copyToCart(
                                        this.state.orderId,
                                        this.state.orderDetails
                                    )
                                        .then((res) => {
                                            cartId$.next(res.data.cartId)
                                            productsInCart$.next(res.data.productsQuantity)
                                            cartUpdateDate$.next(Date.now())
                                        })

                                }}
                            >Skopiuj produkty do koszyka</IonButton>
                        </div>
                    </IonList>
                </IonContent>

                <IonLoading
                    isOpen={this.state.orderLoaded}
                    message={'Trwa pobieranie danych'}
                />

                <EditRepeatabilityModal
                    editRepeatability={this.state.editRepeatability}
                    closeModalCallback={this.handleCloseModal}
                    orderId={this.state.orderId}
                    dataCallback={this.handleDataCallback}
                />

            </IonPage>
        );
    }
}

export default OrderDetails;
