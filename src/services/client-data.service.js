import {del, get, post, put} from "./http.service";
import {personalDataUpdateDate$, preloaderState$, toastState$} from "./event-bus.service";

const getClientAddresses = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get('api/addresses/')
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

const getClientInvoicesData = () => {
    preloaderState$.next('Trwa pobieranie danych');
    return new Promise(resolve => {
        get('api/invoice-data/')
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

const handleSetToDefaultAddress = (id, isDefault) => {
    preloaderState$.next('Trwa ustawianie domyślnych danych');
    return new Promise(resolve => {
        put('api/addresses/', {
            id: id,
            isDefault: isDefault,
        },)
            .then((result) => {
                toastState$.next({
                    message: 'Dane ustawione jako domyślne',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const handleSetToDefaultInvoice = (id, isDefault) => {
    preloaderState$.next('Trwa ustawianie domyślnych danych');
    return new Promise(resolve => {
        put('api/invoice-data/', {
            id: id,
            isDefault: isDefault,
        },)
            .then((result) => {
                toastState$.next({
                    message: 'Dane ustawione jako domyślne',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const doAddAddress = (addressName, name, surname, address, zipCode, city, comment, phoneNumber) => {
    preloaderState$.next('Trwa dodawanie adresu');
    return new Promise(resolve => {
        post('api/addresses/', {
            addressName: addressName,
            name: name,
            surname: surname,
            address: address,
            zipCode: zipCode,
            city: city,
            comment: comment,
            phoneNumber: phoneNumber
        })
            .then(() => {
                toastState$.next({
                    message: 'Adres zapisany pomyślnie',
                    color: 'success',
                    duration: 2000
                });
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z dodawaniem adresu. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const doEditAddress = (addressId, addressName, name, surname, address, zipCode, city, comment, phoneNumber) => {
    preloaderState$.next('Trwa aktualizowanie adresu');
    return new Promise(resolve => {
        put('api/addresses/', {
            id: addressId,
            addressName: addressName,
            name: name,
            surname: surname,
            address: address,
            zipCode: zipCode,
            city: city,
            comment: comment,
            phoneNumber: phoneNumber
        })
            .then(() => {
                toastState$.next({
                    message: 'Adres zapisany pomyślnie',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem adresu. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })

    })
}

const doAddInvoiceData = (name, nip, companyName, address, zipCode, city) => {
    preloaderState$.next('Trwa dodawanie danych do faktury');
    return new Promise(resolve => {
        post('api/invoice-data/', {
            name: name,
            nip: nip,
            companyName: companyName,
            address: address,
            zipCode: zipCode,
            city: city
        },)
            .then(() => {
                toastState$.next({
                    message: 'Dane do faktury zapisane pomyślnie',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z dodawaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const doEditInvoiceData = (invoiceDataId, name, nip, companyName, address, zipCode, city) => {
    preloaderState$.next('Trwa aktualizowanie danych do faktury');
    return new Promise(resolve => {
        put('api/invoice-data/', {
            id: invoiceDataId,
            name: name,
            nip: nip,
            companyName: companyName,
            address: address,
            zipCode: zipCode,
            city: city,
        },)
            .then(() => {
                toastState$.next({
                    message: 'Dane do faktury zapisane pomyślnie',
                    color: 'success',
                    duration: 2000
                })
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })

    })
}

const getDataFromGUS = (nip) => {
    preloaderState$.next('Trwa pobieranie danych z GUS');
    return new Promise(resolve => {
        get(`regon/search/?nip=${nip}`)
            .then((result) => {
                toastState$.next({
                    message: 'Dane pobrano pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result);
            })
            .catch((error) => {
                console.log(error);
                toastState$.next({
                    message: 'Wystąpił problem przy pobieraniu danych',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const getClientInfo = () => {
    return get('api/client/');
}

const updateClientInfo = (firstName, lastName) => {
    preloaderState$.next('Trwa aktualizowanie danych');
    return new Promise(resolve => {
        put('api/client/change-data/', {
            firstName: firstName,
            lastName: lastName,
        })
            .then((result) => {
                toastState$.next({
                    message: 'Dane zapisane pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z aktualizowaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
            })
    })
}

const removeAddress = (addressId) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        del(`api/addresses/${addressId}`)
            .then((result) => {
                toastState$.next({
                    message: 'Dane adresowe usunięto pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z usuwaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
                personalDataUpdateDate$.next(Date.now())
            })
    })
}

const removeInvoiceData = (invoiceDataId) => {
    preloaderState$.next('Proszę czekać');
    return new Promise(resolve => {
        del(`api/invoice-data/${invoiceDataId}`)
            .then((result) => {
                toastState$.next({
                    message: 'Dane fakturowe usunięto pomyślnie',
                    color: 'success',
                    duration: 2000
                })
                resolve(result)
            })
            .catch((error) => {
                console.log(error)
                toastState$.next({
                    message: 'Wystąpił problem z usuwaniem danych. Spróbuj ponownie później.',
                    color: 'danger',
                    duration: 2000
                })
            })
            .finally(() => {
                preloaderState$.next('');
                personalDataUpdateDate$.next(Date.now())
            })
    })
}


export {
    getClientAddresses,
    getClientInvoicesData,
    handleSetToDefaultAddress,
    handleSetToDefaultInvoice,
    doEditAddress,
    doAddAddress,
    doAddInvoiceData,
    doEditInvoiceData,
    getDataFromGUS,
    getClientInfo,
    updateClientInfo,
    removeAddress,
    removeInvoiceData
}
