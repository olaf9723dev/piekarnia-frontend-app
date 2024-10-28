import './HomeScreen.css';
import React from 'react';
import {IonButton, IonContent, IonPage} from '@ionic/react';

class HomeScreen extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <IonPage>
                <IonContent className={'background'}>
                    <div className={'logo'}>
                        <img className={'logo-svg'} src="assets/img/piekarnia-logo-cropped.svg"/>
                    </div>
                    <div id={'welcome'}>
                        Witaj<br/> w Piekarni Rzemieślniczej!
                    </div>
                    <div className="offer-button">
                        <IonButton
                            color="light"
                            routerLink="/app/map" shape={'round'}
                            className={'custom-button offer'}
                        >Zobacz ofertę</IonButton>
                    </div>
                    <div className="sign-in-buttons">
                        <div>
                            <IonButton
                                color="light"
                                routerLink="/register"
                                className={'custom-button register-left'}
                                shape={'round'}
                            >Zarejestruj</IonButton>
                        </div>
                        <div>
                            <IonButton
                                color="dark"
                                routerLink="/login"
                                className={'custom-button login-right'}
                                shape={'round'}
                            >Zaloguj</IonButton>
                        </div>
                    </div>
                    <div className={'about'}>
                        <IonButton
                            routerLink="/about"
                            fill={'clear'}
                            style={{color: 'white', fontSize: '20px'}}
                            mode={'ios'}
                        >Dowiedz się więcej<b>o aplikacji</b></IonButton>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

export default HomeScreen;
