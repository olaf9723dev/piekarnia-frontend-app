import React from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonToolbar,
    NavContext
} from '@ionic/react';
import {lockOpenOutline} from 'ionicons/icons';
import './ChangePassword.css'
import {doChange} from '../../../services/auth-http.service';

class ChangePassword extends React.Component<{}, {
    oldPassword: string,
    newPassword1: string,
    newPassword2: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword1: '',
            newPassword2: ''
        }
    };

    static contextType = NavContext;

    redirectMyAccount() {
        this.context.navigate('/app/my-account')
    }

    get isValid(): boolean {
        return this.state.oldPassword !== '' &&
            this.state.newPassword1 !== '' &&
            this.state.newPassword2 !== '' &&
            this.state.newPassword1 === this.state.newPassword2
    }

    render() {
        return (
            <IonPage>
                <IonHeader mode={'ios'} style={{height: '0'}}>
                    <IonToolbar className={'no-bg-toolbar'} >
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow'} text={''}/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <div className={'auth-screen-logo'}>
                        <img src={'assets/img/logo-header.jpg'}/>
                    </div>
                    <div>
                        <img className={'logo-svg-black'} src="assets/img/piekarnia-logo-cropped.svg"/>
                    </div>

                    <p className={'ion-padding'}>Aby zmienić hasło najpierw podaj stare hasło, a następnie wpisz nowe i
                        powtórz je.</p>
                    <div className={'inputs'}>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Stare hasło'}
                                type={'password'}
                                onIonChange={e => this.setState({oldPassword: e.detail.value || ''})}
                            ><IonIcon icon={lockOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>

                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Nowe hasło'}
                                type={'password'}
                                onIonChange={e => this.setState({newPassword1: e.detail.value || ''})}
                            ><IonIcon icon={lockOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>

                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Powtórz hasło'}
                                type={'password'}
                                onIonChange={e => this.setState({newPassword2: e.detail.value || ''})}
                            ><IonIcon icon={lockOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                    </div>

                    <div className="change-password-button">
                        <IonButton
                            color="dark"
                            shape={'round'}
                            disabled={!this.isValid}
                            onClick={() => {
                                doChange(this.state.oldPassword,
                                    this.state.newPassword1,
                                    this.state.newPassword2);
                                this.redirectMyAccount();
                            }
                            }
                            className={'custom-button single-button'}
                        >Zmień hasło</IonButton>
                    </div>
                </IonContent>

            </IonPage>
        );
    }
}

export default ChangePassword;
