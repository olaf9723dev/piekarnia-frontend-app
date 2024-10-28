import './Layout.css';
import React from 'react';
import {IonContent, IonRouterOutlet} from '@ionic/react';
import {Redirect, Route} from 'react-router-dom';
import MapTab from '../../pages/MapTab';
import Calendar from '../../pages/Calendar';
import Notifications from '../../pages/Notifications';
import MyAccount from '../../pages/MyAccount';
import ChangePassword from '../AuthComponents/ChangePassword/ChangePassword';
import {
    cartId$,
    cartUpdateDate$,
    productOfferUpdateDate$,
    productsInCart$,
    tabBarStatus$,
    userStatus$
} from '../../services/event-bus.service';
import PersonalData from '../PersonalData/PersonalData';
import FilterPlaces from '../FilterComponents/FilterPlaces/FilterPlaces';
import ProductOffer from '../OfferComponents/ProductOffer/ProductOffer';
import ProductDetails from '../OfferComponents/ProductDetails/ProductDetails';
import CartComponent from '../CartComponents/CartComponent/CartComponent';
import {getOpenCart} from '../../services/cart.service';
import EmptyCart from '../CartComponents/EmptyCart/EmptyCart';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import OrderHistory from '../OrderComponents/OrderHistory/OrderHistory';
import EmptyOrderHistory from '../OrderComponents/EmptyOrderHistory/EmptyOrderHistory';
import OrderDetails from '../OrderComponents/OrderDetails/OrderDetails';
import ReportIssue from '../IssuesComponents/ReportIssue/ReportIssue';
import {IonReactRouter} from "@ionic/react-router";

class Layout extends React.Component<{}, {
}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <IonContent>
                <IonReactRouter>
                    <IonRouterOutlet>
                    </IonRouterOutlet>
                </IonReactRouter>

            </IonContent>
        )
    }
}

export default Layout;
