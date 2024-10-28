import {preloaderState$, toastState$} from "./event-bus.service";
import {post, put} from "./http.service";

const doLogin = (username, password, status) => {
    preloaderState$.next('Trwa logowanie');
    return new Promise(resolve => {
        post('auth/login/', {
            username: username,
            password: password
        }, true)
            .then((result) => {
                toastState$.next({
                    message: 'Zostałeś zalogowany poprawnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result);
            })
            .catch((error) => {
                toastState$.next({
                    message: 'Wystąpił problem z logowaniem, spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const doReset = (email) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        post('auth/reset-password/', {
            email: email
        })
            .then((result) => {
                toastState$.next({
                    message: 'Na podany adres e-mail wysłano tymczasowe hasło',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                toastState$.next({
                    message: 'Podaj prawidłowy adres e-mail',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const doRegister = (username, password, password2, email) => {
    preloaderState$.next('Trwa rejestracja');
    return new Promise(resolve => {
        post('auth/register/', {
            username: username,
            password: password,
            password2: password2,
            email: email
        }, true)
            .then((result) => {
                toastState$.next({
                    message: 'Zostałeś zarejestrowany poprawnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result);
            })
            .catch((error) => {
                if (error.response.data.password[0]) {
                    toastState$.next({
                        message: error.response.data.password[0],
                        color: 'danger',
                        duration: 4000
                    })
                } else {
                    toastState$.next({
                        message: 'Wystąpił problem z rejestracją, spróbuj ponownie później.',
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

const doChange = (oldPassword, newPassword1, newPassword2) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        put('auth/change-password/', {
            oldPassword: oldPassword,
            newPassword1: newPassword1,
            newPassword2: newPassword2
        })
            .then((result) => {
                toastState$.next({
                    message: 'Hasło zmienione pomyślnie',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                toastState$.next({
                    message: 'Sprawdź poprawność danych i spróbuj ponownie',
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
    doLogin,
    doReset,
    doRegister,
    doChange
}
