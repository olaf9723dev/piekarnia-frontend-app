import {preloaderState$, toastState$} from "./event-bus.service";
import {get, post, put} from "./http.service";

const getOrderHistory = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/order-history/`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z pobieraniem danych.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getClientRepeatedOrders = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/calendar/client-repeated-orders/`)
            .then((result) => {
                toastState$.next({
                    message: 'Dane pobrano pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    console.log('Unauthorized')
                } else {
                    toastState$.next({
                        message: 'Wystąpił problem z pobieraniem danych.',
                        color: 'danger',
                        duration: 2000
                    })
                }
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const createOrder = (data) => {
    return new Promise(resolve => {
        post(`api/create-order/`, {data})
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getOrderDetails = (orderId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/order-history/${orderId}/order-details/`)
            .then((result) => {
                toastState$.next({
                    message: 'Dane pobrano pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z pobieraniem danych.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getOrderInvoice = (orderId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/order-history/${orderId}/order-details/order-invoice/`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z pobieraniem danych.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getOrderRepeatability = (orderId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/order-history/${orderId}/order-details/order-repeatability/`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z pobieraniem danych.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const turnOffRepeat = (orderId) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/order-history/${orderId}/order-details/turnoff-repeat/`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Powtarzanie wyłączono pomyślnie',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const copyToCart = (orderId, orderDetails) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/order-history/${orderId}/order-details/copy-to-cart/`, {
            orderDetails: orderDetails
        })
            .then((result) => {
                resolve(result)
                toastState$.next({
                    message: 'Produkty skopiowano do koszyka',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem danych',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const updateRepeatability = (orderId, repeatFrequency, repeatDays) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        put(`api/order-history/${orderId}/order-details/update-repeatability/`, {
            repeatFrequency: repeatFrequency,
            repeatDays: repeatDays
        })
            .then((result) => {
                resolve(result)
                toastState$.next({
                    message: 'Zaktualizowano powtarzalność zamówienia',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem danych',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getDeliveryTypes = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/delivery-types/`)
            .then((result) => {
                toastState$.next({
                    message: 'Dane pobrano pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z pobieraniem danych.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}


export {
    getOrderHistory,
    createOrder,
    getOrderDetails,
    getOrderInvoice,
    getOrderRepeatability,
    turnOffRepeat,
    copyToCart,
    updateRepeatability,
    getClientRepeatedOrders,
    getDeliveryTypes
}
