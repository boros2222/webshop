import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {CURRENT_USER, PRODUCT_DETAILS, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {Growl} from 'primereact/growl';
import {Carousel} from "primereact/carousel";
import {Dialog} from "primereact/dialog";
import ConfirmDialog from "../component/ConfirmDialog";
import {loadCart, setCart} from "../redux/functions/cart-functions";
import {deleteProduct, loadProduct} from "../redux/functions/product-functions";

function ProductDetails({id, productDetailsStore, loadProduct, setCart, userStore, deleteProduct,
                            responseStore, loadCart}) {

    const history = useHistory();
    const [growl, setGrowl] = useState(undefined);
    const [dialogPicture, setDialogPicture] = useState(undefined);

    useEffect(() => {
        loadProduct(id);
    }, [loadProduct, id]);

    if (!productDetailsStore.isReady()) {
        return productDetailsStore.getMessage();
    }

    const addToCart = () => {
        const product = productDetailsStore.data;
        if (product !== undefined) {
            loadCart().then(cartData => {
                let cart = cartData;
                if (cart === null || cart === undefined) {
                    cart = [];
                } else {
                    cart = cart.slice();
                }

                if (cart.findIndex(x => x.product.id === product.id) === -1) {
                    const cartProduct = {
                        product: {
                            id: product.id,
                            name: product.name,
                            price: product.price
                        },
                        quantity: 1
                    };
                    cart.push(cartProduct);
                    setCart(cart);
                    growl.show({severity: "success", summary: "Kosár", detail: "Termék hozzáadva a kosárhoz!"});
                } else {
                    growl.show({severity: "info", summary: "Kosár", detail: "A termék már szerepel a kosárban!"});
                }
            });
        }
    };

    const pictureTemplate = (picture) => {
        return (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <img className="mw-100 mh-100" src={picture.path} onClick={() => setDialogPicture(picture.path)} alt=""/>
            </div>
        )
    };

    const editProduct = (productId) => {
        history.push(`/edit-product/${productId}`);
    };

    let responseMessage = responseStore.getMessage();
    const product = productDetailsStore.data;
    return (
        <>
            <Growl ref={(el) => setGrowl(el)} />
            <Dialog header={<>{product.name}</>} footer={<></>} visible={dialogPicture !== undefined}
                    className="overflow-auto"
                    style={{maxWidth: "95%", maxHeight: "95%"}} contentStyle={{maxWidth: "100%", maxHeight: "100%", padding: "0"}}
                    dismissableMask={true} modal={true} onHide={() => setDialogPicture(undefined)}>
                <div className="d-flex justify-content-center align-items-center">
                    <img className="mw-100 mh-100" src={dialogPicture} alt=""/>
                </div>
            </Dialog>
            {userStore.isAdmin() &&
                <div className="d-flex justify-content-end flex-column flex-lg-row align-items-end">
                    {!product.deleted &&
                        <>
                            <button onClick={() => editProduct(product.id)} className="custom-button mr-lg-3 mb-3 mb-lg-0">Termék szerkesztése</button>
                            <ConfirmDialog headerText="Termék törlése" text="Biztosan törölni kívánja a terméket?" onConfirm={() => deleteProduct(product.id).then(() => loadProduct(product.id))}>
                                <button className="custom-button red-button">Termék törlése</button>
                            </ConfirmDialog>
                        </>
                    }
                    {responseMessage}
                </div>
            }
            <div className="row">
                <p className="col-12 font-size-medium">{product.name}</p>
                <div className="col-12 col-lg-7 my-3">
                    <Carousel value={product.pictures} itemTemplate={pictureTemplate} orientation="horizontal" style={{width: "100%"}}
                              numVisible={1} numScroll={1} responsive={[{numVisible: 1, numScroll: 1}]}/>
                </div>
                <div className="col-12 col-lg-5 my-3">
                    <p className="font-weight-bold font-size-normal">Rövid leírás</p>
                    {product.shortDescription.split(/\r?\n/g).map((line, index) => <p key={index}>{line}</p>)}
                    <div className="d-flex justify-content-center align-items-center flex-column mt-3">
                        {product.deleted &&
                            <p style={{color: "#df0000"}}>A termék már nem elérhető!</p>
                        }
                        <p className="font-size-medium font-weight-bold">{product.price.toLocaleString()} Ft</p>
                        {!product.deleted && !userStore.isAdmin() &&
                            <button onClick={addToCart} className="custom-button mt-1">Hozzáadás a kosárhoz</button>
                        }
                    </div>
                </div>
                <p className="col-12 font-weight-bold font-size-normal mt-3">Részletes leírás</p>
                <div className="col-12">
                    {product.description.split(/\r?\n/g).map((line, index) => <p key={index}>{line}</p>)}
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        loadProduct: loadProduct(dispatch),
        loadCart: loadCart(dispatch),
        setCart: setCart(dispatch),
        deleteProduct: deleteProduct(dispatch)
    };
};
const mapStateToProps = state => {
    return {
        productDetailsStore: state[PRODUCT_DETAILS],
        userStore: state[CURRENT_USER],
        responseStore: state[RESPONSE_MESSAGE]
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);