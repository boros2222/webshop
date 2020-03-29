import React from 'react';

function Address({address, addressName, register, errors, disabled = false, required = false}) {
    return (
        <div className="row primary-color">
            <p className={"col-12 col-lg-6" + (required ? " required" : "")}>Irányítószám:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.postalCode`} disabled={disabled}
                   defaultValue={address && address.postalCode ? address.postalCode : ""}
                   ref={register ? register({required: required}) : null}/>
            {errors && errors[addressName] && errors[addressName].postalCode && errors[addressName].postalCode.type === 'required' &&
                <p className="col-12 error-message">Irányítószám megadása kötelező</p>}

            <p className={"col-12 col-lg-6" + (required ? " required" : "")}>Város:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.city`} disabled={disabled}
                   defaultValue={address && address.city ? address.city : ""}
                   ref={register ? register({required: required}) : null}/>
            {errors && errors[addressName] && errors[addressName].city && errors[addressName].city.type === 'required' &&
                <p className="col-12 error-message">Város megadása kötelező</p>}

            <p className={"col-12 col-lg-6" + (required ? " required" : "")}>Utca:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.street`} disabled={disabled}
                   defaultValue={address && address.street ? address.street : ""}
                   ref={register ? register({required: required}) : null}/>
            {errors && errors[addressName] && errors[addressName].street && errors[addressName].street.type === 'required' &&
                <p className="col-12 error-message">Utca megadása kötelező</p>}

            <p className={"col-12 col-lg-6" + (required ? " required" : "")}>Házszám:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.houseNumber`} disabled={disabled}
                   defaultValue={address && address.houseNumber ? address.houseNumber : ""}
                   ref={register ? register({required: required}) : null}/>
            {errors && errors[addressName] && errors[addressName].houseNumber && errors[addressName].houseNumber.type === 'required' &&
                <p className="col-12 error-message">Házszám megadása kötelező</p>}
        </div>
    )
}

export default Address;