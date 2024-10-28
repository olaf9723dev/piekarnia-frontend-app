import './RateProduct.css'
import React from 'react';
import {IonButton, IonContent, IonItem, IonLabel, IonPage, IonTextarea} from '@ionic/react';
import {PostProductRate} from '../../services/rating-service';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

class RateProduct extends React.Component<{
    cartId: number,
    cartProductsCount: number
}, {
    rate: number,
    comment: string,
    emojiMap: { [id: number]: string },
    productId: any,
    rateStatus: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            rate: 0,
            comment: '',
            emojiMap: {
                1: 'assets/img/rate2.svg',
                2: 'assets/img/rate2.svg',
                3: 'assets/img/rate4.svg',
                4: 'assets/img/rate4.svg',
                5: 'assets/img/rate5.svg',
            },
            productId: window.location.pathname.split('/').at(-1),
            rateStatus: ''
        }
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Ocena produktu'} cartId={this.props.cartId} cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div className={'rate-product-wrapper'}>
                        <h1 className={'rate-header'}>Jak oceniasz<br/> smak?</h1>

                        <div className={'rate-emoji'}>
                            {this.state.rate !== 0 &&
                                <img src={this.state.emojiMap[this.state.rate]}/>
                            }
                        </div>

                        <div className={'rating-stars'}>
                            {this.state.rate === 1 ? (
                                <div className={'rating-stars-inner'}>
                                    <div onClick={() => this.setState({rate: 1})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 2})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 3})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 4})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 5})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                </div>
                            ) : this.state.rate === 2 ? (
                                <div className={'rating-stars-inner'}>
                                    <div onClick={() => this.setState({rate: 1})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 2})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 3})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 4})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 5})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                </div>
                            ) : this.state.rate === 3 ? (
                                <div className={'rating-stars-inner'}>
                                    <div onClick={() => this.setState({rate: 1})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 2})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 3})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 4})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 5})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                </div>
                            ) : this.state.rate === 4 ? (
                                <div className={'rating-stars-inner'}>
                                    <div onClick={() => this.setState({rate: 1})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 2})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 3})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 4})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 5})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                </div>
                            ) : this.state.rate === 5 ? (
                                <div className={'rating-stars-inner'}>
                                    <div onClick={() => this.setState({rate: 1})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 2})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 3})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 4})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 5})}><img
                                        src={'assets/img/rate-star-full.svg'}/></div>
                                </div>
                            ) : (
                                <div className={'rating-stars-inner'}>
                                    <div onClick={() => this.setState({rate: 1})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 2})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 3})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 4})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                    <div onClick={() => this.setState({rate: 5})}><img
                                        src={'assets/img/rate-star-empty.svg'}/></div>
                                </div>
                            )

                            }

                        </div>

                        {this.state.rateStatus !== 'rated' ? (
                                <div>
                                    <div>
                                        <IonItem lines={'none'}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginTop: '2vh',
                                                marginBottom: '2vh'
                                            }}>
                                                <img src={'assets/img/comment.svg'} style={{marginRight: '12px'}}/>
                                                <IonLabel position={'stacked'}
                                                          style={{color: '#999', marginTop: '1vh'}}>Dodaj
                                                    komentarz</IonLabel>
                                            </div>
                                            <IonTextarea
                                                onIonChange={e => this.setState({comment: e.detail.value || ''})}
                                                className={'modal-comment-input'}
                                            />
                                        </IonItem>
                                    </div>

                                    <div id={'rate-button'}>
                                        <IonButton
                                            className={'custom-button single-button'}
                                            shape={'round'}
                                            color={'dark'}
                                            onClick={() => PostProductRate(
                                                this.state.productId,
                                                this.state.rate,
                                                this.state.comment
                                            )
                                                .then(() => this.setState({rateStatus: 'rated'}))
                                            }
                                        >
                                            Gotowe
                                        </IonButton>
                                    </div>
                                </div>
                            ) :
                            <div id={'rate-comment'}>
                                Twoja ocena została zapisana. Dziękujemy!
                            </div>

                        }

                    </div>
                </IonContent>
            </IonPage>
        );
    }
}

export default RateProduct;
