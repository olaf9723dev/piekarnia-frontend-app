import './OrderHistoryElement.css'
import React from 'react';
import Card from '../../../UI/Card';
import {OrderDetailsModel} from '../../../models/order-details.model';
import moment from 'moment';
import {IonButton} from '@ionic/react';
import {getProductImages} from '../../../services/offer.service';
import {ProductImageModel} from '../../../models/product-image.model';

class OrderHistoryElement extends React.Component<{
    orderHistoryElement: OrderDetailsModel,
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
        getProductImages(this.props.orderHistoryElement.products[0].place, this.props.orderHistoryElement.products[0].selectedProductVariant.product.id)
            .then(res => this.setState({productImages: res}))
    }

    render() {
        return (
            <Card className={'order-history-element-card'}>
                <div className={'cart-product-image'}>
                    {this.state.productImages.length > 0 ?
                        this.state.productImages[0].image ?
                        <img src={this.state.productImages[0].image}/> :
                        <img src={'assets/img/piekarz.png'}/> :
                        'Brak zdjęcia'
                    }
                </div>

                <div className={'order-history-element-card-details'}>
                    <div className={'order-history-element-card-details-header'}>
                        <div id={'order-number'}>{this.props.orderHistoryElement.orderId}</div>
                    </div>
                    <div className={'order-history-element-card-details-status'}>
                        {this.props.orderHistoryElement.statusName}
                    </div>
                    <div className={'order-history-element-card-details-date'}>
                        <div>
                            {moment(this.props.orderHistoryElement.products[0].cartProduct.cart.lastUpdateDate).format('DD.MM.YYYY  HH:mm')}
                        </div>
                        <div className={'order-price-history'}>
                            {this.props.orderHistoryElement.orderPrice.toFixed(2)} zł
                        </div>
                    </div>

                    <div className={'order-details-button'}>
                        <IonButton
                            className={'single-button-history'}
                            color={'light'}
                            shape={'round'}
                            routerLink={`/app/order-history/${this.props.orderHistoryElement.id}/order-details`}
                        >
                            Szczegóły zamówienia
                        </IonButton>
                    </div>
                </div>

                {this.props.orderHistoryElement.isRepeated &&
                    <img src={'assets/img/repeated.svg'} className={'repeated-icon'}/>
                }
            </Card>
        );
    }
}

export default OrderHistoryElement;
