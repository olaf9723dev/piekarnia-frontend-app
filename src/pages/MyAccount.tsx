import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    NavContext,
} from '@ionic/react';
import './MyAccount.css';
import React from 'react';
import {logoutUser} from '../services/auth.service';
import {Redirect} from 'react-router-dom';
import {chevronForwardOutline} from 'ionicons/icons';
import ClientInfo from '../components/ClientInfo/ClientInfo';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

class MyAccount extends React.Component<{
    userLogged: boolean,
    cartId: number,
    tabSelected: number
}, {
    segmentSelect: string,
    encodeResponse: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            segmentSelect: '',
            encodeResponse: ''
        };
    }

    doScan() {
        BarcodeScanner.scan()
            .then(result => {
                window.location.href = `/scanner?code=${result.text}`;
            })
            .catch(error => {
                console.error(error);
            })
    }

    static contextType = NavContext;

    redirectLogin() {
        this.context.navigate('/login');
    }

    render() {
        if (!this.props.userLogged) {
            return <Redirect to={'/login'}/>
        }

        return (
            <IonPage>
                <IonHeader mode={'ios'}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons slot={'end'}>
                            <IonButton
                                onClick={() => {
                                    logoutUser();
                                    this.redirectLogin();
                                }}
                            >
                                <span style={{color: '#f1a243', marginRight: '5vw'}}><b>Wyloguj</b></span>
                            </IonButton>
                        </IonButtons>
                        <IonTitle className={'title-styled'}>Moje dane</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>

                    <ClientInfo/>

                    <IonList style={{marginBottom: '15vh'}}>
                        <IonButton className={'my-account-btn'} expand={'full'} fill={'clear'} color={'dark'}
                                   routerLink={'personal-data'}>
                            <img className={'my-acc-left-icon'} src={'assets/img/my-data.svg'}/>
                            <div className={'my-acc-btn-desc'}>Moje dane</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/app/order-history'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/order-history.svg'}/>
                            <div className={'my-acc-btn-desc'}>Historia zamówień</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/app/transaction-history/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/transactions-history.svg'}/>
                            <div className={'my-acc-btn-desc'}>Historia transakcji</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/app/notifications/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/notifications.svg'}/>
                            <div className={'my-acc-btn-desc'}>Komunikaty</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/news/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/social.svg'}/>
                            <div className={'my-acc-btn-desc'}>Aktualności</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/app/invoices/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/invoices-list.svg'}/>
                            <div className={'my-acc-btn-desc'}>Lista faktur</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            onClick={this.doScan}
                            // routerLink={'/scanner'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/qr.svg'}/>
                            <div className={'my-acc-btn-desc'}>Skaner QR</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/app/game/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/game.svg'}/>
                            <div className={'my-acc-btn-desc'}>Gry</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/social/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/social.svg'}/>
                            <div className={'my-acc-btn-desc'}>Społeczność</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        <IonButton
                            className={'my-account-btn'}
                            expand={'full'}
                            color={'dark'}
                            fill={'clear'}
                            routerLink={'/street/'}
                        >
                            <img className={'my-acc-left-icon'} src={'assets/img/street.svg'}/>
                            <div className={'my-acc-btn-desc'}>Wirtualny spacer</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>

                        {/*<IonButton className={'my-account-btn'} expand={'full'} color={'dark'} fill={'clear'}>*/}
                        {/*    <img className={'my-acc-left-icon'} src={'assets/img/qr-scanner.svg'}/>*/}
                        {/*    <div className={'my-acc-btn-desc'}>Skaner QR</div>*/}
                        {/*    <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>*/}
                        {/*</IonButton>*/}

                        <IonButton className={'my-account-btn'} expand={'full'} color={'dark'} fill={'clear'}
                                   routerLink={'/app/change-password'}>
                            <img className={'my-acc-left-icon'} src={'assets/img/change-password.svg'}/>
                            <div className={'my-acc-btn-desc'}>Zmiana hasła</div>
                            <IonIcon className={'my-acc-right-icon'} icon={chevronForwardOutline} slot={'end'}/>
                        </IonButton>
                    </IonList>
                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                />

            </IonPage>
        );
    }
}

export default MyAccount;
