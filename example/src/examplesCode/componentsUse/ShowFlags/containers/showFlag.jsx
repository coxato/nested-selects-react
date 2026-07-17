import React, { Component } from 'react';
import SelectFlag from '../components/flag';
import { COUNTRIES } from '../countries';

const COUNTRY_NAMES = Object.fromEntries(COUNTRIES.map(({code, name}) => [code, name]));

class ShowCountry extends Component{

    state = {
        country: null
    }

    // onChange handler to get the selected value
    onChangeHandler = ({target: {value} }) => value ? this.selectCountry(value) : this.setState({country: null});

    selectCountry(code){
        const country = { code, name: COUNTRY_NAMES[code] };

        // *******************************
        // very important!, if you can save the data to the principal form
        // and get it in a json, please use the store prop
        // if this component is just to render something, this is not necessary
        const myComponent = 'FlagsComponent';
        this.props.storedata[myComponent] = country;
        // ******************************

        this.setState({country});
    }


    render(){
        const { country } = this.state;

        return <SelectFlag {...{country}} onChangeHandler={this.onChangeHandler} />
    }

}

export default ShowCountry;