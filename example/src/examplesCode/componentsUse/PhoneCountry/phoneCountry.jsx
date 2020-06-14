import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './style.css';

function PhoneCountry({storedata}) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChange = value => {
        if(value){
            // save to global form
            storedata['PhoneCountry'] = value;
            setPhoneNumber(value);
        }
    };

    return (
        <div className="phone-country-container">
            <h1 className="subtitle-2">Put your phone number</h1>
            <PhoneInput
            international
            defaultCountry="VE"
            value={phoneNumber}
            onChange={handleChange}/>
        </div>
  )
}

export default PhoneCountry;