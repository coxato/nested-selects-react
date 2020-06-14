import React from 'react';
import { Link } from 'react-router-dom';
import IntroForm from './intro-form';
import ExampleCode from '../../components/commons/ExampleCode/exampleCode';


function Introduction(){

    return(
        <div className="columns direction-column">
            <div className="has-text-centered column">
                <h1 className="title">nested-select-react</h1>
                <h2 className="subtitle">Un componente react que te ayuda a manejar multiples {'<select>'} anidados</h2>
            </div>

            <div className="column">
                <IntroForm />
            </div>

            <div className="card column ">
                <h2 className="subtitle">Instalación:</h2>
                <div className="npm-and-yarn">
                    <p>npm</p>
                    <ExampleCode codeText={'npm i nested-selects-react'}/>
                    <p>yarn</p>
                    <ExampleCode codeText={'yarn add nested-selects-react'}/>
                </div>
            </div>

            <div className="card column">
                <div className="card-content">
                    <div className="title has-text-centered">Empieza a usarlo!</div>
                    <div className="buttons is-centered">
                        <Link to="/get-started" className="button btn-custom">get started</Link>
                    </div>

                </div>
            </div>
            
        </div>
    )
} 

export default Introduction;