import React, {useEffect, useRef, useState} from 'react';
import {CATEGORY, CURRENT_USER, RESPONSE_MESSAGE, UPLOAD_RESPONSE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {RESET} from "../redux/constants/action-types";
import {fetchToStore, uploadToBackend} from "../redux/actions/request";
import {FileUpload} from "primereact/fileupload";
import {useForm} from "react-hook-form";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";

function NewProduct({reset, userStore, responseStore, uploadResponseStore, categoriesStore, uploadFile, loadCategories}) {

    const {register, handleSubmit, errors} = useForm();
    const fileRef = useRef(undefined);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        reset();
        loadCategories();
    }, [loadCategories, reset]);

    useEffect(() => {
        if (categoriesStore.isReady()) {
            categoriesStore.data.forEach(category => {
                setCategoryOptions(prevCategoryOptions => [...prevCategoryOptions, {label: category.name, value: category.id}]);
            });
        }
    }, [categoriesStore]);

    if (!userStore.isAdmin()) {
        return <p>Csak admin jogosultsággal adható hozzá új termék!</p>
    }

    let message = responseStore.getMessage();
    if (message === undefined && uploadResponseStore.isFetching === true) {
        message = <i className="pi pi-spin pi-spinner font-size-large"/>;
    }

    const onSubmit = (product) => {
        console.log(product);
        console.log(fileRef.current.files);
        //uploadFile(event.files[0]);
    };

    return (
        <div className="w-100">
            <p>Új termék hozzáadása</p>
            <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">

                    <div className="col-12 primary-color">
                        <p className="col-12 d-inline-block pl-0 required">Termék neve:</p>
                        <input className="col-12" type="text" name="name"
                               ref={register({required: true})}/>
                        {errors.name && errors.name.type === 'required' && <p className="col-12 error-message">Termék nevének megadása kötelező</p>}
                    </div>

                    <div className="col-12 primary-color">
                        <p className="col-12 d-inline-block pl-0 required">Rövid leírás:</p>
                        <textarea className="col-12" name="shortDescription" rows="5"
                               ref={register({required: true})}/>
                        {errors.shortDescription && errors.shortDescription.type === 'required' && <p className="col-12 error-message">Rövid leírás megadása kötelező</p>}
                    </div>

                    <div className="col-12 primary-color">
                        <p className="col-12 d-inline-block required pl-0">Teljes leírás:</p>
                        <textarea className="col-12" name="description" rows="15"
                               ref={register({required: true})}/>
                        {errors.description && errors.description.type === 'required' && <p className="col-12 error-message">Teljes leírás megadása kötelező</p>}
                    </div>

                    <div className="col-12 primary-color">
                        <p className="col-12 d-inline-block required pl-0">Ár:</p>
                        <InputText type="text" keyfilter="pint" />
                        {/*<input className="col-12" type="number" min="0" name="price"
                               ref={register({required: true})}/>
                        {errors.price && errors.price.type === 'required' && <p className="col-12 error-message">Ár megadása kötelező</p>}*/}
                    </div>

                    <div className="col-12 primary-color">
                        <p className="col-12 d-inline-block pl-0 required">Kategória:</p>
                        <Dropdown options={categoryOptions} name="category" ref={register({required: true})}/>
                        {/*<input className="col-12" type="text" name="category"
                               ref={register({required: true})}/>
                        {errors.category && errors.category.type === 'required' && <p className="col-12 error-message">Kategória megadása kötelező</p>}*/}
                    </div>

                    <FileUpload className="col-12" name="pictureUpload" auto={true} customUpload={true} uploadHandler={undefined} ref={fileRef}/>

                    <div className="col-12 mt-4">
                        <button className="custom-button-inverse flex-center font-weight-bold float-right">
                            Hozzáadás
                        </button>
                    </div>
                </div>
            </form>
            {message}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loadCategories: () => {
        dispatch(fetchToStore(CATEGORY, "/category/list", true))
    },
    uploadFile: (fileData) => dispatch(uploadToBackend(fileData)),
    reset: () => dispatch({
        type: `${RESPONSE_MESSAGE}/${RESET}`
    })
});
const mapStateToProps = state => ({
    categoriesStore: state[CATEGORY],
    userStore: state[CURRENT_USER],
    responseStore: state[RESPONSE_MESSAGE],
    uploadResponseStore: state[UPLOAD_RESPONSE]
});
export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);