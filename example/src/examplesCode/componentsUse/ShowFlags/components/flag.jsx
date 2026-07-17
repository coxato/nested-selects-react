import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { COUNTRIES } from '../countries';
import './style.css';

const SelectFlag = ({country, onChangeHandler}) => (

    <div className="SelectFlag-container">

        <select onChange={onChangeHandler}>
            <option value="">Select a country</option>
            {COUNTRIES.map(({code, name}) => (
                <option key={code} value={code}>{name}</option>
            ))}
        </select>

        {
            country
            ?
            <div className="flag_and_name-container">
                <ReactCountryFlag countryCode={country.code} svg style={{width: '100px', height: '100px'}} aria-label={`${country.name} flag`}/>
                <p>{country.name}</p>
            </div>
            :
            <h2>Please select a country first</h2>
        }
    </div>

);

export default SelectFlag;