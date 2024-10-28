import './HeaderComponent.css'
import React from 'react';
import {IonBackButton, IonBadge, IonButton, IonButtons, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import {RiShoppingBasket2Fill} from 'react-icons/ri';
import {cartId$, productsInCart$} from '../../services/event-bus.service';

class HeaderComponent extends React.Component<{
    headerTitle: string,
    cartId: number,
    cartProductsCount: number,
    source?: string,
    closeModalCallback?: any
}, {
    cartId: number,
    cartProductsCount: number,
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            cartId: 0,
            cartProductsCount: 0
        }
        productsInCart$.subscribe((res: number) => {
                this.setState(previousState => ({
                    cartProductsCount: previousState.cartProductsCount + res
                }))
                if (this.state.cartProductsCount < 0 || res === 0) {
                    this.setState({cartProductsCount: 0})
                }
            }
        )
        cartId$.subscribe((res: any) => {
            if (res) {
                this.setState({cartId: res})
            }
        })
    }

    onTriggerCart = () => {
        this.props.closeModalCallback(false)
    }

    render() {
        return (
            <IonHeader mode={'ios'}>
                <IonToolbar className={'no-bg-toolbar'}>
                    <IonButtons>
                        <IonBackButton icon={'assets/img/back-arrow.svg'} className={'back-arrow'} text={''}/>
                    </IonButtons>
                    <IonTitle className={'title-styled'}>{this.props.headerTitle}</IonTitle>
                    <IonButton className={'header-cart'} slot={'end'} fill={'clear'} color={'dark'}
                               routerLink={this.state.cartId !== 0 ? `/app/cart/${this.state.cartId}` : '/app/empty-cart'}
                               onClick={() => {
                                   this.props.source === 'filters' && this.onTriggerCart()
                               }}
                    >
                        <div className={'header-cart-inner'}>
                            <RiShoppingBasket2Fill/>
                            <IonBadge color={'light'}
                                      className={'header-cart-badge'}>{this.props.cartProductsCount || this.state.cartProductsCount}</IonBadge>
                        </div>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
        );
    }
}

export default HeaderComponent;
