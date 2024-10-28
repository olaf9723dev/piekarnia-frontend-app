import './ProductDescriptionModal.css'
import React from 'react';
import {IonButton, IonContent, IonIcon, IonModal} from '@ionic/react';
import {informationCircleOutline} from 'ionicons/icons';
import {ProductDescriptionModel} from '../../../models/product-description.model';

class ProductDescriptionModal extends React.Component<{
    productDescriptionModalOpen: boolean,
    closeModalCallback: any,
    productDescriptionData: ProductDescriptionModel[]
}, {}> {
    constructor(props: any) {
        super(props);

    }

    onCloseModal = () => {
        this.props.closeModalCallback(false);
    }

    render() {
        return (
            <IonModal
                isOpen={this.props.productDescriptionModalOpen}
                onDidDismiss={this.onCloseModal}
                className={'product-description-modal'}
                swipeToClose
                mode={'ios'}
            >
                <IonContent>
                    <IonIcon
                        icon={informationCircleOutline}
                        id={'info-icon-product-desc'}
                        style={{fontSize: '32px'}}
                    />
                    <div id={'product-description-title'}>
                        <div>Informacje o produkcie</div>
                    </div>

                    {this.props.productDescriptionData.map(content => (
                        <div className={'product-description-content'}>
                            <h3>{content.name}</h3>
                            <div>{content.content}</div>
                        </div>
                    ))}

                    <div id={'ready-button'}>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            onClick={this.onCloseModal}
                        >Gotowe</IonButton>
                    </div>

                </IonContent>
            </IonModal>
        );
    }

}

export default ProductDescriptionModal;
