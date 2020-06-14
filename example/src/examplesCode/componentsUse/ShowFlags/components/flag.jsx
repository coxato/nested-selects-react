import React from 'react';
import './style.css';

const SelectFlag = ({country, flagURL, onChangeHandler}) => (

    <div className="SelectFlag-container">

        <select onChange={onChangeHandler}>
            <option value="">Select a country</option>
            <option value="argentina">Argentina</option>
            <option value="brazil">Brazil</option>
            <option value="colombia">Colombia</option>
            <option value="chile">Chile</option>
            <option value="mexico">México</option>
            <option value="usa">United States</option>
            <option value="venezuela">Venezuela</option>
        </select>

        {
            flagURL
            ?
            <div className="flag_and_name-container">
                <img src={flagURL} alt={`${country} flag`} width="300"/>
                <p>{country}</p>
            </div>
            :
            <h2>Please select a country first</h2>
        }
    </div>

);

export default SelectFlag;