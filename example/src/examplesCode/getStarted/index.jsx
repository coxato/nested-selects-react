import React from 'react';
import { Link } from 'react-router-dom';
import MyForm from './example';
import ExampleCode from '../../components/commons/ExampleCode/exampleCode';
// text string code examples
import { npmInstall, yarnInstall, getStartedExampleCode } from '../exampleInText/allExamplesInText';


function GetStarted(){

    return(
        <div className="columns is-centered is-multiline">
            
            <div className="column is-10">
                <div>
                    <h1 className="title has-text-centered">Empieza a usarlo</h1>
                </div>
            </div>

            <div className="card column is-10">
                <h2 className="subtitle">Instalación:</h2>
                <div className="npm-and-yarn">
                    <p>npm</p>
                    <ExampleCode codeText={npmInstall} />
                    <p>yarn</p>
                    <ExampleCode codeText={yarnInstall} />
                </div>
            </div>

            <div className="card column is-10">
                <h2 className="subtitle">Ejemplo básico, copialo y pegalo para que pruebes</h2>
                <ExampleCode codeText={getStartedExampleCode} />
            </div>

            <div className="column is-10">
                <div>
                    <h2 className="subtitle">Si todo esta bien deberías tener lo siguiente:</h2>
                </div>
            </div>

            <div className="column is-10">
                <div className="card">
                    <div className="card-content">
                        <MyForm/>
                    </div>
                </div>
            </div>

            <div className="column is-10">
                <div className="card">
                    <div className="card-content">
                        <div className="subtitle">¿No tienes estilos?</div>
                        <div className="content">
                            nested-selects-react viene sin estilos, para que puedas personalizar tus
                            <b>{' <select></select> '}</b>
                            como quieras, revisa <Link to="/styles">como poner estilos</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="column is-10">
                <div className="card">
                    <div className="card-content">
                        <div className="subtitle">Incluir más cosas:</div>
                        <div className="content">
                            Incluir más cosas como componentes o más {'<select>'} anidados es muy fácil,
                            revisa <Link to="/structure">como hacer la estructura</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GetStarted;