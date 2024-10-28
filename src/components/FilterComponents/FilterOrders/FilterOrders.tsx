import React from 'react';
import {IonButton, IonContent, IonModal} from '@ionic/react';
import './FilterOrders.css'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import HeaderComponent from '../../HeaderComponent/HeaderComponent';

class FilterOrders extends React.Component<{
    callbackCloseModal: any,
    filterOrdersModalOpen: boolean,
    cartId: number,
    cartProductsCount: number,
    callbackSelectFilters: any,
    source: string
}, {
    sortValue: string,
    priceValue: { gt: number, lt?: number },
    dateRangeValue: { gt?: number, lt: number },
    repeatability: string,
    activeSort: number,
    activePrice: number,
    activeDateRange: number,
    activeRepeatability: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            sortValue: '',
            priceValue: {gt: 0, lt: 0},
            activeSort: 0,
            activePrice: 0,
            dateRangeValue: {gt: 0, lt: 0},
            activeDateRange: 0,
            repeatability: '',
            activeRepeatability: 0
        }
    }

    closeModal = () => {
        this.props.callbackCloseModal(false)
    }

    callbackSelectFilters = (sortValue: string, priceValue: { gt: number, lt?: number }, dateRangeValue: { gt?: number, lt: number }, repeatability: string) => {
        this.props.callbackSelectFilters({sortValue, priceValue, dateRangeValue, repeatability})
    }

    render() {
        return (
            <IonModal
                isOpen={this.props.filterOrdersModalOpen}
                onDidDismiss={this.closeModal}
                swipeToClose
                mode={'ios'}
            >
                <HeaderComponent headerTitle={'Filtry'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount} source={'filters'} closeModalCallback={this.closeModal}/>

                <IonContent className={'ion-padding'}>
                    <div>
                        <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Sortuj</div>
                        <Swiper
                            slidesPerView={2.1}
                            spaceBetween={18}
                            style={{marginLeft: '25px', marginTop: '20px'}}
                        >
                            <SwiperSlide
                                className={this.state.activeSort === 1 ? ' filter-tile-orders active-tile' : 'filter-tile-orders'}
                                onClick={() => this.setState({sortValue: this.state.sortValue !== 'order_date' ? 'order_date' : '', activeSort: this.state.activeSort !== 1 ? 1 : 0})}
                            >
                                <div>
                                    Data zamówienia
                                </div>
                            </SwiperSlide>
                            <SwiperSlide
                                className={this.state.activeSort === 2 ? ' filter-tile-orders active-tile' : 'filter-tile-orders'}
                                onClick={() => this.setState({sortValue: this.state.sortValue !== 'order_price' ? 'order_price' : '', activeSort: this.state.activeSort !== 2 ? 2 : 0})}
                            >
                                <div>
                                    {this.props.source === 'orders_history'  ? 'Wartość zamówienia' : 'Kwota zamówienia'}
                                </div>
                            </SwiperSlide>
                            {this.props.source === 'orders_history' &&
                                <SwiperSlide
                                    className={this.state.activeSort === 3 ? ' filter-tile-orders active-tile' : 'filter-tile-orders'}
                                    onClick={() => this.setState({
                                        sortValue: this.state.sortValue !== 'order_status' ? 'order_status' : '',
                                        activeSort: this.state.activeSort !== 3 ? 3 : 0
                                    })}
                                >
                                    <div>
                                        Status zamówienia
                                    </div>
                                </SwiperSlide>
                            }
                        </Swiper>
                    </div>

                    <div>
                        <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Kwota</div>
                        <Swiper
                            slidesPerView={3.5}
                            spaceBetween={18}
                            style={{marginLeft: '25px', marginTop: '20px'}}
                        >
                            <SwiperSlide
                                className={this.state.activePrice === 1 ? 'price-tile active-tile' : 'price-tile'}
                                onClick={() => this.setState({priceValue: this.state.priceValue.lt !== 30 ? {gt: 0, lt: 30} : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 1 ? 1 : 0})}
                            >
                                <div>
                                    0 - 30
                                </div>
                            </SwiperSlide>
                            <SwiperSlide
                                className={this.state.activePrice === 2 ? 'price-tile active-tile' : 'price-tile'}
                                onClick={() => this.setState({priceValue: this.state.priceValue.lt !== 60 ? {gt: 30, lt: 60} : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 2 ? 2 : 0})}
                            >
                                <div>
                                    30 - 60
                                </div>
                            </SwiperSlide>
                            <SwiperSlide
                                className={this.state.activePrice === 3 ? 'price-tile active-tile' : 'price-tile'}
                                onClick={() => this.setState({priceValue: this.state.priceValue.lt !== 100 ? {gt: 60, lt: 100} : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 3 ? 3 : 0})}
                            >
                                <div>
                                    60 - 100
                                </div>
                            </SwiperSlide>
                            <SwiperSlide
                                className={this.state.activePrice === 4 ? 'price-tile active-tile' : 'price-tile'}
                                onClick={() => this.setState({priceValue: this.state.priceValue.gt !== 100 ? {gt: 100} : {gt: 0, lt: 0}, activePrice: this.state.activePrice !== 4 ? 4 : 0})}
                            >
                                <div>
                                    100+
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {this.props.source === 'orders_history' &&
                        <div>
                            <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Ocena</div>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={18}
                                style={{marginLeft: '25px', marginTop: '20px'}}
                            >
                                <SwiperSlide
                                    className={this.state.activeRepeatability === 1 ? 'filter-tile-repeatability active-tile' : 'filter-tile-repeatability'}
                                    onClick={() => this.setState({repeatability: this.state.repeatability !== 'repeated' ? 'repeated' : '', activeRepeatability: this.state.activeRepeatability !== 1 ? 1 : 0})}
                                >
                                    <div>
                                        Powtarzalne
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide
                                    className={this.state.activeRepeatability === 2 ? 'filter-tile-repeatability active-tile' : 'filter-tile-repeatability'}
                                    onClick={() => this.setState({repeatability: this.state.repeatability !== 'not-repeated' ? 'not-repeated' : '', activeRepeatability: this.state.activeRepeatability !== 2 ? 2 : 0})}
                                >
                                    <div>
                                        Jednorazowe
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    }

                    <div>
                        <div style={{marginLeft: '5vw', marginTop: '3vh', letterSpacing: '1px'}}>Data zamówienia</div>
                        <Swiper
                            slidesPerView={2.1}
                            spaceBetween={18}
                            style={{marginLeft: '25px', marginTop: '20px'}}
                        >
                            <SwiperSlide
                                className={this.state.activeDateRange === 1 ? 'filter-tile-orders active-tile' : 'filter-tile-orders'}
                                onClick={() => this.setState({dateRangeValue: this.state.dateRangeValue.lt !== 14 ? {lt: 14} : {gt: 0, lt: 0}, activeDateRange: this.state.activeDateRange !== 1 ? 1 : 0})}
                            >
                                <div>
                                    Ostatnie 14 dni
                                </div>
                            </SwiperSlide>
                            <SwiperSlide
                                className={this.state.activeDateRange === 2 ? 'filter-tile-orders active-tile' : 'filter-tile-orders'}
                                onClick={() => this.setState({dateRangeValue: this.state.dateRangeValue.lt !== 30 ? {gt: 14, lt: 30} : {gt: 0, lt: 0}, activeDateRange: this.state.activeDateRange !== 2 ? 2 : 0})}
                            >
                                <div>
                                    14 - 30 dni
                                </div>
                            </SwiperSlide>
                            <SwiperSlide
                                className={this.state.activeDateRange === 3 ? 'filter-tile-orders active-tile' : 'filter-tile-orders'}
                                onClick={() => this.setState({dateRangeValue: this.state.dateRangeValue.lt !== 60 ? {lt: 60} : {gt: 0, lt: 0}, activeDateRange: this.state.activeDateRange !== 3 ? 3 : 0})}
                            >
                                <div>
                                    Ostatnie 2 miesiące
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

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
                                    this.state.dateRangeValue,
                                    this.state.repeatability,
                                )
                            }}
                        >Filtruj</IonButton>
                    </div>
                </IonContent>
            </IonModal>
        );
    }
}

export default FilterOrders;
