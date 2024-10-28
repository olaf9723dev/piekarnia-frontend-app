import './IssueDetails.css'
import React from 'react';
import {IonContent, IonItem, IonPage, IonTextarea} from '@ionic/react';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import moment from 'moment';
import {getIssueDetails, sendMessage} from '../../../services/issues.service';
import {IssueConversationModel} from '../../../models/issue-conversation.model';
import IssueMessagesList from '../IssueMessagesList/IssueMessagesList';
import {IssueMessageModel} from '../../../models/issue-message.model';

class IssueDetails extends React.Component<{
    cartId: number,
    cartProductsCount: number
}, {
    orderId: any,
    issueId: any,
    issue: IssueConversationModel,
    message: any,
    image: any,
    imageToDisplay: any
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            orderId: window.location.pathname.split('/').at(-5),
            issueId: window.location.pathname.split('/').at(-2),
            message: '',
            image: '',
            issue: {
                id: 0,
                issue: {
                    createDate: '',
                    customIssueType: '',
                    description: '',
                    id: 0,
                    issueType: '',
                    issueImages: [],
                    order: {
                        createDate: '',
                        id: 0,
                        notesForOrder: '',
                        orderId: '',
                        deliveryDate: '',
                        deliveryType: {
                            id: 0,
                            name: '',
                            price: 0,
                            icon: ''
                        },
                        deliveryAddress: {
                            address: '',
                            addressName: '',
                            city: '',
                            client_id: 0,
                            comment: '',
                            id: 0,
                            isDefault: true,
                            latitude: 0,
                            longitude: 0,
                            name: '',
                            phoneNumber: '',
                            surname: '',
                            zipCode: '',
                        },
                        paymentMethod: {
                            id: 0,
                            name: '',
                            codeName: '',
                            isEnabled: false,
                            displayName: ''
                        },
                        paymentStatus: 0,
                        paymentStatusName: '',
                        isRepeated: false,
                        status: 0,
                        statusName: '',
                        products: [],
                        orderPrice: 0,
                    },
                    status: 0,
                    statusName: '',
                },
                messages: []
            },
            imageToDisplay: ''
        }
    }

    componentDidMount() {
        getIssueDetails(this.state.orderId, this.state.issueId)
            .then((res) => this.setState({issue: res[0]}))
    }

    updateMessages() {
        const messages = this.state.issue.messages;
        messages.push({
            message: this.state.message,
            author: 'user',
            createDate: Date.now().toString(),
            id: Date.now(),
            image: this.state.imageToDisplay
        })
        this.setState(prevState => ({
            ...prevState,
            issue: {
                ...prevState.issue,

                messages: [
                    ...messages
                ],
            }
        }))
    }

    get isValid(): boolean {
        return this.state.message !== '' || this.state.image !== ''
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
                image: f,
                imageToDisplay: reader.result
            })
        };
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Szczegóły zgłoszenia'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <IonItem style={{position: 'sticky', top: '-1px'}}>
                        <div className={'invoice-details-header-wrapper'}>
                            <div className={'invoice-details-header'}>
                                <div style={{fontSize: '18px', fontWeight: 'bold'}}>Zgłoszenie nr
                                    #{this.state.issue.issue.id}</div>
                                <div>{this.state.issue.issue.createDate ? moment(this.state.issue.issue.createDate).format('DD.MM.YYYY HH:mm') : ''}</div>
                            </div>
                            <div className={'invoice-details-header'}>
                                <div>Status: <span
                                    style={{color: this.state.issue.issue.status === 1 ? 'green' : '#d5410c'}}>{this.state.issue.issue.statusName}</span>
                                </div>
                            </div>
                        </div>
                    </IonItem>

                    <div style={{height: '72vh'}}>
                        <IssueMessagesList
                            messages={this.state.issue.messages}
                        />
                        {this.state.image &&
                            <div id={'selected-image'}>
                                Wybrane zdjęcie: {this.state.image.name}
                            </div>
                        }
                    </div>

                    <div id={'send-message-content-wrapper'}>
                        <IonTextarea
                            className={'message-input'}
                            autoGrow
                            rows={1}
                            onIonChange={(e) => this.setState({message: e.detail.value})}
                            placeholder={'Wpisz treść wiadomości'}
                            value={this.state.message}
                        >
                        </IonTextarea>
                        <div className={'add-photo-icons'}>
                            <input
                                type="file"
                                id="file-upload"
                                style={{display: 'none'}}
                                onChange={this.setImage}
                            />

                            <div onClick={this.openFileDialog}>
                                <img slot={'icon-only'} src={'assets/img/add-image.svg'}/>
                            </div>
                        </div>
                        <div
                            className={'send-message-icon'}
                            onClick={() => {
                                if (this.isValid) {
                                    this.updateMessages();
                                    sendMessage(
                                        this.state.orderId,
                                        this.state.issueId,
                                        this.state.message,
                                        this.state.image,
                                        'user'
                                    )
                                    this.setState({message: '', image: ''})
                                }
                            }}
                        >
                            <img src={'assets/img/send-message.svg'}/>
                        </div>
                    </div>


                </IonContent>
                <div id={'send-message-wrapper'}>

                </div>
            </IonPage>
        );
    }
}

export default IssueDetails;
