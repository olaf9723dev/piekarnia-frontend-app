import './OrderedProduct.css'
import React from 'react';
import Card from '../../../UI/Card';
import {CartProductModel} from '../../../models/cart-product.model';
import {IonButton} from '@ionic/react';
import {getProductImages} from '../../../services/offer.service';
import {ProductImageModel} from '../../../models/product-image.model';

class OrderedProduct extends React.Component<{
    product: CartProductModel
}, {
    productImages: ProductImageModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            productImages: []
        }
    }

    componentDidMount() {
        getProductImages(this.props.product.place, this.props.product.selectedProductVariant.product.id)
            .then(res => this.setState({productImages: res}))
    }

    render() {
        return (
            <Card className={'order-product-card'}>
                <div className={'cart-product-image'}>
                    {this.state.productImages.length > 0 ?
                        this.state.productImages[0].image ?
                            <img src={this.state.productImages[0].image}/> :
                            <img src={'assets/img/piekarz.png'}/> :
                        'Brak zdjęcia'
                    }
                </div>

                <div className={'order-product-card-details'}>
                    <div className={'order-product-card-details-header'}>
                        <div id={'order-product-name'}>{this.props.product.variant.product.name}</div>
                    </div>
                    {this.props.product.selectedProductVariant.variant[0].name !== 'basic' &&
                        <div className={'order-product-card-details-variant'}>
                            {this.props.product.selectedProductVariant.variant.map(el => (<div>{el.name}<br/></div>))}
                        </div>
                    }

                    <div className={'order-product-card-details-quantity'}>
                        <div>
                            Ilość: {this.props.product.quantity}
                        </div>
                        <div className={'order-price-history'}>
                            {this.props.product.productPriceSum.toFixed(2)} zł
                        </div>
                    </div>

                    <div className={'order-product-rate-button'}>
                        <IonButton
                            className={'single-button-history'}
                            color={'light'}
                            shape={'round'}
                            routerLink={`/app/rate-product/${this.props.product.selectedProductVariant.product.id}`}
                        >
                            Oceń produkt
                        </IonButton>
                    </div>
                </div>
            </Card>
        );
    }
}

export default OrderedProduct;
