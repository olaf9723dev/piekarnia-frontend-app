import './Register.css';
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
import {lockOpenOutline, mailOpenOutline, personOutline} from 'ionicons/icons';
import {doRegister} from '../../../services/auth-http.service';
import {UserModel} from '../../../models/user.model';
import {getUsers} from '../../../services/auth.service';
import {toastState$} from '../../../services/event-bus.service';


class Register extends React.Component<{}, {
    login: string,
    password: string,
    password2: string,
    email: string,
    registered: boolean,
    usersList: UserModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: '',
            password2: '',
            email: '',
            registered: false,
            usersList: []
        };
    }

    static contextType = NavContext;

    redirectLogin() {
        this.context.navigate('/login')
    }

    componentDidMount() {
        getUsers()
            .then(res => {
                this.setState({usersList: res})
            })
    }

    registerUser(login: string, password: string, password2: string, email: string) {
        if (this.state.usersList.find(user => {
            return user.username === this.state.login
        })) {
            toastState$.next({
                message: 'Użytkownik o tej nazwie już istnieje',
                color: 'danger',
                duration: 2000
            })
        } else if (this.state.usersList.find(user => {
            return user.email === this.state.email
        })) {
            toastState$.next({
                message: 'Użytkownik o tym adresie e-mail już istnieje',
                color: 'danger',
                duration: 2000
            })
        } else {
            doRegister(login,
                password,
                password2,
                email
            ).then(() =>
                this.redirectLogin())
        }
    }

    get isValid(): boolean {
        return this.state.password !== '' &&
            this.state.login !== '' &&
            this.state.password2 === this.state.password &&
            this.state.email !== '';
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

                <IonContent className="register-screen">
                    <div className={'auth-screen-logo'}>
                        <img src={'assets/img/logo-header.jpg'}/>
                    </div>
                    <div>
                        <img className={'logo-svg-black'} src="assets/img/piekarnia-logo-cropped.svg"/>
                    </div>

                    <h2 className={'ion-padding'}><b>Zarejestruj się</b></h2>
                    <div className={'inputs'}>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Login'}
                                onIonChange={e => this.setState({login: e.detail.value || ''})}
                            ><IonIcon icon={personOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Hasło'}
                                type="password"
                                onIonChange={e => this.setState({password: e.detail.value || ''})}
                            ><IonIcon icon={lockOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Powtórz hasło'}
                                type="password"
                                onIonChange={e => this.setState({password2: e.detail.value || ''})}
                            ><IonIcon icon={lockOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'E-mail'}
                                type="email"
                                onIonChange={e => this.setState({email: e.detail.value || ''})}
                            ><IonIcon icon={mailOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                    </div>

                    <div className="sign-up-button">
                        <IonButton
                            color="dark"
                            shape={'round'}
                            disabled={!this.isValid}
                            onClick={() => {
                                this.registerUser(
                                    this.state.login,
                                    this.state.password,
                                    this.state.password2,
                                    this.state.email
                                )
                            }}
                            className={'custom-button single-button'}
                        >Zarejestruj</IonButton>
                    </div>

                    <div>
                        <IonButton
                            expand="block"
                            routerLink="/login"
                            fill={'clear'}
                            style={{color: '#333'}}
                        >Masz już konto? <b>Zaloguj się</b></IonButton>
                    </div>
                </IonContent>

            </IonPage>
        )
    }
}

export default Register;
