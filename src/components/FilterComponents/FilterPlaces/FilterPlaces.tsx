import React from 'react';
import {IonButton, IonContent, IonModal, IonRange} from '@ionic/react';
import './FilterPlaces.css'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import {CategoryModel} from '../../../models/category.model';

class FilterPlaces extends React.Component<{
    callbackCloseModal: any,
    filterPlacesModalOpen: boolean,
    cartId: number,
    cartProductsCount: number,
    source: string,
    categoriesList?: CategoryModel[],
    callbackSelectFilters: any
}, {
    sortValue: string,
    priceValue: { gt: number, lt?: number },
    rateValue: number,
    typeValue: number,
    activeSort: number,
    activePrice: number,
    activeRate: number,
    activeType: number,
    rangeValue: { lower: any, upper: any }
    value: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            sortValue: '',
            priceValue: {gt: 0, lt: 0},
            rateValue: 0,
            typeValue: 0,
            activeSort: 0,
            activePrice: 0,
            activeRate: 0,
            activeType: 0,
            rangeValue: {lower: 0, upper: 0},
            value: 0
        }
    }

    customFormatter = (value: number) => `${value} km`;

    closeModal = () => {
        this.props.callbackCloseModal(false)
    }

    callbackSelectFilters = (sortValue: string, priceValue: { gt: number, lt?: number }, rateValue: number, typeValue: number, rangeValue: { lower: number, upper: number }) => {
        this.props.callbackSelectFilters({sortValue, priceValue, rateValue, typeValue, rangeValue})
    }

    render() {
        return (
            <IonModal
                isOpen={this.props.filterPlacesModalOpen}
                onDidDismiss={this.closeModal}
                swipeToClose
                mode={'ios'}
            >
                <HeaderComponent headerTitle={'Filtry'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount} source={'filters'} closeModalCallback={this.closeModal}/>

                <IonContent className={'ion-padding'}>
                    {this.props.source === 'offer' &&
                        <div>
                            <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Sortuj</div>
                            <Swiper
                                slidesPerView={2.5}
                                spaceBetween={18}
                                style={{marginLeft: '25px', marginTop: '20px'}}
                            >
                                {/*<SwiperSlide*/}
                                {/*    className={this.state.activeSort === 1 ? ' filter-tile active-tile' : 'filter-tile'}*/}
                                {/*    onClick={() => this.setState({*/}
                                {/*        sortValue: this.state.sortValue !== 'most_popular' ? 'most_popular' : '',*/}
                                {/*        activeSort: this.state.activeSort !== 1 ? 1 : 0*/}
                                {/*    })}*/}
                                {/*>*/}
                                {/*    <div>*/}
                                {/*        Popularność*/}
                                {/*    </div>*/}
                                {/*</SwiperSlide>*/}
                                <SwiperSlide
                                    className={this.state.activeSort === 2 ? ' filter-tile active-tile' : 'filter-tile'}
                                    onClick={() => this.setState({
                                        sortValue: this.state.sortValue !== 'lowest_price' ? 'lowest_price' : '',
                                        activeSort: this.state.activeSort !== 2 ? 2 : 0
                                    })}
                                >
                                    <div>
                                        Najniższa cena
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activeSort === 3 ? ' filter-tile active-tile' : 'filter-tile'}
                                    onClick={() => this.setState({
                                        sortValue: this.state.sortValue !== 'highest_price' ? 'highest_price' : '',
                                        activeSort: this.state.activeSort !== 3 ? 3 : 0
                                    })}
                                >
                                    <div>
                                        Najwyższa cena
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    }

                    {this.props.source === 'offer' &&
                        <div>
                            <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Kwota</div>
                            <Swiper
                                slidesPerView={3.5}
                                spaceBetween={18}
                                style={{marginLeft: '25px', marginTop: '20px'}}
                            >
                                <SwiperSlide
                                    className={this.state.activePrice === 1 ? 'price-tile active-tile' : 'price-tile'}
                                    onClick={() => this.setState({
                                        priceValue: this.state.priceValue.lt !== 20 ? {
                                            gt: 0,
                                            lt: 20
                                        } : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 1 ? 1 : 0
                                    })}
                                >
                                    <div>
                                        0 - 20
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activePrice === 2 ? 'price-tile active-tile' : 'price-tile'}
                                    onClick={() => this.setState({
                                        priceValue: this.state.priceValue.lt !== 40 ? {
                                            gt: 20,
                                            lt: 40
                                        } : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 2 ? 2 : 0
                                    })}
                                >
                                    <div>
                                        20 - 40
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activePrice === 3 ? 'price-tile active-tile' : 'price-tile'}
                                    onClick={() => this.setState({
                                        priceValue: this.state.priceValue.lt !== 60 ? {
                                            gt: 40,
                                            lt: 60
                                        } : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 3 ? 3 : 0
                                    })}
                                >
                                    <div>
                                        40 - 60
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activePrice === 4 ? 'price-tile active-tile' : 'price-tile'}
                                    onClick={() => this.setState({
                                        priceValue: this.state.priceValue.gt !== 60 ? {gt: 60} : {
                                            gt: 0,
                                            lt: 0
                                        }, activePrice: this.state.activePrice !== 4 ? 4 : 0
                                    })}
                                >
                                    <div>
                                        60+
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    }

                    {this.props.source === 'offer' &&
                        <div>
                            <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Ocena</div>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={18}
                                style={{marginLeft: '25px', marginTop: '20px'}}
                            >
                                <SwiperSlide
                                    className={this.state.activeRate === 1 ? 'rate-tile active-tile' : 'rate-tile'}
                                    onClick={() => this.setState({
                                        rateValue: this.state.rateValue !== 1 ? 1 : 0,
                                        activeRate: this.state.activeRate !== 1 ? 1 : 0
                                    })}
                                >
                                    <div>
                                        {this.state.activeRate === 1 ?
                                            <div><img src={'assets/img/rate-star-full-small.svg'}/> 1</div> :
                                            <div><img src={'assets/img/rate-star-empty-small.svg'}/> 1</div>
                                        }
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activeRate === 2 ? 'rate-tile active-tile' : 'rate-tile'}
                                    onClick={() => this.setState({
                                        rateValue: this.state.rateValue !== 2 ? 2 : 0,
                                        activeRate: this.state.activeRate !== 2 ? 2 : 0
                                    })}
                                >
                                    <div>
                                        {this.state.activeRate === 2 ?
                                            <div><img src={'assets/img/rate-star-full-small.svg'}/> 2</div> :
                                            <div><img src={'assets/img/rate-star-empty-small.svg'}/> 2</div>
                                        }
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activeRate === 3 ? 'rate-tile active-tile' : 'rate-tile'}
                                    onClick={() => this.setState({
                                        rateValue: this.state.rateValue !== 3 ? 3 : 0,
                                        activeRate: this.state.activeRate !== 3 ? 3 : 0
                                    })}
                                >
                                    <div>
                                        {this.state.activeRate === 3 ?
                                            <div><img src={'assets/img/rate-star-full-small.svg'}/> 3</div> :
                                            <div><img src={'assets/img/rate-star-empty-small.svg'}/> 3</div>
                                        }
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activeRate === 4 ? 'rate-tile active-tile' : 'rate-tile'}
                                    onClick={() => this.setState({
                                        rateValue: this.state.rateValue !== 4 ? 4 : 0,
                                        activeRate: this.state.activeRate !== 4 ? 4 : 0
                                    })}
                                >
                                    <div>
                                        {this.state.activeRate === 4 ?
                                            <div><img src={'assets/img/rate-star-full-small.svg'}/> 4</div> :
                                            <div><img src={'assets/img/rate-star-empty-small.svg'}/> 4</div>
                                        }
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activeRate === 5 ? 'rate-tile active-tile' : 'rate-tile'}
                                    onClick={() => this.setState({
                                        rateValue: this.state.rateValue !== 5 ? 5 : 0,
                                        activeRate: this.state.activeRate !== 5 ? 5 : 0
                                    })}
                                >
                                    <div>
                                        {this.state.activeRate === 5 ?
                                            <div><img src={'assets/img/rate-star-full-small.svg'}/> 5</div> :
                                            <div><img src={'assets/img/rate-star-empty-small.svg'}/> 5</div>
                                        }
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    }

                    {this.props.source === 'map' && this.props.categoriesList &&
                        <div>
                            <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Rodzaj</div>
                            <Swiper
                                slidesPerView={3.5}
                                spaceBetween={18}
                                style={{marginLeft: '25px', marginTop: '20px'}}
                            >
                                {this.props.categoriesList?.map((category) => (
                                    <SwiperSlide
                                        className={this.state.activeType === category.id ? 'filter-tile active-tile' : 'filter-tile'}
                                        onClick={() => this.setState({
                                            typeValue: category.id,
                                            activeType: category.id
                                        })}
                                    >
                                        <div>
                                            {category.name}
                                        </div>
                                    </SwiperSlide>

                                ))}

                            </Swiper>
                        </div>
                    }

                    {this.props.source === 'map' &&
                        <div>
                            <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Odległość</div>
                            <IonRange
                                dualKnobs={true}
                                min={0}
                                max={20}
                                step={1}
                                ticks={false}
                                pinFormatter={this.customFormatter}
                                pin={true}
                                color={'dark'}
                                className={'distance-range'}
                                onIonChange={
                                    (e) => {
                                        this.setState({rangeValue: e.detail.value as any})
                                    }}
                            />
                        </div>
                    }

                    <div className={'filter-button'}>
                        <IonButton
                            color="dark"
                            shape={'round'}
                            className={'custom-button single-button'}
                            onClick={() => {
                                this.closeModal()
                                this.callbackSelectFilters(
                                    this.state.sortValue,
                                    this.state.priceValue,
                                    this.state.rateValue,
                                    this.state.typeValue,
                                    this.state.rangeValue
                                )
                            }}
                        >Filtruj</IonButton>
                    </div>
                </IonContent>
            </IonModal>
        );
    }
}

export default FilterPlaces;
