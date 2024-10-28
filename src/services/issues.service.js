import {preloaderState$, toastState$} from "./event-bus.service";
import {get, post} from "./http.service";

const createIssue = (orderId, issueType, customIssueType, description) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/order-history/${orderId}/order-details/report-issue/`, {
            issueType: issueType,
            customIssueType: customIssueType,
            description: description,
        },)
            .then((result) => {
                toastState$.next({
                    message: 'Zgłoszenie zarejestrowano pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z wysyłaniem zgłoszenia. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const uploadIssueImage = (orderId, files) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/order-history/${orderId}/order-details/upload-images/`, files, false, {'Content-Type': 'multipart/form-data'})
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

const getOrderIssues = (orderId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/order-history/${orderId}/order-details/issues/`)
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

const getIssueDetails = (orderId, issueId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/order-history/${orderId}/order-details/issues/${issueId}/issue-details/`)
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

const sendMessage = (orderId, issueId, message, image, author) => {
    preloaderState$.next('Trwa wysyłanie wiadomości');
    return new Promise(resolve => {
        post(`api/order-history/${orderId}/order-details/issues/${issueId}/issue-details/send-message/`, {
            message: message,
            image: image,
            author: author
        }, false, {'Content-Type': 'multipart/form-data'})
            .then((result) => {
                toastState$.next({
                    message: 'Wiadomość wysłana',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z wysyłaniem wiadomości.',
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
    createIssue,
    getOrderIssues,
    sendMessage,
    getIssueDetails,
    uploadIssueImage
}
