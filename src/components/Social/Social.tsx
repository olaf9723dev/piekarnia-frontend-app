import './Social.css';
import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonBackButton} from '@ionic/react';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import {get} from "../../services/http.service";

class Social extends React.Component<{
    cartId: number,
    tabSelected: number
}, {}> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
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

                <IonContent fullscreen>
                    <div className={'flex'}>
                        <button className={'social'} onClick={() => window.open('https://www.facebook.com/PiekarniaRzemieslniczaBrzeczkowice')}>
                            <img src={'assets/img/facebook.svg'}/>
                        </button>
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

export default Social;
