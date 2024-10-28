import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {PushNotifications, PushNotificationSchema, Token} from '@capacitor/push-notifications';
import {IonReactRouter} from '@ionic/react-router';
import Login from './components/AuthComponents/Login/Login'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Preloader from './components/Preloader/Preloader';
import Toast from './components/Toast/Toast';
import About from './components/About/About';
import Social from './components/Social/Social';
import Street from './components/Street/Street';
import Scanner from './components/Scanner/Scanner';
import Register from './components/AuthComponents/Register/Register';
import ResetPassword from './components/AuthComponents/ResetPassword/ResetPassword';
import MapTab from './pages/MapTab';
import {
    cartId$,
    cartUpdateDate$, productDetailsUpdateDate$,
    productOfferUpdateDate$,
    productsInCart$,
    tabBarStatus$,
    tabSelected$, toastState$,
    userStatus$
} from './services/event-bus.service';
import EmptyCart from './components/CartComponents/EmptyCart/EmptyCart';
import CartComponent from './components/CartComponents/CartComponent/CartComponent';
import ProductOffer from './components/OfferComponents/ProductOffer/ProductOffer';
import ProductDetails from './components/OfferComponents/ProductDetails/ProductDetails';
import Calendar from './pages/Calendar';
import EmptyOrderHistory from './components/OrderComponents/EmptyOrderHistory/EmptyOrderHistory';
import OrderHistory from './components/OrderComponents/OrderHistory/OrderHistory';
import OrderDetails from './components/OrderComponents/OrderDetails/OrderDetails';
import ReportIssue from './components/IssuesComponents/ReportIssue/ReportIssue';
import Notifications from './pages/Notifications';
import MyAccount from './pages/MyAccount';
import ChangePassword from './components/AuthComponents/ChangePassword/ChangePassword';
import PersonalData from './components/PersonalData/PersonalData';
import './index.css'
import TransactionsHistory from './components/OrderComponents/TransactionsHistory/TranasctionsHistory';
import RateProduct from './components/RateProduct/RateProduct';
import InvoiceList from './components/InvoiceOrderComponents/InvoiceList/InvoiceList';
import InvoiceDetails from './components/InvoiceOrderComponents/InvoiceDetails/InvoiceDetails';
import OrderInvoice from './components/InvoiceOrderComponents/OrderInvoice/OrderInvoice';
import {getOpenCart} from './services/cart.service';
import IssueDetails from './components/IssuesComponents/IssueDetails/IssueDetails';
import {Capacitor} from '@capacitor/core';
import {post} from './services/http.service';
import News from "./components/News/News";
import Games from './components/Games/Games';

setupIonicReact();

