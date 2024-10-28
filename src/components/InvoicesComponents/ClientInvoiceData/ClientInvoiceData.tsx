import React from 'react';
import './ClientInvoiceData.css'
import {IonActionSheet, IonRadio} from '@ionic/react';
import InvoicesModal from '../InvoicesModal/InvoicesModal';
import Card from '../../../UI/Card';
import {close, heart, pencilOutline, trash} from 'ionicons/icons';
import {BsBookmarkHeartFill} from 'react-icons/bs';
import {handleSetToDefaultInvoice, removeInvoiceData} from '../../../services/client-data.service';
import {ClientInvoiceDataModel} from '../../../models/client-invoice-data.model';

class ClientInvoiceData extends React.Component<{
    data: ClientInvoiceDataModel,
    styleSource: string,
    callbackSelectInvoice?: any,
    callbackRemoveInvoice?: any,
    callbackSetDefaultInvoice?: any,
}, {
    invoiceModalEdit: boolean,
    editMode: boolean,
    actionSheet: boolean,
    selectedInvoiceData: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            invoiceModalEdit: false,
            editMode: false,
            actionSheet: false,
            selectedInvoiceData: 0
        }
    }

    handleCallbackInvoice = (status: boolean) => {
        this.setState({invoiceModalEdit: status, editMode: status})
    }

    handleClick = (event: any) => {
        event.target.classList.remove('radio-checked');
    }

    onSelectInvoice = (invoiceDataId: number) => {
        this.props.callbackSelectInvoice(invoiceDataId)
    }

    onRemoveInvoice = (invoiceId: number) => {
        this.props.callbackRemoveInvoice(invoiceId)
    }

    onSetDefaultInvoice = (invoiceId: number) => {
        this.props.callbackSetDefaultInvoice(invoiceId)
    }

    render() {
        return (
            <Card className={this.props.styleSource === 'order-invoice' ? 'cart-address data-card' : 'data-card'}>
                {this.props.styleSource === 'order-invoice' &&
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
                            this.onSelectInvoice(this.props.data.id)
                        }}
                    />
                }

                <div id={'company-name'}>
                    {this.props.data.companyName}
                </div>
                <div id={'nip-number'}>
                    <img src={'assets/img/nip.svg'} style={{marginRight: '10px', width: '20px'}}/>
                    <div>{this.props.data.nip}</div>
                </div>
                <div className={'address-details'}>
                    <img src={'assets/img/full-address.svg'} style={{marginRight: '10px', width: '20px'}}/>
                    <div>{this.props.data.address}<br/>
                        {this.props.data.zipCode}, {this.props.data.city}</div>
                </div>
                {this.props.styleSource !== 'order-invoice' &&
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
                            removeInvoiceData(this.props.data.id)
                            this.onRemoveInvoice(this.props.data.id)
                        }
                    }, {
                        text: 'Edytuj',
                        icon: pencilOutline,
                        data: 'Data value',
                        handler: () => this.setState({invoiceModalEdit: true, editMode: true})
                    }, {
                        text: 'Ustaw jako domyślne',
                        icon: heart,
                        handler: () => {
                            handleSetToDefaultInvoice(this.props.data.id, true);
                            this.onSetDefaultInvoice(this.props.data.id)
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

                <InvoicesModal
                    invoiceModalOpen={this.state.invoiceModalEdit}
                    editModeActive={this.state.editMode}
                    parentCallbackInvoice={this.handleCallbackInvoice}
                    invoiceDataId={this.props.data.id}
                    name={this.props.data.name}
                    companyName={this.props.data.companyName}
                    nip={this.props.data.nip}
                    address={this.props.data.address}
                    zipCode={this.props.data.zipCode}
                    city={this.props.data.city}
                    saveDisplay={this.state.editMode ? 'Zaktualizuj' : 'Zapisz'}
                />
            </Card>
        );
    }
}

export default ClientInvoiceData;
