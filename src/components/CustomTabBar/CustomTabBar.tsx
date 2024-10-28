import React from 'react';
import {IonButton, IonContent, IonFab, IonFabButton} from '@ionic/react';
import './CustomTabBar.css'
import {cartId$, tabSelected$} from '../../services/event-bus.service';

class CustomTabBar extends React.Component<{
    cartId?: number,
    tabSelected: number
}, {
    cartId: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            cartId: 0
        }
        cartId$.subscribe((res: any) => {
            if (res) {
                this.setState({cartId: res})
            } else {
                this.setState({cartId: 0})
            }
        })
    }

    render() {
        return (
            <div id={'custom-tab-bar-wrapper'}>
                <div id={'custom-tab-bar'}>
                    <img id={'custom-tab-bar-img'} src={'assets/img/tab-background.svg'} alt={'tab-bar'}/>
                    <div id={'custom-tab-bar-left'}>
                        <IonButton
                            routerLink="/app/map"
                            routerDirection={'back'}
                            className={this.props.tabSelected === 1 ? 'tab-btn tab-selected' : 'tab-btn'}
                            onClick={() => {
                                tabSelected$.next(1)
                            }}
                            mode={'ios'}
                        >
                            <img className={'tab-btn-img'} src={'assets/img/map-tab.svg'}
                            />
                        </IonButton>
                        <IonButton
                            routerLink="/app/calendar"
                            routerDirection={window.location.pathname === '/app/map' ? 'forward' : 'back'}
                            className={this.props.tabSelected === 2 ? 'tab-btn tab-selected' : 'tab-btn'}
                            onClick={() => {
                                tabSelected$.next(2)
                            }}
                            mode={'ios'}
                        >
                            <img className={'tab-btn-img'} src={'assets/img/calendar-tab.svg'}
                            />
                        </IonButton>
                    </div>

                    <div id={'custom-tab-bar-right'}>
                        <IonButton
                            routerLink="/app/notifications"
                            routerDirection={window.location.pathname === '/app/calendar' || window.location.pathname === '/app/map' ? 'forward' : 'back'}
                            className={this.props.tabSelected === 3 ? 'tab-btn tab-selected' : 'tab-btn'}
                            onClick={() => {
                                tabSelected$.next(3)
                            }}
                            mode={'ios'}
                        >
                            <img className={'tab-btn-img'} src={'assets/img/notifications-tab.svg'}
                            />
                        </IonButton>
                        <IonButton
                            routerLink="/app/my-account"
                            routerDirection={'forward'}
                            className={this.props.tabSelected === 4 ? 'tab-btn tab-selected' : 'tab-btn'}
                            onClick={() => {
                                tabSelected$.next(4)
                            }}
                            mode={'ios'}
                        >
                            <img className={'tab-btn-img'} src={'assets/img/user-tab.svg'}
                            />
                        </IonButton>
                    </div>

                    <IonFab
                        vertical={'bottom'}
                        horizontal={'center'}
                        slot={'fixed'}
                        id={'fab-orders'}
                    >
                        <IonFabButton
                            routerLink={this.state.cartId ? `/app/cart/${this.state.cartId}` : this.props.cartId ? `/app/cart/${this.props.cartId}` : '/app/empty-cart'}
                            id={'fab-button'} translucent
                        >
                            <img src={'assets/img/cart.svg'}/>
                        </IonFabButton>
                    </IonFab>
                </div>
            </div>
        );
    }
}

export default CustomTabBar;
