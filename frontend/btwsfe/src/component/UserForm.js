import React, {useState, useEffect} from "react";
import "./UserForm.css";
import {useForm} from "react-hook-form";
import Address from "./Address";
import {Checkbox} from "primereact/checkbox";

function UserForm({user, onSubmit, buttonLabel, edit = false}) {

    const [shippingSame, setShippingSame] = useState(false);
    const {register, handleSubmit, errors, watch} = useForm();

    useEffect(() => {
        if (edit && user && addressEquals(user.invoiceAddress, user.shippingAddress)) {
            setShippingSame(true);
        }
    }, [edit, user]);

    const beforeSubmit = (user) => {
        if (shippingSame) {
            user.shippingAddress = user.invoiceAddress;
        }
        if (addressIsEmpty(user.shippingAddress)) {
            user.shippingAddress = null;
        }
        if (addressIsEmpty(user.invoiceAddress)) {
            user.invoiceAddress = null;
        }
        user.passwordAgain = undefined;
        onSubmit(user);
    };

    const addressIsEmpty = (address) => {
        return address.postalCode === "" && address.city === "" && address.street === "" && address.houseNumber === "";
    };

    const addressEquals = (address1, address2) => {
        if (!address1 || !address2) {
            return false;
        }
        return address1.postalCode === address2.postalCode && address1.city === address2.city &&
            address1.street === address2.street && address1.houseNumber === address2.houseNumber;
    };

    return (
        <form className="user-form" onSubmit={handleSubmit(beforeSubmit)}>
            <div className="row">
                <div className="col-12 col-lg-6 primary-color">
                    <p className="col-12 col-lg-6 d-inline-block required" style={{paddingLeft: "0"}}>Teljes név:</p>
                    <input className="col-12 col-lg-6" type="text" name="name"
                           defaultValue={user && user.name ? user.name : ""}
                           ref={register({required: true})}/>
                    {errors.name && errors.name.type === 'required' && <p className="col-12 error-message">Teljes név megadása kötelező</p>}
                </div>

                <div className="col-12 col-lg-6 primary-color">
                    <p className={"col-12 col-lg-6 d-inline-block" + (!edit ? " required" : "")} style={{paddingLeft: "0"}}>Email cím:</p>
                    <input className="col-12 col-lg-6" type="text" name="email"
                           defaultValue={user && user.email ? user.email : ""} disabled={edit}
                           ref={register({required: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/})}/>
                    {errors.email && errors.email.type === 'required' && <p className="col-12 error-message">Email cím megadása kötelező</p>}
                    {errors.email && errors.email.type === 'pattern' && <p className="col-12 error-message">Email cím formátuma nem megfelelő</p>}
                </div>

                <div className="col-12 col-lg-6 primary-color">
                    <p className={"col-12 col-lg-6 d-inline-block" + (!edit ? " required" : "")} style={{paddingLeft: "0"}}>Jelszó{edit ? " módosítása" : ""}:</p>
                    <input className="col-12 col-lg-6" type="password" name="password"
                           ref={register({required: !edit, minLength: 8})}/>
                    {!edit && errors.password && errors.password.type === 'required' && <p className="col-12 error-message">Jelszó megadása kötelező</p>}
                    {errors.password && errors.password.type === 'minLength' && <p className="col-12 error-message">A jelszónak legalább 8 karakternek kell lenni</p> }
                </div>

                <div className="col-12 col-lg-6 primary-color">
                    <p className={"col-12 col-lg-6 d-inline-block" + (!edit ? " required" : "")} style={{paddingLeft: "0"}}>Jelszó újra:</p>
                    <input className="col-12 col-lg-6" type="password" name="passwordAgain"
                           ref={register({required: !edit, minLength: 8, validate: (value) => value === watch("password")})}/>
                    {!edit && errors.passwordAgain && errors.passwordAgain.type === 'required' && <p className="col-12 error-message">Jelszó megadása újra kötelező</p>}
                    {errors.passwordAgain && errors.passwordAgain.type === 'minLength' && <p className="col-12 error-message">A jelszónak legalább 8 karakternek kell lenni</p> }
                    {errors.passwordAgain && errors.passwordAgain.type === 'validate' && <p className="col-12 error-message">A két jelszónak meg kell egyeznie</p> }
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-6 primary-color">
                    <p className="bold space-top" style={{fontSize: "1.1em"}}>Számlázási cím:</p>
                    <Address addressName="invoiceAddress" register={register}
                             address={user && user.invoiceAddress ? user.invoiceAddress : ""}/>
                    <div style={{marginTop: "1em", fontWeight: "bold"}}>
                        Szállítási cím megegyezik a számlázási címmel:
                        <Checkbox onChange={event => setShippingSame(event.checked)} checked={shippingSame} style={{marginLeft: "1em"}}/>
                    </div>
                </div>

                {!shippingSame &&
                <div className="col-12 col-lg-6 primary-color">
                    <p className="bold space-top" style={{fontSize: "1.1em"}}>Szállítási cím:</p>
                    <Address addressName="shippingAddress" register={register}
                             address={user && user.shippingAddress ? user.shippingAddress : ""}/>
                </div>
                }
            </div>

            <button className="custom-button-inverse flex-center bold pull-right">
                {buttonLabel}
            </button>
        </form>
    )
}

export default UserForm;