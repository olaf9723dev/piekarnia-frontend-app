import {get} from "./http.service";
import {preloaderState$, toastState$} from "./event-bus.service";

const getCategories = () => {
    return new Promise(resolve => {
        get(`api/categories/`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
            })
    })
}

const getCategoriesForPlace = (placeId) => {
    return new Promise(resolve => {
        get(`api/categories/${placeId}`)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
            })
    })
}

const getProductOffer = (url) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(url, false, true)
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

const getProductOfferByCat = (url) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(url, false, true)
            .then((result) => {
                toastState$.next({
                    message: 'Dane pobrane pomyślnie',
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

const getProductDetails = (placeId, productId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/product-offer/${placeId}/product-details/${productId}/`)
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

const getProductImages = (placeId, productId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/product-offer/${placeId}/product-details/${productId}/images/`)
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

const getProductDescription = (placeId, productId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/product-offer/${placeId}/product-description/${productId}/`)
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

export {
    getCategories,
    getProductOffer,
    getProductImages,
    getProductDetails,
    getProductDescription,
    getCategoriesForPlace,
    getProductOfferByCat
}
