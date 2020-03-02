import React from 'react';

function Address({ address, addressName, register }) {
    return (
        <div className="row primary-color">
            <p className="col-12 col-lg-6">Irányítószám:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.postalCode`}
                   defaultValue={address && address.postalCode ? address.postalCode : ""}
                   ref={register}/>

            <p className="col-12 col-lg-6">Város:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.city`}
                   defaultValue={address && address.city ? address.city : ""}
                   ref={register}/>

            <p className="col-12 col-lg-6">Utca:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.street`}
                   defaultValue={address && address.street ? address.street : ""}
                   ref={register}/>

            <p className="col-12 col-lg-6">Házszám:</p>
            <input className="col-12 col-lg-6" type="text" name={`${addressName}.houseNumber`}
                   defaultValue={address && address.houseNumber ? address.houseNumber : ""}
                   ref={register}/>
        </div>
    )
}

export default Address;