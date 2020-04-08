import React, {useEffect, useState} from 'react';
import Product from "../component/Product";
import {DataScroller} from 'primereact/datascroller';
import {Dropdown} from "primereact/dropdown";

function ProductScroller({productsStore, loadProduct, headerText}) {

    const [rows] = useState(10);
    const [sortOption, setSortOption] = useState(undefined);
    const [products, setProducts] = useState([]);

    const sortOptions = [
        {label: '-', value: undefined},
        {label: 'Ár szerint növekvő', value: 'PRICE_ASC'},
        {label: 'Ár szerint csökkenő', value: 'PRICE_DESC'},
    ];

    useEffect(() => {
        if (productsStore.isReady()) {
            setProducts(prevProduct => ([...prevProduct, ...productsStore.data]));
        }
    }, [productsStore]);

    useEffect(() => {
        setProducts([]);
    }, [sortOption]);

    const onLazyLoad = async (event) => {
        await loadProductsLazily(event.first, event.rows);
    };

    const loadProductsLazily = (offset, limit) => {
        loadProduct(offset, limit, sortOption)
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
            <div className="row">
                <div className="col-12 col-lg-8">
                    <p className="font-size-medium">{headerText}</p>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="col-12 col-lg-auto float-right p-0">
                        <p>Rendezés</p>
                        <Dropdown value={sortOption} options={sortOptions} onChange={onSort} />
                    </div>
                </div>
            </div>
            <DataScroller key={sortOption} value={products} itemTemplate={productTemplate}
                          rows={rows} lazy={true} onLazyLoad={onLazyLoad} />
        </>
    );
}

export default ProductScroller;