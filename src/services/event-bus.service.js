// event-bus.service.js

import {BehaviorSubject} from "rxjs";

const preloaderState$ = new BehaviorSubject('');
const toastState$ = new BehaviorSubject();
const userStatus$ = new BehaviorSubject(false);
const tabBarStatus$ = new BehaviorSubject(true);
const productsInCart$ = new BehaviorSubject(0);
const cartId$ = new BehaviorSubject(0);
const cartUpdateDate$ = new BehaviorSubject(Date.now());
const personalDataUpdateDate$ = new BehaviorSubject(Date.now());
const tabSelected$ = new BehaviorSubject(1);
const productOfferUpdateDate$ = new BehaviorSubject(Date.now());
const productDetailsUpdateDate$ = new BehaviorSubject(Date.now());
const orderIssuesUpdateDate$ = new BehaviorSubject(Date.now());

export {
    preloaderState$,
    toastState$,
    userStatus$,
    tabBarStatus$,
    productsInCart$,
    cartId$,
    cartUpdateDate$,
    personalDataUpdateDate$,
    tabSelected$,
    productOfferUpdateDate$,
    orderIssuesUpdateDate$,
    productDetailsUpdateDate$
}
