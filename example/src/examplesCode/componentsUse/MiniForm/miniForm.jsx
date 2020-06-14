import React, { useState }  from 'react';

const MiniForm = ({ storeData }) => {

    const [state, setState] = useState({});

    const handleChange = (event) => {
        let [name, value] = event.target;
        // *******************************
        // very important!, if you can save the data to the principal form (NestedSelect form container)
        // and get it in a json, please use the storeData prop
        // if this component is just to render something, this is not necessary
        storeData['MiniForm'] = {
            ...storeData['MiniForm'],
            [name]: value
        };
        // ******************************
        setState({
            ...state,
            [name]: value
        })
    }

    return(
        <form className="form" onSubmit={() => false}>
            <p className="subtitle has-text-centered">Mini Form</p>
            <div className="field">
                <label className="label">username</label>
                <input onChange={handleChange} type="text" name="username"/>
            </div>
            <div className="field">
                <label className="label">password</label>
                <input onChange={handleChange} type="password" name="password"/>
            </div>
        </form>
    )
}

export default MiniForm;