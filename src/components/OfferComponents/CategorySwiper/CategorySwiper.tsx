import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import {CategoryModel} from '../../../models/category.model';

class CategorySwiper extends React.Component<{
    data: CategoryModel[],
    fromComponent: string,
    selectCategoryCallback?: any
}, {
    categoryValue: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            categoryValue: 0
        }
    }

    onSelectCategory(categoryId: number) {
        this.props.selectCategoryCallback(categoryId)
    }

    render() {
        return (
            <div id={'category-swiper'}>
                <Swiper
                    slidesPerView={2.5}
                    spaceBetween={10}
                    style={{marginTop: '1vh'}}
                >
                    {this.props.data.map(category => (
                            <SwiperSlide
                                className={
                                    this.state.categoryValue === category.id && this.props.fromComponent === 'product-offer' ? 'category-tile-offer active-category-offer' :
                                    this.props.fromComponent === 'product-offer' ? 'category-tile-offer' :
                                    this.state.categoryValue === category.id && this.props.fromComponent === 'custom-popup' ? 'category-tile-popup active-category-popup' :
                                    this.props.fromComponent === 'custom-popup' ? 'category-tile-popup' :
                                    ''
                            }
                                onClick={() => {
                                    this.setState({categoryValue: category.id})
                                    this.onSelectCategory(category.id)
                                }}
                            >
                                <div>
                                    {category.name}
                                </div>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>

        );
    }
}

export default CategorySwiper;
