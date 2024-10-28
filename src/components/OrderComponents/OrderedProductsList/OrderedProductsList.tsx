import './OrderedProductsList.css'
import React from 'react';
import {CartProductModel} from '../../../models/cart-product.model';
import OrderedProduct from '../OrderedProduct/OrderedProduct';

class OrderedProductsList extends React.Component<{
    orderedProducts: CartProductModel[]
}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={{width: '100vw'}}>
                {this.props.orderedProducts.map((product) => (
                    <OrderedProduct
                        product={product}
                        key={product.cartProduct.id}
                    />
                ))}
            </div>
        );
    }
}

export default OrderedProductsList;
