import React from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonToolbar
} from '@ionic/react';
import {mailOpenOutline} from 'ionicons/icons';
import './ResetPassword.css'
import {doReset} from '../../../services/auth-http.service';

class ResetPassword extends React.Component<{}, {
    email: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: ''
        }
    };

    get isValid(): boolean {
        return this.state.email !== '';
    }

    render() {
        return (
            <IonPage>
                <IonHeader mode={'ios'} style={{height: '0'}}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow'} text={''}/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <div className={'auth-screen-logo'}>
                        <img src={'assets/img/logo-header.jpg'}/>
                    </div>
                    <div>
                        <img className={'logo-svg-black'} src="assets/img/piekarnia-logo-cropped.svg"/>
                    </div>

                    <h2 className={'ion-padding'}><b>Zapomniałeś hasła?</b></h2>
                    <div className={'inputs'}>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'E-mail'}
                                type={'email'}
                                onIonChange={e => this.setState({email: e.detail.value || ''})}
                            ><IonIcon icon={mailOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                    </div>

                    <div className="reset-button">
                        <IonButton
                            color="dark"
                            shape={'round'}
                            disabled={!this.isValid}
                            onClick={() => doReset(this.state.email)}
                            className={'custom-button single-button'}
                        >Zresetuj</IonButton>
                    </div>

                    <div className={'back-to-login'}>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            routerLink={'/login'}
                            routerDirection={'back'}
                            className={'custom-button single-button'}
                        >Powrót do logowania</IonButton>
                    </div>
                </IonContent>

            </IonPage>
        );
    }
}

export default ResetPassword;
