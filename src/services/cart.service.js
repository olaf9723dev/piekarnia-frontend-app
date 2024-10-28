import {preloaderState$, toastState$} from "./event-bus.service";
import {get, post, del} from "./http.service";

const addToCart = (placeId, productId, quantity, variant) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/product-offer/${placeId}/product-details/${productId}/add-cart/`, {
            quantity: quantity,
            productId: productId,
            variant: variant,
        },)
            .then((result) => {
                toastState$.next({
                    message: 'Produkt dodany do koszyka',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z dodawaniem produktu. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const removeProductFromCart = (cartId, productId) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        del(`api/product-offer/${cartId}/${productId}/remove-cart-product/`)
            .then((result) => {
                toastState$.next({
                    message: 'Produkt usunięto z koszyka',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z usuwaniem produktu. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const removePlaceFromCart = (cartId, placeId) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        del(`api/product-offer/${cartId}/${placeId}/remove-cart-place/`)
            .then((result) => {
                toastState$.next({
                    message: 'Produkty usunięto z koszyka',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z usuwaniem produktów. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getCartProducts = (cartId) => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/cart/${cartId}/`)
            .then((result) => {
                toastState$.next({
                    message: 'Koszyk uzupełniony',
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

const getOpenCart = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`api/cart/`)
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

const closeCart = (cartId) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/cart/${cartId}/close/`, {})
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

const updateProductsInCartQuantities = (cartId, data) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post(`api/cart/${cartId}/update-quantities/`, {data: data})
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

export {
    addToCart,
    getCartProducts,
    getOpenCart,
    removeProductFromCart,
    removePlaceFromCart,
    closeCart,
    updateProductsInCartQuantities
}
