import React, {useEffect, useState} from 'react';
import Product from "../component/Product";
import {DataScroller} from 'primereact/datascroller';
import {Dropdown} from "primereact/dropdown";

function ProductScroller(props) {

    const [rows] = useState(10);
    const [sortOption, setSortOption] = useState(undefined);
    const [products, setProducts] = useState([]);

    const sortOptions = [
        {label: 'Ár szerint csökkenő', value: 'PRICE_DESC'},
        {label: 'Ár szerint növekvő', value: 'PRICE_ASC'},
    ];

    useEffect(() => {
        if (props.products.error === undefined && props.products.data !== undefined) {
            setProducts(prevProduct => ([...prevProduct, ...props.products.data]));
        }
    }, [props.products]);

    useEffect(() => {
        const doSort = () => {
            if (sortOption === undefined) {
                return;
            }

            if (sortOption === 'PRICE_ASC') {
                setProducts(prevProducts => (prevProducts.slice().sort((a, b) => a.price - b.price)));
            } else if (sortOption === 'PRICE_DESC') {
                setProducts(prevProducts => (prevProducts.slice().sort((a, b) => b.price - a.price)));
            }
        };
        doSort()
    }, [sortOption, props.products]);

    const onLazyLoad = (event) => {
        loadProductsLazily(event.first, event.rows);
    };

    const loadProductsLazily = (offset, limit) => {
        props.loadProduct(offset, limit)
    };

    const productTemplate = (product) => {
        if (!product) {
            return null;
        }
        return (
            <div className="primary-color">
                <Product key={product.id} product={product} />
            </div>
        )
    };

    const onSort = (event) => {
        setSortOption(event.value);
    };

    return (
        <>
            <div className="max-width elements-apart">
                <p style={{fontSize: "1.5em"}}>{props.headerText}</p>
                <Dropdown value={sortOption} options={sortOptions} onChange={onSort} placeholder="Rendezés"/>
            </div>
            <DataScroller value={products} itemTemplate={productTemplate}
                          rows={rows} lazy={true} onLazyLoad={onLazyLoad} />
        </>
    );
}

export default ProductScroller;