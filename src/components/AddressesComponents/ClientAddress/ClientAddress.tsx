import React from 'react';
import './ClientAddress.css'
import {IonActionSheet, IonRadio} from '@ionic/react';
import AddressesModal from '../AddressesModal/AddressesModal';
import {close, heart, pencilOutline, trash} from 'ionicons/icons';
import Card from '../../../UI/Card';
import {BsBookmarkHeartFill} from 'react-icons/bs';
import {handleSetToDefaultAddress, removeAddress} from '../../../services/client-data.service';
import {ClientAddressModel} from '../../../models/client-address.model';

class ClientAddress extends React.Component<{
    data: ClientAddressModel,
    styleSource: string,
    callbackSelectAddress?: any,
    callbackRemoveAddress?: any,
    callbackSetDefaultAddress?: any,
}, {
    addressModalEdit: boolean,
    editMode: boolean,
    actionSheet: boolean,
    selectedAddress: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            addressModalEdit: false,
            editMode: false,
            actionSheet: false,
            selectedAddress: 0
        }
    }

    handleCallbackAddress = (status: boolean) => {
        this.setState({addressModalEdit: status, editMode: status})
    }

    handleClick = (event: any) => {
        event.target.classList.remove('radio-checked');
    }

    onSelectAddress = (addressId: number) => {
        this.props.callbackSelectAddress(addressId)
    }

    onRemoveAddress = (addressId: number) => {
        this.props.callbackRemoveAddress(addressId)
    }

    onSetDefaultAddress = (addressId: number) => {
        this.props.callbackSetDefaultAddress(addressId)
    }

    render() {
        return (
            <Card
                className={this.props.styleSource === 'cart' ? 'cart-address data-card' : 'data-card'}
            >
                {this.props.styleSource === 'cart' &&
                    <IonRadio
                        mode={'md'}
                        color={'light'}
                        value={this.props.data.id}
                        className={'address-cart-radio'}
                        onClick={(event) => {
                            document.querySelectorAll('.address-cart-radio').forEach(element => {
                                element.classList.remove('radio-checked')
                                if (element.getAttribute('value') === this.props.data.id.toString()) {
                                    element.classList.add('radio-checked')
                                }
                            });
                            this.onSelectAddress(this.props.data.id)
                        }}
                    />
                }
                <div id={'address-name'}>
                    {this.props.data.addressName}
                </div>
                <div id={'phone-number'}>
                    <img src={'assets/img/phone.svg'} style={{marginRight: '10px', width: '20px'}}/>
                    <div>{this.props.data.phoneNumber}</div>
                </div>
                <div className={'address-details'}>
                    <img src={'assets/img/full-address.svg'} style={{marginRight: '10px', width: '20px'}}/>
                    <div>{this.props.data.address}<br/>
                        {this.props.data.zipCode}, {this.props.data.city}</div>
                </div>
                {this.props.styleSource !== 'cart' &&
                    <img src={'assets/img/pencil.svg'} className={'edit-pencil'}
                         onClick={() => this.setState({actionSheet: true})}/>
                }
                {this.props.data.isDefault &&
                    <BsBookmarkHeartFill className={'favorite'}/>
                }

                <IonActionSheet
                    isOpen={this.state.actionSheet}
                    onDidDismiss={() => this.setState({actionSheet: false})}
                    cssClass="my-custom-class"
                    buttons={[{
                        text: 'Usuń',
                        role: 'destructive',
                        icon: trash,
                        id: 'delete-button',
                        data: {
                            type: 'delete'
                        },
                        handler: () => {
                            removeAddress(this.props.data.id)
                            this.onRemoveAddress(this.props.data.id)
                        }
                    }, {
                        text: 'Edytuj',
                        icon: pencilOutline,
                        data: 'Data value',
                        handler: () => this.setState({addressModalEdit: true, editMode: true})
                    }, {
                        text: 'Ustaw jako domyślny',
                        icon: heart,
                        handler: () => {
                            handleSetToDefaultAddress(this.props.data.id, true);
                            this.onSetDefaultAddress(this.props.data.id)
                        }
                    }, {
                        text: 'Anuluj',
                        icon: close,
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }]}
                >
                </IonActionSheet>

                <AddressesModal
                    addressModalOpen={this.state.addressModalEdit}
                    editModeActive={this.state.editMode}
                    parentCallbackAddress={this.handleCallbackAddress}
                    addressId={this.props.data.id}
                    addressName={this.props.data.addressName}
                    name={this.props.data.name}
                    surname={this.props.data.surname}
                    address={this.props.data.address}
                    zipCode={this.props.data.zipCode}
                    city={this.props.data.city}
                    comment={this.props.data.comment}
                    phoneNumber={this.props.data.phoneNumber}
                    saveDisplay={this.state.editMode ? 'Zaktualizuj' : 'Zapisz'}
                />

            </Card>
        );
    }
}

export default ClientAddress;
