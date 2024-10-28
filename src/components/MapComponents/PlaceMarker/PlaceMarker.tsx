import React from 'react';
import {Marker} from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

import './PlaceMarker.css'
import CustomPopup from '../CustomPopup/CustomPopup';
import {tabBarStatus$} from '../../../services/event-bus.service';


class PlaceMarker extends React.Component<{
    data: any,
}, {
    position: [number, number],
    pin: any,
    popupState: boolean
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            position: [0, 0],
            pin: '',
            popupState: false
        }
    }

    componentDidMount() {
        this.setState(
            {
                position: [this.props.data.latitude, this.props.data.longitude],
                pin: `<img src="${this.props.data.logo}"/>`
            })
    }

    handleOutsideCallback = (status: boolean) => {
        this.setState({popupState: status});
        tabBarStatus$.next(true)
    }

    render() {
        return (
            <div>
                <Marker
                    key={this.props.data.id}
                    position={this.state.position}
                    icon={L.divIcon({html: this.state.pin, iconSize: [25, 25]})}
                    eventHandlers={{
                        click: () => {
                            this.setState({popupState: !this.state.popupState})
                            tabBarStatus$.next(false)
                        }
                    }}
                >
                </Marker>
                    <div style={{display: this.state.popupState ? 'flex' : 'none'}}>
                        <CustomPopup
                            data={this.props.data}
                            outsideCallback={this.handleOutsideCallback}
                            popupState={this.state.popupState}
                            eventTypes={'click'}
                        />
                    </div>
            </div>
        );
    }
}

export default PlaceMarker;
