import React from 'react';
import './CartPlaceProduct.css'
import Card from '../../../UI/Card';
import {IonButton, IonInput} from '@ionic/react';
import {CartProductModel} from '../../../models/cart-product.model';
import {removeProductFromCart} from '../../../services/cart.service';
import {productsInCart$} from '../../../services/event-bus.service';
import {ProductImageModel} from '../../../models/product-image.model';
import {getProductImages} from '../../../services/offer.service';

class CartPlaceProduct extends React.Component<{
    placeProduct: CartProductModel,
    productPriceCallback: any,
    cartId: number,
    productRemoveCallback: any
}, {
    productQuantity: number,
    productImages: ProductImageModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            productQuantity: this.props.placeProduct.quantity,
            productImages: []
        }
    }

    updateCosts(quantity: number) {
        const productPrice = parseFloat((((this.props.placeProduct.variant.customPrice ? this.props.placeProduct.variant.customPrice : this.props.placeProduct.variant.price) + this.props.placeProduct.extra_price) * quantity).toFixed(2))
        const placeProductPrice = {
            id: this.props.placeProduct.id,
            price: productPrice,
            quantity: quantity,
            placeId: this.props.placeProduct.place
        }
        this.props.productPriceCallback(placeProductPrice)
    }

    componentDidMount() {
        getProductImages(this.props.placeProduct.place, this.props.placeProduct.selectedProductVariant.product.id)
            .then(res => this.setState({productImages: res}))
        this.updateCosts(this.state.productQuantity)
    }

    removeProductFromCart(cartId: number, productId: number) {
        this.props.productRemoveCallback(productId)
        removeProductFromCart(cartId, productId)
        productsInCart$.next(-this.state.productQuantity)
        this.setState({productQuantity: 0})
        this.updateCosts(0)
    }

    render() {
        return (
            <Card className={'cart-product-card'} key={this.props.placeProduct.id}>
                <div className={'cart-product-image'}>
                    {this.state.productImages.length > 0 ?
                        this.state.productImages[0].image ?
                        <img src={this.state.productImages[0].image}/> :
                        <img src={'assets/img/piekarz.png'}/> :
                        'Brak zdjęcia'
                    }
                </div>

                {this.props.placeProduct.variant.variant.map(variant => (
                    this.props.placeProduct.selectedVariant === variant.id && (
                        <div className={'cart-product-details'}>
                            <div className={'card-details-header'}>
                                <div>{this.props.placeProduct.variant.product.name}</div>
                                {this.props.cartId &&
                                    <div
                                        onClick={() => {
                                            this.removeProductFromCart(this.props.cartId, this.props.placeProduct.id)
                                        }}>
                                        <img src={'assets/img/trash.svg'}/>
                                    </div>
                                }
                            </div>
                            {variant.variant[0].name !== 'basic' ?
                            <div className={'card-details-variant'}>
                                <div>{variant.variant.map(el => (<div>{el.name}<br/></div>))}</div>
                            </div> : <div/>
                            }

                            <div className={'card-details-price'}>
                                <div>{(((this.props.placeProduct.variant.customPrice ? this.props.placeProduct.variant.customPrice : this.props.placeProduct.variant.price) + this.props.placeProduct.extra_price) * this.state.productQuantity).toFixed(2)} zł</div>
                                <div className={'incrementer'}>
                                    <IonButton
                                        className={'incrementer-button'}
                                        color={'light'}
                                        mode={'ios'}
                                        onClick={() => {
                                            if (this.state.productQuantity > 0) {
                                                this.setState({productQuantity: this.state.productQuantity - 1})
                                                this.updateCosts(this.state.productQuantity)
                                            }
                                        }}
                                    >
                                        <img src={'assets/img/minus.svg'}
                                             style={{maxWidth: 'unset', marginLeft: '2px'}}/>
                                    </IonButton>
                                    <IonInput
                                        slot={'center'}
                                        value={this.state.productQuantity}
                                        className={'incrementer-input'}
                                        readonly
                                        onIonChange={((e: any) => {
                                            this.setState({productQuantity: parseInt(e.detail.value)})
                                            this.updateCosts(this.state.productQuantity)
                                        })}
                                    />
                                    <IonButton
                                        className={'incrementer-button'}
                                        color={'light'}
                                        mode={'ios'}
                                        onClick={() => {
                                            this.setState({productQuantity: this.state.productQuantity + 1})
                                            this.updateCosts(this.state.productQuantity)
                                        }}
                                    >
                                        <img src={'assets/img/plus.svg'}
                                             style={{maxWidth: 'unset', marginRight: '2px'}}/>
                                    </IonButton>
                                </div>
                            </div>
                        </div>
                    )
                ))
                }

            </Card>

        );
    }

}

export default CartPlaceProduct;
