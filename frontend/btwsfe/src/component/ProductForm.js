import React, {useEffect, useState} from 'react';
import {CATEGORY, RESPONSE_MESSAGE} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import ImageInput from "../component/ImageInput";
import {loadCategories} from "../redux/functions/product-functions";

function ProductForm({product, responseStore, categoriesStore, loadCategories, buttonLabel, onSubmit}) {

    const defaultValues = {
        name: "",
        shortDescription: "",
        description: "",
        price: "",
        category: undefined,
        files: []
    };

    const {register, setValue, handleSubmit, watch, errors, reset} = useForm({defaultValues});
    const [triedSubmit, setTriedSubmit] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([{label: "-", value: undefined}]);

    useEffect(() => {
        register({name: "price", type: "custom"}, {validate: price => price !== "" && price !== 0});
        register({name: "category", type: "custom"}, {validate: category => category !== undefined});
        register({name: "files", type: "custom"}, {validate: files => files.length !== 0});
    }, [register]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        if (categoriesStore.isReady()) {
            categoriesStore.data.forEach(category => {
                setCategoryOptions(prevCategoryOptions => [...prevCategoryOptions, {label: category.name, value: category.id}]);
            });
        }
    }, [categoriesStore]);

    useEffect(() => {
        if (product != null) {
            setValue("name", product.name);
            setValue("shortDescription", product.shortDescription);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("category", product.category.id);
            setValue("files", product.pictures);
        }
    }, [product, setValue]);

    const convertString = (string) => {
        const number = parseInt(string);
        if (isNaN(number)) {
            return "";
        } else {
            return number;
        }
    };

    const performSubmit = (product) => {
        onSubmit(product, () => reset(defaultValues));
    };

    return (
        <form className="product-form" onSubmit={handleSubmit(performSubmit)}>
            <div className="row">

                <div className="col-12 mt-3 primary-color">
                    <p className="col-12 d-inline-block pl-0 required">Termék neve:</p>
                    <input className="col-12" type="text" name="name"
                           disabled={responseStore.isLoading()} ref={register({required: true})}/>
                    {errors.name && errors.name.type === 'required' && <p className="col-12 error-message">Termék nevének megadása kötelező</p>}
                </div>

                <div className="col-12 mt-3 primary-color">
                    <p className="col-12 d-inline-block pl-0 required">Rövid leírás:</p>
                    <textarea className="col-12" name="shortDescription" rows="5"
                              disabled={responseStore.isLoading()} ref={register({required: true})}/>
                    {errors.shortDescription && errors.shortDescription.type === 'required' && <p className="col-12 error-message">Rövid leírás megadása kötelező</p>}
                </div>

                <div className="col-12 mt-3 primary-color">
                    <p className="col-12 d-inline-block required pl-0">Teljes leírás:</p>
                    <textarea className="col-12" name="description" rows="15"
                              disabled={responseStore.isLoading()} ref={register({required: true})}/>
                    {errors.description && errors.description.type === 'required' && <p className="col-12 error-message">Teljes leírás megadása kötelező</p>}
                </div>

                <div className="col-12 mt-3 primary-color">
                    <p className="col-12 d-inline-block required pl-0">Ár:</p>
                    <InputText type="text" keyfilter="pint" value={watch("price")} disabled={responseStore.isLoading()}
                               onChange={(event) => setValue("price", convertString(event.target.value), triedSubmit)}/>
                    {errors.price && <p className="col-12 error-message">Kötelező az árat megadni</p>}
                </div>

                <div className="col-12 mt-4 primary-color">
                    <p className="col-12 d-inline-block pl-0 required">Kategória:</p>
                    <Dropdown options={categoryOptions} value={watch("category")} disabled={responseStore.isLoading()}
                              onChange={(event) => setValue("category", event.value, triedSubmit)}/>
                    {errors.category && <p className="col-12 error-message">Kötelező a kategóriát kiválasztani</p>}
                </div>

                <div className="col-12 mt-4 primary-color">
                    <p className="col-12 d-inline-block pl-0 required">Képek feltöltése:</p>
                    <ImageInput files={watch("files")} setFiles={(files) => setValue("files", files, triedSubmit)}
                                maxFileNumber={3} maxFileSize={2000000} disabled={responseStore.isLoading()}/>
                    {errors.files && <p className="col-12 error-message">Legalább egy fájl feltöltése kötelező</p>}
                </div>

                <div className="col-12 mt-4">
                    <button onClick={(() => setTriedSubmit(true))} disabled={responseStore.isLoading()}
                            className="custom-button-inverse flex-center font-weight-bold float-right">
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    loadCategories: loadCategories(dispatch)
});
const mapStateToProps = state => ({
    categoriesStore: state[CATEGORY],
    responseStore: state[RESPONSE_MESSAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);