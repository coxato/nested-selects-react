import React from 'react';
import { Link } from 'react-router-dom';
import ExampleCode from '../../components/commons/ExampleCode/exampleCode';
// text code (code as a string)
import { customOnChangeExampleCode } from '../exampleInText/allExamplesInText';
// example as a component
import { CustomChangeValue, CustomChangeInsert, CustomChangeInsertImproved } from './example';

// text code
const { 
    customChangeValue, 
    handlerChangeInsert, 
    customChangeInsert ,
    fullyIndependentAsyncComponent
} = customOnChangeExampleCode;


function CustomOnChange(){

    return(
        <div className="columns is-centered is-multiline">
            
            <div className="column is-10">
                <div>
                    <h1 className="title has-text-centered">Custom onChange (customchange)</h1>
                </div>
            </div>


            <div className="column is-10">
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            Si necesitas hacer un onchange personalizado lo puedes hacer con el atributo <b>customchange</b>
                            <br/>
                            Éste recibe una función la cual puede tener 2 parámetros: <b>value</b> y <b>insertElement</b>.
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <div className="subtitle"><u>Obtener el valor y hacer algo con él</u></div>
                        <div className="content">
                            <CustomChangeValue />
                            <ExampleCode codeText={customChangeValue} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="column is-10">
                <div className="card">
                    <div className="card-content">
                        <div className="subtitle"><u>Insertar sub elementos manualmente</u></div>
                        <div className="content">
                            Si bien ya existe un componente llamado <b>{'<MakeVisible>'}</b>, el cual permite hacer visible un sub elemento
                            predefinido dependiendo de la opción seleccionada, también es cierto que a veces queremos hacer ciertas comprobaciones
                            o hacer acciones asíncronas (como traer datos de una API por ejemplo), antes de insertar un nuevo sub elemento.
                            <br/>
                            <br/>
                            Para hacer esto, puedes contar con la ayuda del segundo parámetro <b>insertElement</b>, en realidad puedes llamarlo como quieras
                            porque <b>es un callback.</b>  
                        </div>
                        <div className="content">
                            <div className="subtitle"><u>insertElement(selectName, jsxElement)</u></div>
                            La siguiente función manejadora trae datos de una API e inserta un nuevo sub elemento con dichos datos:
                            <ExampleCode codeText={handlerChangeInsert} /> 
                            <div className="subtitle"><u>El ejemplo completo es el siguiente:</u></div>
                            <ExampleCode codeText={customChangeInsert} />
                            Que da como resultado:
                            <CustomChangeInsert />
                        </div>
                    </div>
                </div>
            </div>

            <div className="column is-10">
                <div>
                    <h1 className="title has-text-centered">¿La mejor manera de traer datos asíncronamente?</h1>
                    
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Personalmente prefiero que cada sub elemento/componente tenga su propia lógica dentro de su ciclo de vida para traer
                                los datos necesarios para su funcionamiento.
                                <br/>
                                ¿Y la manera de incrustar dicho sub elemento/componente? - simple, con <b>{'<MakeVisible>'}</b>.
                                <br/>
                                Pero como vez, también esta la opción de usar el atributo <b>customChange</b>.
                                <br/>
                                <br/>
                                El ejemplo anterior (en lo personal), se ve mejor de la siguiente manera:
                                <ExampleCode codeText={fullyIndependentAsyncComponent} />
                                <CustomChangeInsertImproved />
                            </div>
                        </div>
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


        </div>
    )
}

export default CustomOnChange;