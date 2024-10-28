import './InvoiceAppliedToOrdersElement.css'
import React from 'react';
import Card from '../../../UI/Card';
import {OrderDetailsModel} from '../../../models/order-details.model';
import moment from 'moment';
import {IonButton} from '@ionic/react';
import {getProductImages} from '../../../services/offer.service';
import {ProductImageModel} from '../../../models/product-image.model';

class InvoiceAppliedToOrdersElement extends React.Component<{
    order: OrderDetailsModel,
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
        getProductImages(this.props.order.products[0].place, this.props.order.products[0].selectedProductVariant.product.id)
            .then(res => this.setState({productImages: res}))
    }

    render() {
        return (
            <Card className={'order-history-element-card'}>
                <div className={'cart-product-image'}>
                    {this.state.productImages.length > 0 ?
                        <img src={this.state.productImages[0].image}/> :
                        'Brak zdjęcia'
                    }
                </div>

                <div className={'order-history-element-card-details'}>
                    <div className={'order-history-element-card-details-header'}>
                        <div id={'order-number'}>{this.props.order.orderId}</div>
                    </div>
                    <div className={'order-history-element-card-details-status'}>
                        {this.props.order.statusName}
                    </div>
                    <div className={'order-history-element-card-details-date'}>
                        <div>
                            {this.props.order.products ? this.props.order.products.length > 0 && moment(this.props.order.products[0].cartProduct.cart.lastUpdateDate).format('DD.MM.YYYY  HH:mm') : ''}
                        </div>
                        <div className={'order-price-history'}>
                            {this.props.order.orderPrice.toFixed(2)} zł
                        </div>
                    </div>

                    <div className={'order-details-button'}>
                        <IonButton
                            className={'single-button-history'}
                            color={'light'}
                            shape={'round'}
                            routerLink={`/app/order-history/${this.props.order.id}/order-details`}
                        >
                            Szczegóły zamówienia
                        </IonButton>
                    </div>
                </div>

                {this.props.order.isRepeated &&
                    <img src={'assets/img/repeated.svg'} className={'repeated-icon'}/>
                }
            </Card>
        );
    }
}

export default InvoiceAppliedToOrdersElement;
