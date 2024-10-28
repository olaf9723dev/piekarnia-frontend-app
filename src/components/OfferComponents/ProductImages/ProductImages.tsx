import React from 'react';
import {ProductImageModel} from '../../../models/product-image.model';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './ProductImages.css'
import {IonIcon} from '@ionic/react';
import {informationCircleOutline} from 'ionicons/icons';
import ProductDescriptionModal from '../ProductDescriptionModal/ProductDescriptionModal';
import {getProductDescription} from '../../../services/offer.service';
import {ProductDescriptionModel} from '../../../models/product-description.model';

class ProductImages extends React.Component<{
    productImages: ProductImageModel[],
    placeId: any,
    productId: any,

}, {
    productDescriptionModalOpen: boolean,
    productDescriptionData: ProductDescriptionModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            productDescriptionModalOpen: false,
            productDescriptionData: []
        }
    }

    componentDidMount() {
        getProductDescription(this.props.placeId, this.props.productImages[0].product.id)
            .then(res => {
                this.setState({productDescriptionData: res})
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({productDescriptionModalOpen: status})
    }

    render() {
        let images;
        images = this.props.productImages.sort((a: ProductImageModel, b: ProductImageModel) => a.order - b.order).map((image) => {
            return {
                original: image.image,
                thumbnail: image.image,
                order: image.order
            }
        })
        if (!images[0].original) {
            images = [{
                original: 'assets/img/piekarz.png',
                thumbnail: 'assets/img/piekarz.png',
                order: 1
            }]
        }
        return (
            <div id={'gallery-details'}>
                <ImageGallery
                    items={images}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showNav={false}
                />
                <IonIcon
                    icon={informationCircleOutline}
                    id={'info-icon-images'}
                    onClick={() => this.setState({productDescriptionModalOpen: true})}
                />
                <div id={'rate-icon-images'}>
                    <div><img src={'assets/img/rate-star.svg'}/></div>
                    <div style={{fontSize: '14px', marginLeft: '4px', fontWeight: 'bold'}}>
                        {this.props.productImages[0].product.avgRate ? this.props.productImages[0].product.avgRate : 'Brak ocen'}
                    </div>
                </div>

                <ProductDescriptionModal
                    productDescriptionModalOpen={this.state.productDescriptionModalOpen}
                    closeModalCallback={this.handleCloseModal}
                    productDescriptionData={this.state.productDescriptionData}
                />
            </div>
        );
    }
}

export default ProductImages;
