import React from 'react';
import Card from '../../../UI/Card';
import {ProductInPlaceModel} from '../../../models/product-in-place.model';

import './ProductCard.css'
import '../../../UI/Card.css'
import {IonButton, IonIcon} from '@ionic/react';
import {informationCircleOutline} from 'ionicons/icons';
import ProductDescriptionModal from '../ProductDescriptionModal/ProductDescriptionModal';
import {ProductDescriptionModel} from '../../../models/product-description.model';
import {getProductDescription, getProductImages} from '../../../services/offer.service';
import {ProductImageModel} from '../../../models/product-image.model';
import {productDetailsUpdateDate$} from '../../../services/event-bus.service';

class ProductCard extends React.Component<{
    product: ProductInPlaceModel,
    display: string,
    placeId: number
}, {
    productDescriptionModalOpen: boolean,
    productDescriptionData: ProductDescriptionModel[],
    productImages: ProductImageModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            productDescriptionModalOpen: false,
            productDescriptionData: [],
            productImages: []
        }
    }

    componentDidMount() {
        Promise.all([getProductDescription(this.props.placeId, this.props.product.product.id), getProductImages(this.props.placeId, this.props.product.product.id)])
            .then(res => {
                this.setState({productDescriptionData: res[0], productImages: res[1]})
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({productDescriptionModalOpen: status})
    }

    render() {
        return (
            <Card className={this.props.display === 'grid' ? 'grid-item product-item' : 'square-item product-item'}>
                <IonIcon
                    icon={informationCircleOutline}
                    id={'info-icon-card'}
                    onClick={() => this.setState({productDescriptionModalOpen: true})}
                />
                <div id={'rate-icon-card'}>
                    <div><img src={'assets/img/rate-star.svg'}/></div>
                    <div style={{fontSize: '14px', marginLeft: '4px', marginRight: '2px', fontWeight: 'bold'}}>
                        {this.props.product.product.avgRate ? this.props.product.product.avgRate : 'Brak ocen'}
                    </div>
                </div>

                <div id={'product-offer-image'}>
                    {this.state.productImages.length > 0 ? this.state.productImages[0].image ?
                        <img id={'product-card-image'} src={this.state.productImages[0].image}/> :
                        <img id={'product-card-image'} src={'assets/img/piekarz.png'}/> :
                        'Brak zdjęcia'
                    }
                </div>

                <div className={'description-offer'}>
                    <h6 style={{
                        fontWeight: 'bold',
                        marginBottom: '1vh',
                        marginTop: '2vh'
                    }}>{this.props.product.product.name}</h6>
                    <div id={'price-weight'}>
                        <div>{this.props.product.price.toFixed(2)} zł / {this.props.product.variant[0].unitName}</div>
                    </div>
                </div>

                <div className={'details-button'}>
                    <IonButton
                        color={'dark'}
                        shape={'round'}
                        className={this.props.display === 'grid' ? 'double-button-offer' : 'custom-button single-button-offer'}
                        routerLink={`${this.props.placeId}/product-details/${this.props.product.product.id}`}
                        onClick={() => productDetailsUpdateDate$.next(Date.now())}
                    >Szczegóły</IonButton>
                </div>

                <ProductDescriptionModal
                    productDescriptionModalOpen={this.state.productDescriptionModalOpen}
                    closeModalCallback={this.handleCloseModal}
                    productDescriptionData={this.state.productDescriptionData}
                />
            </Card>
        );
    }
}

export default ProductCard;
