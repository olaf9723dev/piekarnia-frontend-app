import React from 'react';
import {IonButton, IonContent, IonIcon, IonInput, IonItem, IonPage} from '@ionic/react';
import {getCategories, getProductOffer, getProductOfferByCat} from '../../../services/offer.service';
import {CategoryModel} from '../../../models/category.model';
import CategorySwiper from '../CategorySwiper/CategorySwiper';
import './ProductOffer.css'
import {grid, square} from 'ionicons/icons';
import {FaFilter} from 'react-icons/fa';
import {ProductInPlaceModel} from '../../../models/product-in-place.model';
import ProductList from '../ProductsList/ProductList';
import CustomTabBar from '../../CustomTabBar/CustomTabBar';
import HeaderComponent from '../../HeaderComponent/HeaderComponent';
import FilterPlaces from '../../FilterComponents/FilterPlaces/FilterPlaces';
import {ProductsFiltersModel} from '../../../models/products-filters.model';
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';
import {productOfferUpdateDate$} from '../../../services/event-bus.service';

class ProductOffer extends React.Component<{
    cartId: any,
    cartProductsCount: number,
    tabSelected: number
}, {
    categoriesList: CategoryModel[],
    searchInput: string,
    displayType: string,
    productOffer: ProductInPlaceModel[],
    placeId: any,
    selectedCategory: number,
    filteredProductOffer: ProductInPlaceModel[],
    filterProductsModalOpen: boolean,
    selectedFilters: ProductsFiltersModel,
    currentPage: number,
    itemsPerPage: number,
    productOfferResponse: { count: 0, next: '', previous: '', results: [] }
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            categoriesList: [],
            searchInput: '',
            displayType: 'grid',
            productOffer: [],
            placeId: window.location.pathname.split('/').at(-1),
            selectedCategory: 0,
            filteredProductOffer: [],
            filterProductsModalOpen: false,
            selectedFilters: {
                sortValue: '',
                priceValue: {gt: 0, lt: 0},
                rateValue: 0,
                typeValue: 0,
                rangeValue: {lower: 0, upper: 0}
            },
            currentPage: 1,
            itemsPerPage: 16,
            productOfferResponse: {count: 0, next: '', previous: '', results: []}
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        Promise.all(
            [getCategories(), getProductOffer(`api/product-offer/${this.state.placeId}`)]
        )
            .then(res => {
                this.setState({
                    categoriesList: res[0],
                    productOffer: res[1].results,
                    placeId: window.location.pathname.split('/').at(-1),
                    filteredProductOffer: res[1].results,
                    productOfferResponse: res[1]
                })
            })
    }

    handleSelectCategory = (categoryId: number) => {
        getProductOfferByCat(`api/product-offer/${this.state.placeId}/category/${categoryId}`)
            .then(res => {
                this.setState({
                    selectedCategory: categoryId,
                    productOffer: res.results,
                    filteredProductOffer: res.results,
                    productOfferResponse: res,
                    currentPage: 1
                })
            })
    }

    handleCloseModal = (status: boolean) => {
        this.setState({filterProductsModalOpen: status})
    }

    handleSelectFilters = (res: { sortValue: string, priceValue: { gt: number, lt?: number }, rateValue: number, typeValue: number, rangeValue: { lower: number, upper: number } }) => {
        let filteredProductOffer: ProductInPlaceModel[] = this.state.productOffer;
        if (res.priceValue) {
            if (res.priceValue.lt) {
                filteredProductOffer = filteredProductOffer.filter((product) => {
                    // @ts-ignore
                    return product.price >= res.priceValue.gt && product.price <= res.priceValue.lt
                })
            } else {
                filteredProductOffer = filteredProductOffer.filter((product) => {
                    return product.price >= res.priceValue.gt
                })
            }
        }
        if (res.rateValue) {
            filteredProductOffer = filteredProductOffer.filter((product) => {
                return product.product.avgRate >= res.rateValue
            })
        }
        if (res.sortValue) {
            // @ts-ignore
            filteredProductOffer = filteredProductOffer.sort((a, b) => {
                if (res.sortValue === 'most_popular') {
                    return b.id - a.id  // todo jak z popularnością?
                } else if (res.sortValue === 'lowest_price') {
                    return a.price - b.price
                } else if (res.sortValue === 'highest_price') {
                    return b.price - a.price
                }
            })
        }
        this.setState({filteredProductOffer: filteredProductOffer})
    }

    handleClick(event: any) {
        if (event.target.id != this.state.currentPage) {
            getProductOffer(`api/product-offer/${this.state.placeId}/?page=${event.target.id}&search=${this.state.searchInput}`)
                .then(res => {
                    this.setState({
                        productOffer: res.results,
                        currentPage: Number(event.target.id),
                        filteredProductOffer: res.results
                    })
                })
        }
    }

    onClickPrev = () => {
        getProductOffer(`api/product-offer/${this.state.placeId}/?page=${this.state.currentPage - 1}&search=${this.state.searchInput}`)
            .then(res => {
                this.setState({
                    productOffer: res.results,
                    currentPage: this.state.currentPage - 1,
                    filteredProductOffer: res.results
                })
            })
    }

    onClickNext = () => {
        getProductOffer(`api/product-offer/${this.state.placeId}/?page=${this.state.currentPage + 1}&search=${this.state.searchInput}`)
            .then(res => {
                this.setState({
                    productOffer: res.results,
                    currentPage: this.state.currentPage + 1,
                    filteredProductOffer: res.results
                })
            })
    }

    searchFor(searchValue: any) {
        searchValue = searchValue.trim();
        searchValue = searchValue.toLowerCase();
        getProductOffer(`api/product-offer/${this.state.placeId}?search=${searchValue}`)
            .then(res => {
                this.setState({
                    filteredProductOffer: res.results,
                    productOfferResponse: res,
                    productOffer: res.results,
                    currentPage: 1
                })
            })
    }

    render() {
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.productOfferResponse.count / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number) => {
            if (pageNumbers.length > 7) {
                if (number === 1 || number === pageNumbers.length) {
                    return (
                        <li
                            key={number}
                            id={number.toString()}
                            onClick={this.handleClick}
                            className={this.state.currentPage === number ? 'current-page' : ''}
                        >
                            {number}
                        </li>
                    );
                }
                if (this.state.currentPage > number + 2) {
                    return ''
                } else if (this.state.currentPage === number + 2) {
                    return (<li>...</li>)
                }
                if (this.state.currentPage < number - 2) {
                    return ''
                } else if (this.state.currentPage === number - 2) {
                    return (<li>...</li>)
                }
                return (
                    <li
                        key={number}
                        id={number.toString()}
                        onClick={this.handleClick}
                        className={this.state.currentPage === number ? 'current-page' : ''}
                    >
                        {number}
                    </li>
                );
            } else {
                return (
                    <li
                        key={number}
                        id={number.toString()}
                        onClick={this.handleClick}
                        className={this.state.currentPage === number ? 'current-page' : ''}
                    >
                        {number}
                    </li>
                );
            }
        });

        return (
            <IonPage>
                <HeaderComponent headerTitle={'Oferta'} cartId={this.props.cartId}
                                 cartProductsCount={this.props.cartProductsCount}/>

                <IonContent>
                    <div className={'search-tool'}>
                        <IonItem className={'search-input'}>
                            <img src={'assets/img/search.svg'} style={{marginRight: '8px'}}/>
                            <IonInput
                                placeholder={'Nazwa produktu...'}
                                onIonChange={e => {
                                    this.setState({searchInput: e.detail.value || ''})
                                }}
                            />
                            <IonButton
                                fill={'clear'}
                                style={{color: '#f1a243', fontSize: '18px'}}
                                onClick={() => this.searchFor(this.state.searchInput)}
                            >
                                Szukaj
                            </IonButton>
                        </IonItem>
                    </div>

                    <CategorySwiper
                        data={this.state.categoriesList}
                        fromComponent="product-offer"
                        selectCategoryCallback={this.handleSelectCategory}
                    />

                    <div className={'filter-div'}>
                        <div id={'filter-start'}>
                            <IonIcon
                                icon={grid}
                                onClick={() => this.setState({displayType: 'grid'})}
                                className={this.state.displayType === 'grid' ? 'active-display' : ''}
                                style={{fontSize: '20px'}}
                            />
                            <IonIcon
                                icon={square}
                                onClick={() => this.setState({displayType: 'square'})}
                                className={this.state.displayType === 'square' ? 'active-display' : ''}
                                style={{fontSize: '20px'}}
                            />
                        </div>

                        <div id={'filter-end'}>
                            <IonButton
                                fill={'clear'}
                                style={{color: '#aaa'}}
                                onClick={() => this.setState({filterProductsModalOpen: true})}
                            >
                                Filtry
                                <FaFilter style={{marginLeft: '10px'}}/>
                            </IonButton>
                        </div>
                    </div>


                    <ProductList
                        products={this.state.filteredProductOffer || this.state.productOffer}
                        display={this.state.displayType}
                        placeId={this.state.placeId}
                        key={this.state.currentPage}
                    />

                    <ul id="page-numbers">
                        {this.state.currentPage > 1 &&
                            <li onClick={this.onClickPrev}><HiChevronLeft style={{fontSize: '20px'}}/></li>
                        }
                        {renderPageNumbers}
                        {this.state.currentPage < pageNumbers.length &&
                            <li onClick={this.onClickNext}><HiChevronRight style={{fontSize: '20px'}}/></li>
                        }

                    </ul>

                </IonContent>
                <CustomTabBar
                    cartId={this.props.cartId}
                    tabSelected={this.props.tabSelected}
                    key={this.props.cartId}
                />

                <FilterPlaces
                    filterPlacesModalOpen={this.state.filterProductsModalOpen}
                    callbackCloseModal={this.handleCloseModal}
                    cartId={this.props.cartId}
                    cartProductsCount={this.props.cartProductsCount}
                    source={'offer'}
                    callbackSelectFilters={this.handleSelectFilters}
                />

            </IonPage>
        );
    }
}

export default ProductOffer;
