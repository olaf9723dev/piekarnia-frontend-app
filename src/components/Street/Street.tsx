import './Street.css';
import React from 'react';
import {IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonBackButton} from '@ionic/react';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import {get} from "../../services/http.service";

class Street extends React.Component<{
    cartId: number,
    tabSelected: number
}, {
    backgroundPosition: number;
}> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
        this.state = {
            backgroundPosition: 0
        };
        setTimeout(() => {
            this.setState({backgroundPosition: -3400});
        }, 100);
        setInterval(() => {
            this.setState({backgroundPosition: (this.state.backgroundPosition === 0) ? -3400 : 0});
        }, 12000);
    }

    render() {
        return (
            <IonPage>
                <IonHeader mode={'ios'} style={{height: '6vh'}}>
                    <IonToolbar className={'no-bg-toolbar'}>
                        <IonButtons>
                            <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow about-arrow'}
                                           text={''}/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <div className={'flex'}>
                        <div style={{
                            background: 'url(assets/img/laziska.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: this.state.backgroundPosition + 'px',
                            height: '100%',
                            transition: 'all 12s'}}/>
                    </div>

                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        )
    }
}

export default Street;
