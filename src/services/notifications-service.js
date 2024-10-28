import {preloaderState$, toastState$} from "./event-bus.service";
import {get} from "./http.service";

const getNotifications = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/notifications/`)
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
    getNotifications
}
