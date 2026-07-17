import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburguer from '../HamburguerMenu/hamburguer';
import GitHubButton from 'react-github-btn';

import './menu.css';

// react-router v7 NavLink has no activeClassName prop
const navLinkClass = ({ isActive }) => `list-item${isActive ? ' is-active' : ''}`;

function Menu(){

    let [isOpen, openState] = useState(true);

    const handleOpenClose = () => openState(!isOpen);


    return(
        <div className="menu-container" style={{marginLeft: isOpen ? 0 : -250}}>
            <div className="menu-components-wrapper">

                <div className="close-icon-container">
                    <Hamburguer {...{isOpen, handleOpenClose}}/>
                </div>

                <div className="ver-en-github">
                    <GitHubButton 
                        href="https://github.com/carlosEdua/nested-selects-react" 
                        data-icon="octicon-star" 
                        data-size="large" 
                        data-show-count="true" 
                        aria-label="Star carlosEdua/nested-selects-react on GitHub">
                            Star
                    </GitHubButton>
                </div>

                <div className="list-navlinks-container">
                    <div className="list is-hoverable has-text-centered">
                        <NavLink end to="/" className={navLinkClass}>
                            Introducción - Demo
                        </NavLink>
                        <NavLink end to="/get-started" className={navLinkClass}>
                            Empieza a usarlo
                        </NavLink>
                        <NavLink to="/structure" className={navLinkClass}>
                            Creando la estructura
                        </NavLink>
                        {/* <NavLink to="/basic-example" className={navLinkClass}>
                            Ejemplo básico
                        </NavLink> */}
                        <NavLink to="/including-sub-components" className={navLinkClass}>
                            Incluyendo <br/> sub-componentes
                        </NavLink>
                        <NavLink to="/custom-onchange" className={navLinkClass}>
                            Custom onChange y código asíncrono
                        </NavLink>
                        <NavLink to="/styles" className={navLinkClass}>
                            Estilos
                        </NavLink>
                        {/* <NavLink to="/test" className={navLinkClass}>
                            test
                        </NavLink> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Menu;