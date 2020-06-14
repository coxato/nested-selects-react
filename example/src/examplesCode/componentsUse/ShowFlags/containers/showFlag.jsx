import React, { Component } from 'react';
import Loader from '../../../../components/commons/Loader/loader';
import SelectFlag from '../components/flag';
 

class ShowCountry extends Component{

    state = {
        country: '',
        flagURL: '',
        loading: false,
        error: ''        
    }

    // onChange handler to get the selected value
    onChangeHandler = ({target: {value} }) => value ? this.getCountryData(value) : null;


    // call API
    async getCountryData(countryName){
        this.setState({error: null, loading: true});

        try {
            const response = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`);
            const data = await response.json();

            const { name, flag } = data[0];

            // *******************************
            // very important!, if you can save the data to the principal form
            // and get it in a json, please use the store prop
            // if this component is just to render something, this is not necessary
            const myComponent = 'FlagsComponent';
            this.props.storedata[myComponent] = {
                country: name,
                flagURL: flag
            };
            // ******************************

            // then update state
            this.setState({
                loading: false,
                country: name,
                flagURL: flag
            });

        } catch ({message}) {
            this.setState({error: message})
        }
    }


    render(){
        const { country, flagURL, loading, error } = this.state;

        if(loading) return <Loader />

        if(error) return <h1>{error}</h1>

        return <SelectFlag {...{country, flagURL}} onChangeHandler={this.onChangeHandler} />
    }

}

export default ShowCountry;