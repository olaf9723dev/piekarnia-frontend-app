import {preloaderState$, toastState$} from "./event-bus.service";
import {post} from "./http.service";

const PostProductRate = (productId, rate, comment) => {
    preloaderState$.next('Trwa wysyłanie danych');
    return new Promise(resolve => {
        post(`api/rate_product/${productId}/`, {
            rate: rate,
            comment: comment
        })
            .then((result) => {
                toastState$.next({
                    message: 'Dziękujemy za ocenę!',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z wysyłaniem oceny.',
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
    PostProductRate
}
