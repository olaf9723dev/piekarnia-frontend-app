import React from 'react';
import './InvoiceDataList.css'
import ClientInvoiceData from '../ClientInvoiceData/ClientInvoiceData';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import InvoicesModal from '../InvoicesModal/InvoicesModal';
import {ClientInvoiceDataModel} from '../../../models/client-invoice-data.model';
import {IonButton, IonIcon} from '@ionic/react';
import Card from '../../../UI/Card';
import {addCircleOutline} from 'ionicons/icons';

class InvoiceDataList extends React.Component<{
    data: ClientInvoiceDataModel[],
    styleSource: string,
    callbackSelectInvoice?: any,
    callbackRemoveInvoice?: any,
    callbackSetDefaultInvoice?: any
}, {
    invoiceModalAdd: boolean,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            invoiceModalAdd: false,
        }
    }

    handleCallbackInvoice = (status: boolean) => {
        this.setState({invoiceModalAdd: status})
    }

    handleCallbackSelectInvoice = (invoiceDataId: number) => {
        this.props.callbackSelectInvoice(invoiceDataId)
    }

    handleCallbackRemoveInvoice = (invoiceDataId: number) => {
        this.props.callbackRemoveInvoice(invoiceDataId)
    }

    handleCallbackSetDefaultInvoice = (invoiceDataId: number) => {
        this.props.callbackSetDefaultInvoice(invoiceDataId)
    }

    render() {
        return (
            <div>
                <Swiper
                    slidesPerView={1.4}
                    spaceBetween={50}
                    centeredSlides={true}
                    style={{marginBottom: '16vh'}}
                >
                    {
                        this.props.data.map((invoiceData) => (
                            <SwiperSlide key={invoiceData.id}>
                                <ClientInvoiceData
                                    data={invoiceData}
                                    styleSource={this.props.styleSource}
                                    callbackSelectInvoice={this.handleCallbackSelectInvoice}
                                    callbackRemoveInvoice={this.handleCallbackRemoveInvoice}
                                    callbackSetDefaultInvoice={this.handleCallbackSetDefaultInvoice}
                                />
                            </SwiperSlide>
                        ))
                    }

                    <SwiperSlide className={'data-list'}>
                        <Card className={'address-card'}>
                            <div id={'new-address-inner'}>
                                <div style={{textAlign: 'center', fontSize: '20px'}}>Dodaj nowe dane</div>
                                <IonButton
                                    fill={'clear'}
                                    className={'plus-btn'}
                                    style={{marginLeft: 'auto', marginRight: 'auto'}}
                                    onClick={() => this.setState({invoiceModalAdd: true})}
                                ><IonIcon className={'plus'} icon={addCircleOutline}/></IonButton>
                            </div>
                        </Card>
                    </SwiperSlide>

                </Swiper>

                <InvoicesModal
                    invoiceModalOpen={this.state.invoiceModalAdd}
                    parentCallbackInvoice={this.handleCallbackInvoice}
                    saveDisplay={'Zapisz'}
                />
            </div>
        );
    }
}

export default InvoiceDataList;
