import React from 'react';
import './CartComponent.css'
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent, IonDatetime,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonSelect,
    IonSelectOption, IonTextarea,
    IonTitle,
    IonToggle,
    IonToolbar,
    NavContext
} from '@ionic/react';
import {cartId$, cartUpdateDate$, productsInCart$, toastState$} from '../../../services/event-bus.service';
import ClientAddressList from '../../AddressesComponents/ClientAddressList/ClientAddressList';
import {ClientAddressModel} from '../../../models/client-address.model';
import {getClientAddresses} from '../../../services/client-data.service';
import {closeCart, getCartProducts, updateProductsInCartQuantities} from '../../../services/cart.service';
import Card from '../../../UI/Card';
import {addCircleOutline} from 'ionicons/icons';
import AddressesModal from '../../AddressesComponents/AddressesModal/AddressesModal';
import {CartProductsModel} from '../../../models/cart-products.model';
import CartProductsList from '../CartProductsList/CartProductsList';
import {CartProductModel} from '../../../models/cart-product.model';
import {createOrder, getDeliveryTypes} from '../../../services/order-history.service';
import {DeliveryTypeModel} from '../../../models/delivery-type.model';

const _ = require('lodash');

class CartComponent extends React.Component<{
    cartId: number,
}, {
    alertOpen: boolean,
    rememberOrder: boolean,
    clientAddresses: ClientAddressModel[],
    repeatDay: string[],
    deliveryType: DeliveryTypeModel,
    paymentMethod: string,
    selectedAddress: number,
    addressModal: boolean,
    cartProductsGrouped: CartProductsModel,
    orderPriceList: { id: number, price: number, quantity: number, placeId: number }[],
    productsLoaded: boolean,
    repeatFrequency: any,
    repeatFrequency2: any,
    repeatability: string,
    deliveryTypes: DeliveryTypeModel[],
    notesForOrder: string,
    deliveryDate: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            alertOpen: false,
            rememberOrder: false,
            clientAddresses: [],
            repeatDay: [],
            deliveryType: {
                id: 0,
                price: 0,
                name: '',
                icon: ''
            },
            paymentMethod: '',
            selectedAddress: 0,
            addressModal: false,
            cartProductsGrouped: {},
            orderPriceList: [],
            productsLoaded: true,
            repeatFrequency: '',
            repeatFrequency2: '',
            repeatability: '',
            deliveryTypes: [],
            notesForOrder: '',
            deliveryDate: ''
        }
    }

    static contextType = NavContext;

    redirectFunction(destination: string) {
        this.context.navigate(destination)
    }

    componentDidMount() {
        Promise.all([getClientAddresses(), getCartProducts(this.props.cartId), getDeliveryTypes()])
            .then(res => {
                const grouped = _.groupBy(res[1], 'place')
                const zipCodes = ['43170', '41200', '41203', '41205', '41209', '41214', '41218', '41219', '41253']

                this.setState({
                    clientAddresses: res[0].filter((x: any) => zipCodes.includes(x.zipCode.replace('-', ''))),
                    cartProductsGrouped: grouped,
                    productsLoaded: false,
                    deliveryTypes: res[2]
                })
            })
    }

    handleCallbackSelectAddress = (addressId: number) => {
        this.setState({selectedAddress: addressId})
    }

    handleCallbackAddress = (status: boolean) => {
        getClientAddresses()
            .then(res => {
                const zipCodes = ['43170', '41200', '41203', '41205', '41209', '41214', '41218', '41219', '41253']
                this.setState({
                    addressModal: status,
                    clientAddresses: res.filter((x: any) => zipCodes.includes(x.zipCode.replace('-', '')))
                })
            })
    }

    getDeliveryPrice = () => {
        return (this.state.orderPriceList.map((x: any) => x.price).reduce((total, value) => total + value, 0) < 100) ? this.state.deliveryType.price : 0;
    }

    getDeliveryPrice2 = (price: number) => {
        return (this.state.orderPriceList.map((x: any) => x.price).reduce((total, value) => total + value, 0) < 100) ? price : 0;
    }

    handleProductPriceCallback = (price: { id: number, price: number, quantity: number, placeId: number }) => {
        if (this.state.orderPriceList.length > 0) {
            this.setState(prevState => ({
                    orderPriceList: prevState.orderPriceList.map(
                        el => el.id === price.id ? {...el, price: price.price, quantity: price.quantity} : el
                    )
                })
            )
        } else {
            this.setState(prevState => ({
                orderPriceList: [...prevState.orderPriceList, price]
            }))
        }
    }

    handleProductRemoveCallback = (productId: number) => {
        const newArr: CartProductModel[] = []
        Object.values(this.state.cartProductsGrouped).map(place => place.map((product: any) =>
            product.id !== productId && newArr.push(product)
        ))
        const updatedCartProductsGrouped = _.groupBy(newArr, 'place')
        this.setState({cartProductsGrouped: updatedCartProductsGrouped})

        if (Object.keys(updatedCartProductsGrouped).length === 0) {
            closeCart(this.props.cartId)
            cartId$.next(0)
            this.redirectFunction('/app/empty-cart/')
        }
    }

    handlePlaceRemoveCallback = (placeId: number) => {
        const newArr: CartProductModel[] = []
        Object.values(this.state.cartProductsGrouped).map(place => place.map((product: any) =>
            product.place !== placeId && newArr.push(product)
        ))
        const updatedCartProductsGrouped = _.groupBy(newArr, 'place')

        const newOrderPriceList: { id: number, price: number, quantity: number, placeId: number }[] = []
        this.state.orderPriceList.map((el: { id: number, price: number, quantity: number, placeId: number }) => el.placeId !== placeId && newOrderPriceList.push(el))
        this.setState({
            cartProductsGrouped: updatedCartProductsGrouped,
            orderPriceList: newOrderPriceList
        })

        if (newOrderPriceList.length === 0) {
            closeCart(this.props.cartId)
            cartId$.next(0)
            this.redirectFunction('/app/empty-cart/')
        }
    }

    handleDeliveryDate = (deliveryDate: string) => {
        const date = `${deliveryDate.split('+')[0]}+00:00`
        this.setState({deliveryDate: date})
    }

    alertOpen = () => {
        this.setState({alertOpen: true})
    }

    get isValid(): boolean {
        const deliveryDate = this.state.deliveryType.name.includes('Dostawa') ? this.state.deliveryDate !== '' : true;
        return this.state.paymentMethod !== '' && this.state.deliveryType.name !== '' && deliveryDate
    }

    render() {
        return (
            <IonPage>
                <IonHeader mode={'ios'}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow'} text={''}/>
                        </IonButtons>
                        <IonTitle className={'title-styled'}>Koszyk</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList style={{marginBottom: '34vh'}}>
                        <div id={'cart-products'}>
                            {this.state.cartProductsGrouped && this.props.cartId ?
                                Object.entries(this.state.cartProductsGrouped).map(([placeId, products]) => (
                                    <CartProductsList
                                        placeProducts={products}
                                        productPriceCallback={this.handleProductPriceCallback}
                                        cartId={this.props.cartId}
                                        key={placeId}
                                        productRemoveCallback={this.handleProductRemoveCallback}
                                        placeRemoveCallback={this.handlePlaceRemoveCallback}
                                    />
                                )) :
                                <div></div>}

                        </div>

                        <IonItem id={'notes'} className={'ion-no-padding'}>
                            <IonList id={'notes-list'}>
                                <IonListHeader
                                    style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Uwagi do
                                    zamówienia:</IonListHeader>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '2vh',
                                    marginBottom: '2vh'
                                }}>
                                    <img src={'assets/img/comment.svg'} style={{marginRight: '12px'}}/>
                                    <IonLabel position={'stacked'}
                                              style={{color: '#999', marginTop: '1vh'}}>Dodaj uwagi do
                                        zamówienia</IonLabel>
                                </div>
                                <IonTextarea
                                    onIonChange={e => this.setState({notesForOrder: e.detail.value || ''})}
                                    className={'modal-comment-input'}
                                    value={this.state.notesForOrder}
                                />
                            </IonList>
                        </IonItem>

                        <IonItem id={'delivery-types'} className={'ion-no-padding'}>
                            <IonList id={'delivery-type-list'}>
                                <IonRadioGroup
                                    onIonChange={(e) => this.setState({deliveryType: e.detail.value})}>
                                    <IonListHeader
                                        style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Sposoby
                                        dostawy:</IonListHeader>
                                    {/*<IonItem lines={'none'} className={'payment-radio'}>*/}
                                    {/*    <div className={'payment-img-wrapper'}><img*/}
                                    {/*        src={'assets/img/delivery-transport.svg'}/>*/}
                                    {/*    </div>*/}
                                    {/*<IonLabel style={{width: '70vw'}}>Dostawa na wybrany*/}
                                    {/*    adres <br></br>- 8,50*/}
                                    {/*    zł</IonLabel>*/}
                                    {/*<IonRadio value={'delivery'} color={'light'}/>*/}
                                    {/*</IonItem>*/}

                                    {this.state.deliveryTypes.map(deliveryType => (
                                        <IonItem lines={'none'} className={'payment-radio'}>
                                            <div className={'payment-img-wrapper'}><img
                                                src={deliveryType.icon ? deliveryType.icon : 'assets/img/delivery-collect.svg'}/>
                                            </div>
                                            <IonLabel>{deliveryType.name} - {this.getDeliveryPrice2(deliveryType.price)} zł</IonLabel>
                                            <IonRadio value={deliveryType} color={'light'}/>
                                        </IonItem>
                                    ))}
                                </IonRadioGroup>
                            </IonList>


                        </IonItem>
                        {this.state.deliveryType.name.includes('Dostawa') ? <p style={{paddingLeft: '30px', fontSize: '12px'}}>
                            <ul>
                                <li>dowóz tylko w promieniu 10km od lokalizacji piekarni</li>
                                <li>dla zamówień powyżej 100 zł dowóz gratis w promieniu 10km od lokalizacji piekarni</li>
                                <li>dla zamówień do 100 zł dowóz 20 zł w promieniu 10km od lokalizacji piekarni</li>
                                <li>dowóz poniedziałek do piątek od 10.00 do 18.00</li>
                            </ul>
                        </p> : <p></p>}

                        {this.state.deliveryType.name.includes('Dostawa') &&
                            <IonItem className={'ion-no-padding'}>
                                <div className={'delivery-address'}>
                                    <div>
                                        <IonListHeader
                                            style={{
                                                fontSize: '20px',
                                                padding: 0,
                                            }}>Adres dostawy:</IonListHeader>
                                    </div>

                                    {this.state.clientAddresses.length > 0 ?
                                        <div className={'delivery-address-swiper-wrapper'}>
                                            <ClientAddressList
                                                data={this.state.clientAddresses}
                                                styleSource={'cart'}
                                                callbackSelectAddress={this.handleCallbackSelectAddress}
                                                addCallback={this.handleCallbackAddress}
                                            />
                                        </div>
                                        :
                                        <div className={'add-address-cart-wrapper'}>
                                            <Card className={'address-card'}>
                                                <div className={'new-address-inner'}>
                                                    <div style={{
                                                        textAlign: 'center',
                                                        fontSize: '20px'
                                                    }}>Dodaj nowy adres
                                                    </div>
                                                    <IonButton
                                                        fill={'clear'}
                                                        className={'plus-btn'}
                                                        style={{marginLeft: 'auto', marginRight: 'auto'}}
                                                        onClick={() => this.setState({addressModal: true})}
                                                    ><IonIcon className={'plus'}
                                                              icon={addCircleOutline}/></IonButton>
                                                </div>
                                            </Card>
                                        </div>
                                    }
                                </div>
                            </IonItem>
                        }
                        {this.state.deliveryType.name.includes('Dostawa') &&
                            <IonItem id={'delivery-date'} className={'ion-no-padding'}>
                                <IonList id={'notes-list'}>
                                    <IonListHeader
                                            style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>
                                            Data dostawy:</IonListHeader>
                                    <IonDatetime onIonChange={(event) => {
                                        const date = new Date(Date.parse(`${event.detail.value}`))
                                        const hours = (Date.parse(`${event.detail.value}`) - Date.now()) / 60 / 60 / 1000
                                        if (
                                            hours < 24 ||
                                            date.getDay() === 6 ||
                                            date.getDay() === 0 ||
                                            date.getHours() < 10 ||
                                            date.getHours() > 18
                                        ) {
                                            this.alertOpen()
                                        } else {
                                            this.handleDeliveryDate(`${event.detail.value}`)
                                        }
                                        }}>
                                    </IonDatetime>
                                </IonList>
                            </IonItem>
                        }

                        <IonItem id={'payment-method'} className={'ion-no-padding'}>
                            <IonList id={'payment-method-list'}>
                                <IonRadioGroup
                                    onIonChange={(e) => this.setState({paymentMethod: e.detail.value})}>
                                    <IonListHeader
                                        style={{fontSize: '20px', padding: 0, marginBottom: '2vh'}}>Metoda
                                        płatności:</IonListHeader>
                                    {
                                        (this.state.deliveryType.name === 'Odbiór osobisty' || this.state.deliveryType.name.includes('Dostawa')) && (
                                            <IonItem lines={'none'} className={'payment-radio'}>
                                                <div className={'payment-img-wrapper'}><img
                                                    src={'assets/img/cash.svg'}/>
                                                </div>
                                                <IonLabel>Płatność przy odbiorze</IonLabel>
                                                <IonRadio value={'collect'} color={'light'}/>
                                            </IonItem>
                                        )
                                    }
                                    {/* TODO na razie niedostępne */}
                                    <IonItem lines={'none'} className={'payment-radio'}>
                                        <div className={'payment-img-wrapper'}><img
                                            src={'assets/img/credit-card.svg'}/>
                                        </div>
                                        <IonLabel>Karta kredytowa</IonLabel>
                                        <IonRadio disabled value={'credit-card'} color={'light'}/>
                                    </IonItem>

                                    <IonItem lines={'none'} className={'payment-radio'}>
                                        <div className={'payment-img-wrapper'}><img
                                            src={'assets/img/cash.svg'}/></div>
                                        <IonLabel>Gotówka</IonLabel>
                                        <IonRadio disabled value={'cash'} color={'light'}/>
                                    </IonItem>

                                    <IonItem lines={'none'} className={'payment-radio'}>
                                        <div className={'payment-img-wrapper'}><img
                                            src={'assets/img/apple-pay.svg'}/>
                                        </div>
                                        <IonLabel>Apple Pay</IonLabel>
                                        <IonRadio disabled value={'apple-pay'} color={'light'}/>
                                    </IonItem>

                                    <IonItem lines={'none'} className={'payment-radio'}>
                                        <div className={'payment-img-wrapper'}><img
                                            src={'assets/img/google-pay.svg'}/>
                                        </div>
                                        <IonLabel>Google Pay</IonLabel>
                                        <IonRadio disabled value={'google-pay'} color={'light'}/>
                                    </IonItem>

                                    <IonItem lines={'none'} className={'payment-radio'}>
                                        <div className={'payment-img-wrapper'}><img
                                            src={'assets/img/blik.svg'}/></div>
                                        <IonLabel>BLIK</IonLabel>
                                        <IonRadio disabled value={'blik'} color={'light'}/>
                                    </IonItem>

                                    <IonItem lines={'none'} className={'payment-radio'}>
                                        <div className={'payment-img-wrapper'}><img
                                            src={'assets/img/przelewy24.svg'}/>
                                        </div>
                                        <IonLabel>Przelewy24</IonLabel>
                                        <IonRadio disabled value={'przelewy24'} color={'light'}/>
                                    </IonItem>

                                </IonRadioGroup>
                            </IonList>
                        </IonItem>

                        <div className={'do-repeat'}>
                            <h5>Czy chcesz powtarzać to zamówienie?</h5>
                            <IonToggle
                                color={'light'}
                                style={{display: 'block'}}
                                onIonChange={() => {
                                    this.setState({rememberOrder: !this.state.rememberOrder})
                                    if (!this.state.rememberOrder) {
                                        this.setState({repeatability: '', repeatDay: [], repeatFrequency: ''})
                                    }
                                }}
                            />
                        </div>

                        {this.state.rememberOrder &&
                            <div className={'if-to-repeat'}>

                                <div className={'choose-repeat'}>
                                    <h5>Wybierz dni, w które chcesz, aby zamówienie było
                                        powtarzane:</h5>
                                    <IonSelect
                                        className={'select-picker-cart'}
                                        cancelText={'Anuluj'}
                                        okText={'Wybierz'}
                                        multiple
                                        onIonChange={(e) => this.setState({repeatDay: e.detail.value})}
                                        value={this.state.repeatDay}
                                    >
                                        <IonSelectOption value={1}>Poniedziałek</IonSelectOption>
                                        <IonSelectOption value={2}>Wtorek</IonSelectOption>
                                        <IonSelectOption value={3}>Środa</IonSelectOption>
                                        <IonSelectOption value={4}>Czwartek</IonSelectOption>
                                        <IonSelectOption value={5}>Piątek</IonSelectOption>
                                    </IonSelect>
                                </div>
                                <div className={'repeat-freq'}>
                                    <h5>Wybierz częstotliwość z jaką zamówienie będzie powtarzane:</h5>
                                    <div className={'freq-selects'}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>co</div>
                                        <IonSelect
                                            className={'select-picker-cart select-freq'}
                                            cancelText={'Anuluj'}
                                            okText={'Wybierz'}
                                            onIonChange={(e) => {
                                                this.setState({repeatFrequency: e.detail.value})
                                            }}
                                        >
                                            <IonSelectOption value={1}>1</IonSelectOption>
                                            <IonSelectOption value={2}>2</IonSelectOption>
                                            <IonSelectOption value={3}>3</IonSelectOption>
                                            <IonSelectOption value={4}>4</IonSelectOption>
                                        </IonSelect>

                                        <IonSelect
                                            className={'select-picker-cart select-freq'}
                                            cancelText={'Anuluj'}
                                            okText={'Wybierz'}
                                            onIonChange={(e) => {
                                                this.setState({repeatFrequency2: e.detail.value})
                                            }}
                                        >
                                            <IonSelectOption value={
                                                this.state.repeatFrequency === 1 ? 'tydzień' :
                                                    [2, 3, 4].some(x => x === this.state.repeatFrequency) ? 'tygodnie' :
                                                        'tygodni'
                                            }>{
                                                this.state.repeatFrequency === 1 ? <span>tydzień</span> :
                                                    [2, 3, 4].some(x => x === this.state.repeatFrequency) ?
                                                        <span>tygodnie</span> :
                                                        <span>tygodni</span>
                                            }</IonSelectOption>
                                            <IonSelectOption value={
                                                this.state.repeatFrequency === 1 ? 'miesiąc' :
                                                    [2, 3, 4].some(x => x === this.state.repeatFrequency) ? 'miesiące' :
                                                        'miesięcy'
                                            }>{this.state.repeatFrequency === 1 ? 'miesiąc' :
                                                [2, 3, 4].some(x => x === this.state.repeatFrequency) ? 'miesiące' :
                                                    'miesięcy'}</IonSelectOption>
                                        </IonSelect>
                                    </div>
                                </div>
                            </div>

                        }
                    </IonList>

                </IonContent>
                <div id={'summary'}>
                    <div id={'summary-delivery'}>
                        <div>
                            Koszt dostawy
                        </div>
                        <div>
                            {this.getDeliveryPrice().toFixed(2)} zł
                        </div>
                    </div>

                    <div id={'summary-order'}>
                        <div>
                            Kwota zamówienia
                        </div>
                        <div>
                            {this.state.orderPriceList.map((x: any) => x.price).reduce((total, value) => total + value, 0).toFixed(2)} zł
                        </div>
                    </div>

                    <div id={'summary-sum'}>
                        <div>
                            Podsumowanie
                        </div>
                        <div>
                            {
                                (this.getDeliveryPrice() + this.state.orderPriceList.map((x: any) => x.price).reduce((total, value) => total + value, 0)).toFixed(2)
                            } zł
                        </div>
                    </div>

                    <div id={'pay-btn'}>
                        <IonButton
                            className={'custom-button single-button'}
                            shape={'round'}
                            color={'dark'}
                            onClick={() => {
                                if (this.isValid) {
                                    updateProductsInCartQuantities(this.props.cartId, this.state.orderPriceList)
                                    createOrder({
                                        products: this.state.orderPriceList,
                                        selectedAddress: this.state.selectedAddress,
                                        isRepeated: this.state.rememberOrder,
                                        paymentMethod: this.state.paymentMethod,
                                        deliveryType: this.state.deliveryType.name,
                                        daysToRepeat: this.state.repeatDay,
                                        repeatFrequency: `co ${this.state.repeatFrequency} ${this.state.repeatFrequency2}`,
                                        orderPrice: (this.state.deliveryType.price + this.state.orderPriceList.map((x: any) => x.price).reduce((total, value) => total + value, 0)).toFixed(2),
                                        notesForOrder: this.state.notesForOrder,
                                        deliveryDate: this.state.deliveryDate ? this.state.deliveryDate : null
                                    })
                                        .then(() => {
                                            toastState$.next({
                                                    message: 'Dziękujemy za złożenie zamówienia! Będziemy informować Cię na bieżąco o postępach.',
                                                    color: 'success',
                                                    duration: 4000
                                                }
                                            )
                                            cartId$.next(0);
                                            productsInCart$.next(0);
                                            this.redirectFunction('/app/order-history')
                                        })
                                } else {
                                    console.log(this.state.deliveryDate)
                                    toastState$.next({
                                        message: 'Nie wybrano sposobu dostawy, daty dostawy lub metody płatności.',
                                        color: 'danger',
                                        duration: 3000
                                    })
                                }

                            }}
                        >Złóż zamówienie</IonButton>
                    </div>
                </div>

                <AddressesModal
                    addressModalOpen={this.state.addressModal}
                    parentCallbackAddress={this.handleCallbackAddress}
                    saveDisplay={'Zapisz'}
                />

                <IonLoading
                    isOpen={this.state.productsLoaded}
                    onDidDismiss={() => this.setState({productsLoaded: false})}
                    message={'Trwa pobieranie produktów'}
                />

                <IonAlert
                        isOpen={this.state.alertOpen}
                        onDidDismiss={() => this.setState({alertOpen: false})}
                        message={'Dostawy prowadzimy od poniedziałku do piątku w godzinach 10-18. ' +
                            'Data dostawy musi być większa niż 24 godziny!'}
                        buttons={[
                            {
                                text: 'Zamknij',
                                role: 'cancel',
                                cssClass: 'secondary'
                            },
                        ]}
                    />

            </IonPage>
    );
    }
    }

    export default CartComponent;
