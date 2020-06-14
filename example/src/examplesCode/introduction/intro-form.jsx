import React, { useState } from 'react';
import {NestedSelects} from 'nested-selects-react';
// structure ***** very important *****
import mySelectsStructure from './intro-structure'; 

// storedata for NestedSelects
// ******* very important if you want get the value of inputs inside NestedSelects *******
// const storedata = {};
// ***************************************************************************************

function IntroForm() {

    const [state, setState] = useState({
        nestedSelectsValues: {},
    });

    const handleInputChange = ({target: { value, name }}) => setState({...state, [name]: value});

    const getAllFormData = () => {
        const allData = {
            ...state
        } 
        console.clear();
        console.log('form inputs and nested-selects-react values: \n',allData);
        alert("Look the console");
    }
    
    // get the <NestedSelects/> values
    const getvalues = data => setState({
        ...state,
        nestedSelectsValues: {...data},
    });

    
    return(
        <div className="intro-form-container">
            <div className="columns is-centered">
                <form className="column card is-10" onSubmit={() => false}>
                    
                    <div className="card-header-title">
                        <h1 className="title">Form Demo:</h1>
                    </div>

                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input onChange={handleInputChange} name="username" className="input" type="text" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input onChange={handleInputChange} name="email" className="input" type="email" />
                        </div>
                    </div>
                    
                    <h2 className="subtitle-v2">nested-select-react example:</h2>
                    {/* NestedSelects use */}
                    <div className="field">
                        <NestedSelects selects={mySelectsStructure} getvalues={getvalues} />
                    </div>

                    <div className="field">
                        <label className="label">Comments</label>
                        <textarea onChange={handleInputChange} className="textarea" name="textarea" cols="20" rows="3"></textarea>
                    </div>

                    <div className="buttons is-centered">
                        <button onClick={getAllFormData} type="button" className="button btn-custom">Get Form Data</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default IntroForm;