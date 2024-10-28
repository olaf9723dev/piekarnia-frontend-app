import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import {ProductInPlaceModel} from '../../../models/product-in-place.model';

import './ProductList.css'

class ProductList extends React.Component<{
    products: ProductInPlaceModel[],
    display: string,
    placeId: number
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id={'products-container'}>
                {this.props.display === 'grid' ? (
                        <div className={'grid-container'}>
                            {this.props.products.map(product => (
                                <ProductCard
                                    product={product}
                                    key={product.product.id}
                                    display={this.props.display}
                                    placeId={this.props.placeId}
                                />
                            ))}
                        </div>)
                    : (
                        <div className={'square-container'}>
                            {this.props.products.map(product => (
                                <ProductCard
                                    product={product}
                                    key={product.product.id}
                                    display={this.props.display}
                                    placeId={this.props.placeId}
                                />
                            ))}
                        </div>)

                }
            </div>
        );
    }
}

export default ProductList;
