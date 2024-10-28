import './Preloader.css';
import React from "react";
import {IonLoading} from "@ionic/react";
import {preloaderState$} from '../../services/event-bus.service'

class Preloader extends React.Component<{}, {
    showScreen: boolean,
    message: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            showScreen: false,
            message: ''
        };
        preloaderState$.subscribe(res => {
            this.setState({ showScreen: res !== '', message: res });
        })
    }

    render() {
        return (
            <div>
                {(this.state.showScreen) ? (
                    <IonLoading
                        isOpen={this.state.showScreen}
                        message={this.state.message}
                    />
                ) : (<div></div>)}
            </div>
        )
    }
}

export default Preloader;
