import './Scanner.css';
import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonBackButton} from '@ionic/react';
import CustomTabBar from '../CustomTabBar/CustomTabBar';

class Scanner extends React.Component<{
    cartId: number,
    tabSelected: number
}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <IonPage>
                <IonHeader mode={'ios'} style={{height: '6vh'}}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow about-arrow'}
                                           text={''}/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen className={'background'}>
                    <div id={'about-wrapper'}>
                        <div className={'logo'} style={{marginTop: 0}}>
                            <img className={'logo-svg'} src={'assets/img/piekarnia-logo-cropped.svg'}/>
                        </div>
                        <div
                            className={'about-desc'}
                            style={{color: '#fefefe', fontSize: '18px'}}
                        >
                            Zeskanowano nieprawidłowy kod, spróbuj ponownie lub skontaktuj się z nami.
                        </div>
                    </div>

                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        )
    }
}

export default Scanner;
