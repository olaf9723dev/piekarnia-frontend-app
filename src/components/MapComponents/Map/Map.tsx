import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
import {Geolocation} from '@capacitor/geolocation';

import 'leaflet/dist/leaflet.css'
import './Map.css'
import {IonButton, IonInput, IonItem} from '@ionic/react';
import {FaFilter} from 'react-icons/fa';
import {PlaceModel} from '../../../models/place.model';
import FilterPlaces from '../../FilterComponents/FilterPlaces/FilterPlaces';
import {getCategories} from '../../../services/offer.service';
import {CategoryModel} from '../../../models/category.model';
import {convertDistance, getDistance} from 'geolib';

class Map extends React.Component<{
    data: PlaceModel[],
    cartId: number,
    cartProductsCount: number
}, {
    searchInput: string,
    filterPlacesModalOpen: boolean,
    categoriesList: CategoryModel[],
    currentPosition: {latitude: number, longitude: number},
    filteredPlaces: PlaceModel[]
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchInput: '',
            filterPlacesModalOpen: false,
            categoriesList: [],
            currentPosition: {latitude: 0, longitude: 0},
            filteredPlaces: []
        }
    }

    componentDidMount() {
        getCategories()
            .then(res => {
                this.setState({
                    categoriesList: res,
                    filteredPlaces: this.props.data
                })
            })
        this.printCurrentPosition()
            .then((res) => this.setState({currentPosition: {latitude: res.coords.latitude, longitude: res.coords.longitude}}))
    }

    printCurrentPosition = async () => {
        return await Geolocation.getCurrentPosition()
    };

    handleCloseModal = (status: boolean) => {
        this.setState({filterPlacesModalOpen: status})
    }

    handleSelectFilters = (res: { rangeValue: { lower: number, upper: number }, typeValue: number }) => {
        let filteredPlaces: PlaceModel[] = this.props.data;
        if (res.rangeValue.upper !== 0) {
            filteredPlaces = filteredPlaces.filter((place) => {
                const placePosition = {latitude: place.latitude, longitude: place.longitude}
                const distance = convertDistance(getDistance(placePosition, this.state.currentPosition), 'km')
                return distance >= res.rangeValue.lower && distance <= res.rangeValue.upper
            })
        }
        // todo jak z filtrowaniem po kategoriach?
        this.setState({filteredPlaces: filteredPlaces})
    }

    render() {
        return (
            <div className={'leaflet-container'}>
                {this.state.currentPosition.latitude !== 0 &&
                <MapContainer
                    center={[this.state.currentPosition.latitude, this.state.currentPosition.longitude]}
                    zoom={15}
                    zoomControl={false}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/basic-gray/{z}/{x}/{y}.png?key=OKSJQ3p0mm3s2iZvRer2"
                    />
                    {this.props.data.map(place => (
                        <PlaceMarker data={place} key={place.id}/>
                    ))}
                </MapContainer>
                    }
                <div className={'search-filter-tools'}>
                    <div>
                        <IonItem className={'search-input'}>
                            <img src={'assets/img/search.svg'} style={{marginRight: '8px'}}/>
                            <IonInput
                                placeholder={'Jedzenie, lokal...'}
                                onIonChange={e => this.setState({searchInput: e.detail.value || ''})}
                            />
                            <img src={'assets/img/pin.svg'} style={{marginRight: '5px'}}/>
                        </IonItem>
                    </div>
                    <div className={'map-filter-icon'}>
                        <IonButton
                            fill={'clear'}
                            style={{color: '#aaa'}}
                            onClick={() => this.setState({filterPlacesModalOpen: true})}
                        >
                            <FaFilter/>
                        </IonButton>
                    </div>
                </div>

                <FilterPlaces
                    filterPlacesModalOpen={this.state.filterPlacesModalOpen}
                    callbackCloseModal={this.handleCloseModal}
                    cartId={this.props.cartId}
                    cartProductsCount={this.props.cartProductsCount}
                    source={'map'}
                    categoriesList={this.state.categoriesList}
                    callbackSelectFilters={this.handleSelectFilters}
                />

            </div>
        );
    }
}

export default Map;
