import React from 'react';
import {IonItem, IonListHeader} from '@ionic/react';
import {CartProductModel} from '../../../models/cart-product.model';
import CartPlaceProduct from '../CartPlaceProduct/CartPlaceProduct';
import {removePlaceFromCart} from '../../../services/cart.service';
import {productsInCart$} from '../../../services/event-bus.service';

class CartProductsList extends React.Component<{
    placeProducts: CartProductModel[],
    productPriceCallback: any,
    cartId: number,
    productRemoveCallback: any,
    placeRemoveCallback: any
}, {
    placeSumOrderPrice: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            placeSumOrderPrice: 0
        }
    }

    handleProductPriceCallback = (price: number) => {
        this.props.productPriceCallback(price)
    }

    handleProductRemoveCallback = (productId: number) => {
        this.props.productRemoveCallback(productId)
    }

    removePlaceFromCart(cartId: number, placeId: number) {
        this.props.placeRemoveCallback(placeId)
        removePlaceFromCart(cartId, placeId)
        const placeQuantityInit = 0
        const placeQuantity = this.props.placeProducts.map(e => e.quantity).reduce((prev: number, curr: number) => prev + curr, placeQuantityInit)
        productsInCart$.next(-placeQuantity)
    }

    render() {
        return (
            <div className={'place-products-cart'}>
                <IonItem className={'place-cart-header'}>
                    <IonListHeader style={{
                        fontSize: '20px',
                        padding: 0,
                        marginBottom: '1vh',
                    }}>
                        {this.props.placeProducts[0].variant.place.name}
                    </IonListHeader>
                    <img onClick={() => this.removePlaceFromCart(this.props.cartId, this.props.placeProducts[0].place)} src={'assets/img/trash.svg'} className={'trash-icon-header'}/>
                </IonItem>

                <div>
                    {this.props.cartId ? this.props.placeProducts.map((product: CartProductModel) => (
                        <CartPlaceProduct
                            placeProduct={product}
                            productPriceCallback={this.handleProductPriceCallback}
                            cartId={this.props.cartId}
                            key={product.id}
                            productRemoveCallback={this.handleProductRemoveCallback}
                        />
                    )) : <div></div>
                    }
                </div>
            </div>

        );
    }
}

export default CartProductsList;
