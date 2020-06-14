import React from 'react';
import './hamburguer.css';

function Hamburger({handleOpenClose, isOpen}){
    return(
        <div id="hamburger" onClick={handleOpenClose} className={ isOpen ? 'active' : ''}>
            <span></span>
        </div>
    )
}

export default Hamburger;