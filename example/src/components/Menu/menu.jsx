import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburguer from '../HamburguerMenu/hamburguer';
import GitHubButton from 'react-github-btn';

import './menu.css';


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
                        href="https://github.com/carlosedua/nestedSelectsReact" 
                        data-icon="octicon-star" 
                        data-size="large" 
                        data-show-count="true" 
                        aria-label="Star carlosedua/nestedSelectsReact on GitHub">
                            Star
                    </GitHubButton>
                </div>

                <div className="list-navlinks-container">
                    <div className="list is-hoverable has-text-centered">
                        <NavLink exact to="/" className="list-item" activeClassName="is-active">
                            Introducción - Demo
                        </NavLink>
                        <NavLink exact to="/get-started" className="list-item" activeClassName="is-active">
                            Empieza a usarlo
                        </NavLink>
                        <NavLink to="/structure" className="list-item" activeClassName="is-active">
                            Creando la estructura
                        </NavLink>
                        {/* <NavLink to="/basic-example" className="list-item" activeClassName="is-active">
                            Ejemplo básico
                        </NavLink> */}
                        <NavLink to="/including-sub-components" className="list-item" activeClassName="is-active">
                            Incluyendo <br/> sub-componentes
                        </NavLink>
                        <NavLink to="/custom-onchange" className="list-item" activeClassName="is-active">
                            Custom onChange y código asíncrono
                        </NavLink>
                        <NavLink to="/styles" className="list-item" activeClassName="is-active">
                            Estilos
                        </NavLink>
                        <NavLink to="/test" className="list-item" activeClassName="is-active">
                            test
                        </NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Menu;