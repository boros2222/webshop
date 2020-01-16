import React, {Component, Fragment} from 'react';

class Address extends Component {

    render() {
        return (
            <Fragment>
                <p>Irányítószám:</p>
                <input type="text" name="postalCode"
                       value={this.props.address.postalCode}
                       onChange={this.props.handleInputChange}/>

                <p>Város:</p>
                <input type="text" name="city"
                       value={this.props.address.city}
                       onChange={this.props.handleInputChange}/>

                <p>Utca:</p>
                <input type="text" name="street"
                       value={this.props.address.street}
                       onChange={this.props.handleInputChange}/>

                <p>Házszám:</p>
                <input type="text" name="houseNumber"
                       value={this.props.address.houseNumber}
                       onChange={this.props.handleInputChange}/>
            </Fragment>
        )
    }
}

export default Address;