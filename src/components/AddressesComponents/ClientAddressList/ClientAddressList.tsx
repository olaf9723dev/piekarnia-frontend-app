import React from 'react';
import './ClientAddressList.css'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import AddressesModal from '../AddressesModal/AddressesModal';
import ClientAddress from '../ClientAddress/ClientAddress';
import Card from '../../../UI/Card';
import {ClientAddressModel} from '../../../models/client-address.model';
import {IonButton, IonIcon} from '@ionic/react';
import {addCircleOutline} from 'ionicons/icons';

class ClientAddressList extends React.Component<{
    data: ClientAddressModel[],
    styleSource: string,
    callbackSelectAddress?: any,
    callbackRemoveAddress?: any,
    callbackSetDefaultAddress?: any,
    addCallback?: any
}, {
    addressModalAdd: boolean,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            addressModalAdd: false,
        }
    }

    handleCallbackAddress = (status: boolean) => {
        this.setState({addressModalAdd: status})
        if (this.props.addCallback) {
            this.props.addCallback(status)
        }
    }

    handleCallbackSelectAddress = (addressId: number) => {
        this.props.callbackSelectAddress(addressId)
    }

    handleCallbackRemoveAddress = (addressId: number) => {
        this.props.callbackRemoveAddress(addressId)
    }

    handleCallbackSetDefaultAddress = (addressId: number) => {
        this.props.callbackSetDefaultAddress(addressId)
    }

    render() {
        return (
            <div>
                <Swiper
                    slidesPerView={1.4}
                    spaceBetween={50}
                    centeredSlides={true}
                >
                        {
                            this.props.data.map((addressData: ClientAddressModel) => (
                                <SwiperSlide
                                    className={'data-list'}
                                    key={addressData.id}
                                >
                                        <ClientAddress
                                            data={addressData}
                                            styleSource={this.props.styleSource}
                                            callbackSelectAddress={this.handleCallbackSelectAddress}
                                            callbackRemoveAddress={this.handleCallbackRemoveAddress}
                                            callbackSetDefaultAddress={this.handleCallbackSetDefaultAddress}
                                        />
                                </SwiperSlide>
                            ))
                        }

                    <SwiperSlide className={'data-list'} key={'add-slide'}>
                        <Card className={'address-card'}>
                            <div id={'new-address-inner'}>
                                <div style={{textAlign: 'center', fontSize: '20px'}}>Dodaj nowy adres</div>
                                <IonButton
                                    fill={'clear'}
                                    className={'plus-btn'}
                                    style={{marginLeft: 'auto', marginRight: 'auto'}}
                                    onClick={() => this.setState({addressModalAdd: true})}
                                ><IonIcon className={'plus'} icon={addCircleOutline}/></IonButton>
                            </div>
                        </Card>
                    </SwiperSlide>
                </Swiper>
                <AddressesModal
                    addressModalOpen={this.state.addressModalAdd}
                    parentCallbackAddress={this.handleCallbackAddress}
                    saveDisplay={'Zapisz'}
                />

            </div>

        );
    }
}

export default ClientAddressList;
