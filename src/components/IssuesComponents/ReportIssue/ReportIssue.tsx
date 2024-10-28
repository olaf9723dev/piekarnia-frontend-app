import './ReportIssue.css'
import React from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTextarea
} from '@ionic/react';
import {createIssue, uploadIssueImage} from '../../../services/issues.service';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import {Swiper, SwiperSlide} from 'swiper/react';
import {orderIssuesUpdateDate$} from '../../../services/event-bus.service';

class ReportIssue extends React.Component<{
    cartId: number,
    cartProductsCount: number
}, {
    orderId: any,
    issueType: number,
    customIssueType: string,
    description: string,
    imagesUploaded: string[],  // images to formData
    imagesUploadedToDisplay: any[]  // images to display right after upload
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            orderId: window.location.pathname.split('/').at(-3),
            issueType: 0,
            customIssueType: '',
            description: '',
            imagesUploaded: [],
            imagesUploadedToDisplay: []
        }
    }

    openFileDialog = () => {
        (document as any).getElementById('file-upload').click();
    };

    setImage = (_event: any) => {
        let f = _event.target.files![0];

        let reader = new FileReader();
        let url = reader.readAsDataURL(f);

        reader.onloadend = (e) => {
            this.setState({
                imagesUploaded: [...this.state.imagesUploaded, f],
                imagesUploadedToDisplay: [...this.state.imagesUploadedToDisplay, reader.result]
            })
        };
    }

    get isValid(): boolean {
        return this.state.issueType !== 0 && this.state.description !== '';
    }

    reportIssue() {
        let formData = new FormData();
        this.state.imagesUploaded.map((image) => {
            formData.append('image', image, 'issue_image')
        })
        createIssue(
            this.state.orderId,
            this.state.issueType,
            this.state.customIssueType,
            this.state.description,
        )
        setTimeout(() => {
            uploadIssueImage(
                this.state.orderId,
                formData
            )
        }, 2000)
        orderIssuesUpdateDate$.next(Date.now())
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Zgłoszenie problemu'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent className={'inputs'}>
                    <div id={'select-issue-type'}>
                        <IonSelect
                            className={'select-picker-cart'}
                            cancelText={'Anuluj'}
                            okText={'Wybierz'}
                            placeholder={'Uszkodzony produkt'}
                            interfaceOptions={{header: 'Wybierz temat zgłoszenia'}}
                            onIonChange={e => this.setState({issueType: e.detail.value})}
                        >
                            <IonSelectOption value={1}>Uszkodzony produkt</IonSelectOption>
                            <IonSelectOption value={2}>Problem z dostawą</IonSelectOption>
                            <IonSelectOption value={3}>Niepełne zamówienie</IonSelectOption>
                            <IonSelectOption value={4}>Błędne dane</IonSelectOption>
                            <IonSelectOption value={5}>Inne... (własne)</IonSelectOption>
                        </IonSelect>
                    </div>

                    {this.state.issueType === 4 &&
                        <div className={'select-picker-cart'}
                             style={{marginRight: 'auto', marginLeft: 'auto', marginTop: '4vh'}}>
                            <IonInput
                                placeholder={'Podaj temat zgłoszenia'}
                                onIonChange={e => this.setState({customIssueType: e.detail.value || ''})}
                                id={'custom-issue-type-input'}
                            />
                        </div>
                    }

                    <IonItem lines={'none'}>
                        <div style={{display: 'flex', alignItems: 'center', marginTop: '2vh', marginBottom: '2vh'}}>
                            <img src={'assets/img/comment.svg'} style={{marginRight: '12px'}}/>
                            <IonLabel position={'stacked'}
                                      style={{color: '#999', marginTop: '1vh'}}>Opisz zgłoszenie</IonLabel>
                        </div>
                        <IonTextarea
                            onIonChange={e => this.setState({description: e.detail.value || ''})}
                            className={'modal-comment-input'}
                        />
                    </IonItem>

                    <div className={'issue-img-upload-wrapper'}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                        >
                            <SwiperSlide>
                                <div className={'report-img-wrapper'}>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        style={{display: 'none'}}
                                        onChange={this.setImage}
                                    />

                                    <div onClick={this.openFileDialog} className={'report-img-upload'}>
                                        <img slot="icon-only" src={'assets/img/add-image-report.svg'}/>
                                        <div>Dodaj zdjęcia</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            {this.state.imagesUploadedToDisplay.length > 0 ? (
                                this.state.imagesUploadedToDisplay.map((image) => (
                                    <SwiperSlide>
                                        <div className={'report-img-wrapper-display'}>
                                            <img src={image}/>
                                        </div>
                                    </SwiperSlide>
                                ))
                            ) : (
                                Array.from({length: 3}, (x, i) => (
                                    <SwiperSlide>
                                        <div className={'report-img-wrapper-display'}/>
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>
                    </div>

                    <div id={'report-issue-btn'}>
                        <IonButton
                            className={'custom-button single-button'}
                            shape={'round'}
                            color={'dark'}
                            onClick={() => this.reportIssue()}
                            disabled={!this.isValid}
                        >
                            Wyślij zgłoszenie
                        </IonButton>
                    </div>
                </IonContent>
            </IonPage>
        );
    }
}

export default ReportIssue;
