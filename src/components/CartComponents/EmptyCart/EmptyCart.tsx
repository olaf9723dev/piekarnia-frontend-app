import React from 'react';
import {IonButton, IonContent, IonPage} from '@ionic/react';
import './EmptyCart.css'
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';

class EmptyCart extends React.Component<{
    cartId: number,
    cartProductsCount: number,
    tabSelected: number
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <IonPage>
                <HeaderComponent headerTitle={'Koszyk'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div id={'empty-cart-container'}>
                        <div>
                            <img src={'assets/img/empty-cart.svg'}/>
                        </div>

                        <h2>Brak produktów w koszyku</h2>

                        <IonButton
                            color={'light'}
                            shape={'round'}
                            routerLink={'/app/map'}
                            className={'custom-button single-button'}
                            style={{marginTop: '3vh'}}
                        >
                            Zamów teraz
                        </IonButton>

                    </div>
                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

            </IonPage>
        );
    }
}

export default EmptyCart;
