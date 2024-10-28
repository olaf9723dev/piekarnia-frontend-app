import './Login.css';
import React from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonPage,
    IonToggle,
    IonToolbar,
    NavContext
} from '@ionic/react';
// @ts-ignore
import {loginUser, newStore} from '../../../services/auth.service';
import {SocialIcon} from 'react-social-icons';
import {IoLogoApple} from 'react-icons/io5';
import {lockOpenOutline, personOutline} from 'ionicons/icons';
import {doLogin} from '../../../services/auth-http.service';
import {get} from '../../../services/http.service';
import {Plugins} from '@capacitor/core';
import {FcGoogle} from 'react-icons/fc';
import {tabSelected$} from '../../../services/event-bus.service';

class Login extends React.Component<{}, {
    login: string,
    password: string,
    remember: boolean,
    user: any,
    userInfoGoogle: any,
    showAlert: boolean
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: '',
            remember: false,
            user: '',
            userInfoGoogle: '',
            showAlert: false
        };
    }

    static contextType = NavContext;

    redirectApp() {
        this.context.navigate('/app')
    }

    async componentDidMount() {
        await newStore.get('login')
            .then(res => {
                if (res) {
                    newStore.get('login')
                        .then(res => this.setState({login: res}))
                    newStore.get('password')
                        .then(res => this.setState({password: res, remember: true}))
                }
            })
    }


    get isValid(): boolean {
        return this.state.password !== '' && this.state.login !== '';
    }

    doLoginUser() {
        console.log(this.state.remember)
        doLogin(
            this.state.login,
            this.state.password
        )
            .then(result => {
                loginUser(
                    result,
                    this.state.login,
                    this.state.remember,
                    this.state.password
                )
                    .then(() => {
                        tabSelected$.next(1)
                        this.redirectApp();
                    });
            })
    }

    // async loginFb() {
    //     const FACEBOOK_PERMISSIONS = ['email', 'public_profile']
    //     await Plugins.FacebookLogin.initialize({appId: '1647718275596127'})
    //     const result = await Plugins.FacebookLogin.login({permissions: FACEBOOK_PERMISSIONS})
    //
    //     if (result.accessToken && result.accessToken.userId) {
    //         // this.setState({token: result.accessToken})
    //         this.loadUserData(result.accessToken);
    //     } else if (result.accessToken && !result.accessToken.userId) {
    //         this.getCurrentToken(result.accessToken)
    //     }
    // }

    // async getCurrentToken(accessToken: AccessToken) {
    //     const result = await Plugins.FacebookLogin.getCurrentAccessToken();
    //
    //     if (result.accessToken) {
    //         // this.setState({token: result.accessToken})
    //         this.loadUserData(result.accessToken);
    //     } else {
    //
    //     }
    // }

    // async loadUserData(accessToken: AccessToken) {
    //     const url = `https://graph.facebook.com/${accessToken.userId}?fields=id,email&access_token=${accessToken.token}`
    //     get(url)
    //         .then(res => {
    //             this.setState({user: res})
    //         })
    // }

    // async fbLogout() {
    //     await FacebookLogin.logout();
    //     this.setState({
    //         user: null, token: {
    //             token: '',
    //             userId: '',
    //             applicationId: '',
    //             declinedPermissions: [],
    //             expires: '',
    //             permissions: [],
    //             isExpired: false,
    //             lastRefresh: ''
    //         },
    //     })
    // }

    // async googleSignup() {
    //     const googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    //     console.log('my user: ', googleUser);
    //     this.setState({userInfoGoogle: googleUser})
    // }

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


                <IonContent className="login-screen">
                    <div className={'auth-screen-logo'}>
                        <img src={'assets/img/logo-header.jpg'}/>
                    </div>
                    <div>
                        <img className={'logo-svg-black'} src="assets/img/piekarnia-logo-cropped.svg"/>
                    </div>
                    <h2 className={'ion-padding'}><b>Zaloguj się</b></h2>
                    <div className={'inputs'}>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Login'}
                                onIonChange={e => this.setState({login: e.detail.value || ''})}
                                value={this.state.login}
                            ><IonIcon icon={personOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                        <IonItem lines={'none'} className={'auth-input'}>
                            <IonInput
                                placeholder={'Hasło'}
                                type={'password'}
                                onIonChange={e => this.setState({password: e.detail.value || ''})}
                                value={this.state.password}
                            ><IonIcon icon={lockOpenOutline}
                                      style={{color: '#bbb', fontSize: '24px', marginRight: '10px'}}/></IonInput>
                        </IonItem>
                    </div>

                    <div className={'remember-me'}>
                        <div style={{marginRight: '14px', fontSize: '16px'}}>Zapamiętaj mnie</div>
                        <IonToggle
                            color={'dark'}
                            style={{display: 'block'}}
                            onIonChange={(e) => {
                                this.setState({remember: e.detail.checked})
                            }}
                            checked={this.state.remember}
                        />
                    </div>

                    <div className="sign-in-buttons-login">
                        <div className={'login-button'}>
                            <IonButton
                                color="dark"
                                shape={'round'}
                                disabled={!this.isValid}
                                onClick={() => this.doLoginUser()}
                                className={'custom-button single-button'}
                            >Zaloguj</IonButton>
                        </div>
                        {/*<div className={'or-line'}>*/}
                        {/*    <p><span>LUB</span></p>*/}
                        {/*</div>*/}

                        {/*<div className={'socials'}>*/}
                        {/*    <div className={'social-logo'}>*/}
                        {/*        <SocialIcon network={'facebook'} onClick={this.loginFb}/>*/}
                        {/*    </div>*/}
                        {/*    <div className={'social-logo'}>*/}
                        {/*        <div className={'inner-logo'}>*/}
                        {/*            <IoLogoApple/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className={'social-logo'} onClick={this.googleSignup}>*/}
                        {/*        <FcGoogle/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>

                    <div className={'forgotten'}>
                        <IonButton
                            expand="block"
                            routerLink="/reset-password"
                            fill={'clear'}
                            style={{color: '#333'}}
                        ><b>Nie pamiętasz hasła?</b></IonButton>
                        <IonButton
                            expand="block"
                            routerLink="/register"
                            fill={'clear'}
                            style={{color: '#333'}}
                        >Nie masz jeszcze konta? <b>Zarejestruj się</b></IonButton>
                        <IonButton
                            expand="block"
                            fill={'clear'}
                            onClick={() => this.setState({showAlert: true})}
                            style={{color: '#333', marginBottom: '2vh'}}
                        >Chcesz usunąć konto? <b style={{color: 'red'}}>Kliknij tutaj</b></IonButton>
                        <IonAlert
                            isOpen={this.state.showAlert}
                            onDidDismiss={() => this.setState({showAlert: false})}
                            header="Usuwanie konta"
                            message="Aby usunąć konto, wyślij do nas wiadomość mailową na adres aplikacja@piekarniarzemieslnicza.pl, w treści maila podając swój login. Nasz zespół skontaktuje się z Tobą na adres mailowy przypisany do Twojego konta w celu potwierdzenia usunięcia konta.<br/>
                            Pozdrawiamy<br/>
                            Zespół Piekarnia Rzemieślnicza"
                            buttons={['OK']}
                        />
                    </div>
                </IonContent>

            </IonPage>
        )
    }
}

export default Login;
