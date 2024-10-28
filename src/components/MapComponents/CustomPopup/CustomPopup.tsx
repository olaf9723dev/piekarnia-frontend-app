import React from 'react';
import {IonButton} from '@ionic/react';
import './CustomPopup.css'
import onClickOutside from 'react-onclickoutside';
import {PlaceModel} from '../../../models/place.model';
import {getCategories, getCategoriesForPlace} from '../../../services/offer.service';
import {CategoryModel} from '../../../models/category.model';
import CategorySwiper from '../../OfferComponents/CategorySwiper/CategorySwiper';
import {LaunchNavigator} from '@awesome-cordova-plugins/launch-navigator';
import {productOfferUpdateDate$} from '../../../services/event-bus.service';

class CustomPopup extends React.Component<{
    data: PlaceModel,
    outsideCallback: any,
    popupState: boolean
}, {
    categoriesList: CategoryModel[],
    placeAddress: string
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            categoriesList: [],
            placeAddress: ''
        }
    }

    async launchNavigate(placeAddress: string) {
        await LaunchNavigator.navigate(placeAddress)
    }

    componentDidMount() {
        getCategoriesForPlace(this.props.data.id)
            .then(res => {
                this.setState({
                    categoriesList: res.map((result: any) => {
                        return result.category
                    }),
                })
            })
        this.setState({placeAddress: `${this.props.data.address}, ${this.props.data.zipCode} ${this.props.data.city}`})
    }

    handleClickOutside = (event: any) => {
        this.props.outsideCallback(false);
    };

    render() {
        return (
            <div className={'popup-info ion-padding'}>
                <img className={'popup-icon'} src={this.props.data.logo}/>
                <h2>{this.props.data.name}</h2>
                <p>{this.props.data.address}, {this.props.data.city}, {this.props.data.zipCode}</p>
                {/*<div className={'delivery'}>*/}
                {/*    <div className={'delivery-inner'}>*/}
                {/*        <img src={'assets/img/alarm.svg'}/><b>20-25 min</b>*/}
                {/*    </div>*/}
                {/*    <div className={'delivery-inner'}>*/}
                {/*        <img src={'assets/img/scooter.svg'}/><b>5,99 zł</b>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div id={'categories-popup'}>
                    <CategorySwiper data={this.state.categoriesList} fromComponent='custom-popup'/>
                </div>

                <div id={'offer-button'}>
                    <IonButton
                        routerLink={`product-offer/${this.props.data.id}`}
                        className={'custom-button single-button'}
                        shape={'round'}
                        color={'dark'}
                        onClick={() => productOfferUpdateDate$.next(Date.now())}
                    >Oferta</IonButton>
                </div>
                <img src={'assets/img/navigate.svg'} className={'map-navigate-icon'} onClick={() => this.launchNavigate(this.state.placeAddress)}/>
            </div>

        );
    }
}

export default onClickOutside(CustomPopup)
