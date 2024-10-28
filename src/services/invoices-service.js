import {preloaderState$, toastState$} from "./event-bus.service";
import {get, post} from "./http.service";

const getInvoices = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/invoices/`)
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

const orderInvoice = (selectedOrders, selectedInvoiceData) => {
    preloaderState$.next('Trwa wysyłanie zlecenia');
    return new Promise(resolve => {
        post(`api/invoices/order-invoice/`, {
            selectedOrders: selectedOrders,
            selectedInvoiceData: selectedInvoiceData,
        })
            .then((result) => {
                toastState$.next({
                    message: 'Zlecono wystawienie faktur',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z wysyłaniem danych.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getInvoiceData = (invoiceId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/invoices/${invoiceId}/invoice-details/`)
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

const getOrdersWithoutInvoices = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/invoices/invoiceless-orders/`)
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
    getInvoices,
    orderInvoice,
    getInvoiceData,
    getOrdersWithoutInvoices
}
