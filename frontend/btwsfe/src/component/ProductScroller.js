import React, {useEffect, useState} from 'react';
import Product from "../component/Product";
import {Dropdown} from "primereact/dropdown";

function ProductScroller({productsStore, loadProduct, headerText}) {

    const [rows] = useState(10);
    const [first, setFirst] = useState(0);
    const [sortOption, setSortOption] = useState(undefined);
    const [products, setProducts] = useState([]);
    const [needLoading, setNeedLoading] = useState(true);

    useEffect(() => {
        if (needLoading) {
            loadProduct(first, rows, sortOption)
                .then(products => setProducts(prevProducts => [...prevProducts, ...products]));
            setNeedLoading(false);
        }
    }, [loadProduct, first, rows, sortOption, needLoading]);

    const sortOptions = [
        {label: '-', value: undefined},
        {label: 'Ár szerint növekvő', value: 'PRICE_ASC'},
        {label: 'Ár szerint csökkenő', value: 'PRICE_DESC'},
    ];

    const onSort = (event) => {
        setSortOption(event.value);
        setProducts([]);
        setFirst(0);
        setNeedLoading(true);
    };

    const onLoadMore = () => {
        setFirst(first + rows);
        setNeedLoading(true);
    };

    let footer = undefined;
    if (!productsStore.isReady()) {
        footer = productsStore.getMessage()
    } else if (productsStore.data.length === rows) {
        footer = (
            <button className="custom-button-inverse font-size-normal font-weight-bold mt-5"
                    onClick={onLoadMore}>
                Több
            </button>
        );
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <p className="font-weight-bold font-size-medium">{headerText}</p>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="col-12 col-lg-auto float-right p-0">
                        <p>Rendezés</p>
                        <Dropdown value={sortOption} options={sortOptions} onChange={onSort} />
                    </div>
                </div>
            </div>

            {products.map(product => (
                <div key={product.id} className="primary-color">
                    <Product product={product} />
                </div>
            ))}

            <div className="flex-center mt-3">
                {footer}
            </div>
        </>
    );
}

export default ProductScroller;