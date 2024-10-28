import {get} from "./http.service";

const getPlaces = () => {
    return get('api/places', true);
}


export {
    getPlaces
}
