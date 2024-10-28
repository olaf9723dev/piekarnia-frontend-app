import {IonPage} from '@ionic/react';
import './MapTab.css';
import React from 'react';
import {getPlaces} from '../services/map.service';
import Map from '../components/MapComponents/Map/Map';
import {PlaceModel} from '../models/place.model';
import {tabBarStatus$} from '../services/event-bus.service';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';

class MapTab extends React.Component<{
    cartId: number,
    tabSelected: number,
    cartProductsCount: number
}, {
    places: PlaceModel[],
    tabBarOpen: boolean
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            places: [],
            tabBarOpen: true
        }
        tabBarStatus$.subscribe((res) => this.setState({tabBarOpen: res}))
    }

    componentDidMount() {
        getPlaces()
            .then(result => {
                this.setState({places: result})
            })
    }

    render() {
        return (
            <IonPage>
                {this.state.places.length > 0 &&
                    <Map
                        data={this.state.places}
                        cartId={this.props.cartId}
                        cartProductsCount={this.props.cartProductsCount}
                    />
                }
                {this.state.tabBarOpen &&
                    <CustomTabBar
                        cartId={this.props.cartId}
                        tabSelected={this.props.tabSelected}
                        key={this.props.cartId}
                    />
                }

            </IonPage>
        );
    }
}

export default MapTab;
