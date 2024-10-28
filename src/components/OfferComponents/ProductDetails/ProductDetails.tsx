import React from 'react';
import {
    IonAlert,
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonPage,
    IonSelect,
    IonSelectOption,
    NavContext
} from '@ionic/react';
import ProductImages from '../ProductImages/ProductImages';
import {ProductImageModel} from '../../../models/product-image.model';
import {getProductDetails, getProductImages} from '../../../services/offer.service';
import './ProductDetails.css'
import {FaFacebookF} from 'react-icons/fa';
import {addCircleOutline, removeCircleOutline} from 'ionicons/icons';
import {addToCart, getOpenCart} from '../../../services/cart.service';
import {ProductInPlaceModel} from '../../../models/product-in-place.model';
import {
    cartId$,
    cartUpdateDate$, productDetailsUpdateDate$,
    productOfferUpdateDate$,
    productsInCart$,
    userStatus$
} from '../../../services/event-bus.service';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';

class ProductDetails extends React.Component<{
    cartId: any,
    cartProductsCount: number,
    tabSelected: number
}, {
    productImages: ProductImageModel[],
    placeId: any,
    productId: any,
    variant: string,
    quantity: number,
    sumPrice: number,
    product: ProductInPlaceModel[],
    alertOpen: boolean,
    cartId: any
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            productImages: [],
            placeId: window.location.pathname.split('/').at(-3),
            productId: window.location.pathname.split('/').at(-1),
            variant: '',
            quantity: 1,
            sumPrice: 0,
            product: [],
            alertOpen: false,
            cartId: 0
        }
        cartId$.subscribe((res: any) => {
            this.setState({cartId: res})
        })
    }

    static contextType = NavContext;

    redirectFunction(destination: string) {
        this.context.navigate(destination)
    }

    componentDidMount() {
        Promise.all([getProductImages(this.state.placeId, this.state.productId), getProductDetails(this.state.placeId, this.state.productId)])
            .then(res => {
                this.setState({
                    productImages: res[0],
                    product: res[1],
                    sumPrice: res[1][0].customPrice ? res[1][0].customPrice : res[1][0].price,
                })
            })
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Szczegóły produktu'} key={this.state.cartId} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    {this.state.productImages.length > 0 ?
                        <div id={'images-gallery'}>
                            <ProductImages
                                placeId={this.state.placeId}
                                productId={this.state.productId}
                                productImages={this.state.productImages}
                            />
                        </div> :
                        <h2>Brak zdjęć dla wybranego produktu</h2>
                    }
                    <div id={'order-product-details'}>

                        {this.state.product.length > 0 &&
                            <h2 style={{
                                fontWeight: 'bold',
                                marginBottom: '16px',
                                marginTop: '20px'
                            }}>{this.state.product[0].product.name}</h2>
                        }

                        {this.state.product.length > 0 &&
                            <div className={'details-description'}>
                                <h3 style={{
                                    fontWeight: 'bold',
                                }}>O produkcie</h3>
                                <div>{this.state.product[0].product.description}</div>
                            </div>
                        }

                        {
                            this.state.product.length > 0 &&
                            this.state.product[0].product.nutrition && this.state.product[0].product.fattyAcids &&
                            this.state.product[0].product.fat && this.state.product[0].product.carbohydrates &&
                            this.state.product[0].product.sugar && this.state.product[0].product.salt &&
                            this.state.product[0].product.fiber && this.state.product[0].product.protein &&
                            <div className={'nutrition-info'}>
                                <div className={'nutri-row'}>
                                    <div style={{fontWeight: 'bold', fontSize: '20px'}}>Wartości odżywcze</div>
                                    <div style={{fontSize: '16px'}}>w 100 g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>wartość energetyczna</div>
                                    <div>{this.state.product[0].product.nutrition}</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>tłuszcz</div>
                                    <div>{this.state.product[0].product.fat} g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>w tym kwasy tłuszczowe nasycone</div>
                                    <div>{this.state.product[0].product.fattyAcids} g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>węglowodany</div>
                                    <div>{this.state.product[0].product.carbohydrates} g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>w tym cukry</div>
                                    <div>{this.state.product[0].product.sugar} g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>białko</div>
                                    <div>{this.state.product[0].product.protein} g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>błonnik</div>
                                    <div>{this.state.product[0].product.fiber} g</div>
                                </div>
                                <div className={'nutri-row'}>
                                    <div>sól</div>
                                    <div>{this.state.product[0].product.salt} g</div>
                                </div>
                            </div>
                        }
                        {this.state.product[0] && this.state.product[0].variant.length > 1 &&
                            <div id={'choose-variant'}>
                                <IonSelect
                                    value={this.state.variant}
                                    placeholder={this.state.product.length > 0 ? this.state.product[0].variant[0].variant.map(e => e.name).join(' + ') : ''}
                                    onIonChange={e => this.setState({variant: e.detail.value})}
                                    className={'select-picker'}
                                    cancelText={'Anuluj'}
                                    okText={'Wybierz'}
                                    interfaceOptions={{header: 'Wybierz dodatki'}}
                                >
                                    {this.state.product.length > 0 ?
                                        this.state.product[0].variant.map((variant) => (
                                            <IonSelectOption value={variant.id}
                                                             style={{display: 'flex', justifyContent: 'space-between'}}>
                                                {variant.variant.map(e => e.name).join(' + ')} +{variant.extraPrice.toFixed(2)} zł
                                            </IonSelectOption>
                                        )) :
                                        <div></div>
                                    }
                                </IonSelect>
                            </div>
                        }
                        <div id={'add-product'}>
                            <div id={'price'} style={{fontSize: '24px'}}>{this.state.sumPrice.toFixed(2)} zł</div>

                            <div className={'quantity-counter'}>
                                <IonButton
                                    fill={'clear'}
                                    className={'minus-btn'}
                                    style={{display: this.state.quantity === 0 && 'none'}}
                                    onClick={() => {
                                        this.setState(
                                            {
                                                quantity: this.state.quantity - 1
                                            })
                                    }
                                    }
                                ><IonIcon className={'minus'} icon={removeCircleOutline}/></IonButton>
                                <IonInput
                                    value={this.state.quantity}
                                    readonly
                                    onIonChange={(e: any) => this.setState(
                                        {
                                            quantity: parseInt(e.detail.value),
                                            sumPrice: parseFloat((this.state.product[0].price * this.state.quantity).toFixed(2))
                                        })}
                                    id={'quantity-input'}
                                />
                                <IonButton
                                    fill={'clear'}
                                    className={'plus-btn'}
                                    onClick={() => this.setState({quantity: this.state.quantity + 1})}
                                ><IonIcon className={'plus'} icon={addCircleOutline}/></IonButton>
                            </div>
                        </div>

                    </div>

                    <div id={'order-buttons'}>
                        <IonButton
                            className={'custom-button single-button'}
                            shape={'round'}
                            color={'dark'}
                            disabled={this.state.quantity === 0 || userStatus$.value === false}
                            onClick={() => {
                                addToCart(
                                    this.state.placeId,
                                    this.state.productId,
                                    this.state.quantity,
                                    this.state.variant ? this.state.variant : this.state.product[0].variant[0].id,
                                )
                                    .then(() => {
                                        if (this.state.cartId === 0) {
                                            getOpenCart()
                                                .then((res) => {
                                                    this.setState({cartId: res[0].id})
                                                    cartId$.next(res[0].id)
                                                })
                                        }
                                        productsInCart$.next(this.state.quantity)
                                        this.setState({alertOpen: true})
                                    })
                            }}
                        >Dodaj do koszyka</IonButton>
                        {/*<IonButton*/}
                        {/*    color={'primary'}*/}
                        {/*    shape={'round'}*/}
                        {/*    className={'custom-button single-button'}*/}
                        {/*><FaFacebookF style={{marginRight: '10px'}}/>Udostępnij</IonButton>*/}
                        {userStatus$.value === false &&
                            <p>Zaloguj się aby zrobić zakupy</p>
                        }
                    </div>

                    <IonAlert
                        isOpen={this.state.alertOpen}
                        onDidDismiss={() => this.setState({alertOpen: false})}
                        header={'Hurra! Produkt został dodany do koszyka!'}
                        message={'Czy chcesz kontynuować zakupy?'}
                        buttons={[
                            {
                                text: 'Kontynuuj zakupy',
                                cssClass: 'secondary',
                                handler: () => {
                                    this.redirectFunction(`/app/product-offer/${this.state.placeId}`);
                                }
                            },
                            {
                                text: 'Pozostań na tej stronie',
                                role: 'cancel',
                                cssClass: 'secondary'
                            },
                            {
                                text: 'Przejdź do koszyka',
                                handler: () => {
                                    this.redirectFunction(`/app/cart/${this.state.cartId}`);
                                    cartUpdateDate$.next(Date.now())
                                },
                            },
                        ]}
                    />
                    <CustomTabBar
                        cartId={this.props.cartId || this.state.cartId}
                        tabSelected={this.props.tabSelected}
                        key={this.props.cartId}
                    />

                </IonContent>
            </IonPage>
        );
    }
}

export default ProductDetails;
