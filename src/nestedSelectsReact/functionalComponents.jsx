import React from 'react';


// make a <select>
// to can save the childs component data, makeVisible atrtibute is used with JSON.stringify 
const MakeSelect = ({select, isSubSelect, onChange}) => {
    const { name, placeholder, options, label, id } = select;
    
    return(
        <div key={name} className="nsr-select-container">
            {/* if label exist */}
            { 
                label 
                && 
                <label className="nsr-label" style={{display: 'block'}}>{label}</label>    
            }

            <select name={name} onChange={onChange} {...{id}} className={ isSubSelect ? 'nsr-sub-select': ''}>
                {/* default option */}
                <option value="">{placeholder || 'please select an option'}</option>
                {/* <select/> options */}
                {
                    options.map( (option, index) => {
                        let { value, text, makeVisible } = option;
                        
                        return <option value={value} key={index} makevisible={JSON.stringify(makeVisible)}>{text}</option>
                    })
                }
            </select>
        </div> 
    )
}


export {
    MakeSelect
}