class App extends React.Component<{}, {
    userLogged: boolean,
    tabBarOpen: boolean,
    openCartId: number,
    cartProductsCount: number,
    cartUpdateDate: number,
    productOfferUpdateDate: number,
    tabSelected: number,
    productDetailsUpdateDate: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            userLogged: false,
            tabBarOpen: false,
            openCartId: 0,
            cartProductsCount: 0,
            cartUpdateDate: 0,
            productOfferUpdateDate: 0,
            tabSelected: 1,
            productDetailsUpdateDate: 0
        };
        userStatus$.subscribe(res => {
            this.setState({userLogged: res})
        });
        tabBarStatus$.subscribe(res => {
                this.setState({tabBarOpen: res})
            }
        )
        cartId$.subscribe((res: any) => {
            if (res) {
                this.setState({openCartId: res})
            } else {
                this.setState({openCartId: 0})
            }
        })
        productsInCart$.subscribe((res: number) => {
                this.setState(previousState => ({
                    cartProductsCount: previousState.cartProductsCount + res
                }))
                if (this.state.cartProductsCount < 0 || res === 0) {
                    this.setState({cartProductsCount: 0})
                }
            }
        )
        cartUpdateDate$.subscribe(res => this.setState({cartUpdateDate: res}))
        productOfferUpdateDate$.subscribe(res => this.setState({productOfferUpdateDate: res}))
        tabSelected$.subscribe(res => this.setState({tabSelected: res}))
        productDetailsUpdateDate$.subscribe(res => this.setState({productDetailsUpdateDate: res}))
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{ userLogged: boolean; tabBarOpen: boolean; openCartId: number; cartProductsCount: number; cartUpdateDate: number; productOfferUpdateDate: number; tabSelected: number }>, snapshot?: any) {
        if (prevState.userLogged !== this.state.userLogged) {
            console.log(this.state)
            if (this.state.openCartId === 0 && this.state.userLogged) {
                setTimeout(() => {
                    getOpenCart()
                        .then((res) => {
                            if (res.length > 0) {
                                this.setState({openCartId: res[0].id, tabSelected: 1})
                            }
                        })
                }, 500)
            }
        }
    }

    register() {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration', (token: Token) => {
            const deviceType = Capacitor.platform;
            post(`mobile-devices/`, {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                registration_id: token.value,
                type: deviceType,
            })
                .then((res) => {
                    console.log(`Device registration: ${JSON.stringify(res)}`);
                });
        });

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        PushNotifications.addListener(
            'pushNotificationReceived',
            async (notification: PushNotificationSchema) => {
                toastState$.next({
                    message: notification.body,
                    duration: 2000,
                    color: 'secondary',
                    position: 'top',
                });
                console.log('Push received: ' + JSON.stringify(notification));
            }
        );

    }

    render() {
        return (
            <IonApp>
                <Preloader/>
                <Toast/>
                <IonReactRouter>
                    <IonRouterOutlet>
                        {/*<Route path="/app" component={Layout}/>*/}
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/reset-password" component={ResetPassword}/>
                        <Route exact path="/about">
                            <About
                                cartId={this.state.openCartId}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/scanner">
                            <Scanner
                                cartId={this.state.openCartId}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/news">
                            <News
                                cartId={this.state.openCartId}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route><Route exact path="/app/game/">
                        <Games
                            cartId={this.state.openCartId}
                            tabSelected={this.state.tabSelected}
                        />
                    </Route>
                        <Route exact path="/social">
                            <Social
                                cartId={this.state.openCartId}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/street">
                            <Street
                                cartId={this.state.openCartId}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/" component={HomeScreen}/>
                        <Route exact path="/app/map">
                            <MapTab
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/empty-cart">
                            <EmptyCart
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/cart/:id">
                            <CartComponent
                                cartId={this.state.openCartId}
                                key={this.state.cartUpdateDate}

                            />
                        </Route>
                        <Route exact path={'/app/product-offer/:id'}>
                            <ProductOffer
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                key={this.state.productOfferUpdateDate}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path={'/app/product-offer/:id/product-details/:id'}>
                            <ProductDetails
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                                key={this.state.productDetailsUpdateDate}
                            />
                        </Route>
                        <Route exact path="/app/calendar">
                            <Calendar
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/empty-order-history">
                            <EmptyOrderHistory
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/order-history">
                            <OrderHistory
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/order-history/:id/order-details">
                            <OrderDetails
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                            />
                        </Route>
                        <Route exact path="/app/order-history/:id/order-details/report-issue">
                            <ReportIssue
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                            />
                        </Route>
                        <Route exact path="/app/order-history/:id/order-details/issues/:id/issue-details">
                            <IssueDetails
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                            />
                        </Route>
                        <Route exact path="/app/rate-product/:id">
                            <RateProduct
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                            />
                        </Route>
                        <Route exact path="/app/transaction-history">
                            <TransactionsHistory
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/invoices">
                            <InvoiceList
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/invoices/:id/invoice-details">
                            <InvoiceDetails
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                            />
                        </Route>
                        <Route exact path="/app/invoices/order-invoice">
                            <OrderInvoice
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/notifications">
                            <Notifications
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/my-account">
                            <MyAccount
                                userLogged={this.state.userLogged}
                                cartId={this.state.openCartId}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/change-password">
                            <ChangePassword/>
                        </Route>
                        <Route exact path="/app/personal-data">
                            <PersonalData
                                cartId={this.state.openCartId}
                                cartProductsCount={this.state.cartProductsCount}
                                tabSelected={this.state.tabSelected}
                            />
                        </Route>
                        <Route exact path="/app/">
                            <Redirect to="/app/map"/>
                        </Route>

                    </IonRouterOutlet>
                </IonReactRouter>

            </IonApp>
        )
    }
}

export default App;
