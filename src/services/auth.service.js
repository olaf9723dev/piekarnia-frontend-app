// auth.service.js

import {Storage} from "@capacitor/storage";
import {Drivers, Storage as iStorage} from '@ionic/storage';
import jwt_decode from 'jwt-decode';
import {preloaderState$, toastState$, userStatus$} from "./event-bus.service";
import {get} from "./http.service";

const newStore = new iStorage({
    name: 'piekarniadb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
})
newStore.create();

const isLogged = async () => {
    return new Promise(resolve => {
        Storage.get({key: 'user'})
            .then(result => {
                if (result.value) {
                    const user = JSON.parse(result.value);
                    const decoded = jwt_decode(user.token);
                    if (decoded.exp < (new Date().getTime() / 1000)) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            })
    })
}

const loginUser = async (user, login, remember, password) => {
    await newStore.set('user', JSON.stringify(user.data.access))
    if (remember) {
        await newStore.set('login', login)
        await newStore.set('password', password)
    }
    return new Promise(resolve => {
        userStatus$.next(true);
        Storage.set({key: 'user', value: JSON.stringify(user.data.access)})
            .then(() => {
                resolve()
            });
        if (remember) {
            Storage.set({key: 'login', value: login})
            Storage.set({key: 'password', value: password})
        }
    })
}

const logoutUser = () => {
    userStatus$.next(false);
    toastState$.next({
        message: 'Zostałeś wylogowany poprawnie',
        color: 'success',
        duration: 2000
    })
}

const getUserName = async () => {
    return new Promise(resolve => {
        Storage.get({key: 'user'})
            .then(result => {
                if (result.value) {
                    const user = JSON.parse(result.value);
                    resolve(user.username);
                } else {
                    resolve(null);
                }
            })
    })
}

const getToken = async () => {
    return new Promise(resolve => {
        Storage.get({key: 'user'})
            .then(result => {
                if (result.value) {
                    const user = JSON.parse(result.value);
                    resolve(user);
                } else {
                    resolve(null);
                }
            })
    })
}

const getUsers = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get(`auth/users/`)
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
    isLogged,
    loginUser,
    logoutUser,
    getUserName,
    getToken,
    getUsers,
    newStore
}
