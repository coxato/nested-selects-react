import React from 'react';
import ExampleCode from '../../components/commons/ExampleCode/exampleCode';
import { makingStructureExampleCode } from '../exampleInText/allExamplesInText';
import { Link } from 'react-router-dom';

 
function MakingStructure() {

    // simple code text example
    const { Select, Option, MakeVisible, NestedSelects, fullExample } = makingStructureExampleCode; 

    return(
        <div className="making-structure-container columns direction-column">
            <div className="column">
                <h1 className="title has-text-centered">Creando la estructura</h1>
                <h2 className="subtitle has-text-centered">Conoce como funciona nested-selects-react</h2>
            </div>

            <div className="column">
                <div className="card">
                    <div className="card-content">
                        <p className="content">
                            Es muy fácil usar nested-selects-react, es muy parecido a usar HTML de toda la vida, 
                            solo que debes tener en cuenta ciertos componentes y la manera de estructurarlos. 
                            <br/>
                            <b>nested-selects-react tiene 4 componentes principales:</b>
                        </p>
                        <ul className="list">
                            <li className="list-item"><b><Link to="/structure#NestedSelects">NestedSelects</Link></b></li>
                            <li className="list-item"><b><Link to="/structure#Select">Select</Link></b></li>
                            <li className="list-item"><b><Link to="/structure#Option">Option</Link></b></li>
                            <li className="list-item"><b><Link to="/structure#MakeVisible">MakeVisible</Link></b></li>
                        </ul> 
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                    <div className="card-content">
                        {/* NestedSelects */}
                        <div className="container">
                            <h2 className="subtitle-v3" id="NestedSelects">NestedSelects</h2>
                            <p className="content">Es el contenedor que tendrá todos los {'<Select>'} dentro de él.
                                <br/>Requiere un <b>callback</b> para poder traer los valores de todos los {'<Select>'} y componentes dentro de NestedSelects.
                                <br/>Dicho callback se le pasa como una prop llamada <b>getvalues</b>
                            </p>
                            <ExampleCode codeText={NestedSelects} />
                        </div>

                        {/* Select */}
                        <div className="container">
                            <h2 className="subtitle-v3" id="Select">Select</h2>
                            <p className="content">Es parecido a un {'<select>'} normal de HTML.
                                <br/>Requiere obligatoriamente la propiedad <b>name</b> ó <b>id</b>
                            </p>
                            <ExampleCode codeText={Select} />
                        </div>

                        {/* Option */}
                        <div className="container">
                            <h2 className="subtitle-v3" id="Option">Option</h2>
                            <p className="content">Es parecido a  un {'<option>'} normal de HTML.
                                <br/>Requiere obligatoriamente la propiedad <b>value</b>
                            </p>
                            <ExampleCode codeText={Option} />
                        </div>

                        {/* MakeVisible */}
                        <div className="container">
                            <h2 className="subtitle-v3" id="MakeVisible">MakeVisible</h2>
                            <p className="content">Dentro de él irán todos los elementos que quieras renderizar al momento de seleccionar una opción.
                                <br/>Puedes incluir uno o más elementos como por ejemplo más <b>{'<Select>'}</b> ó componentes hijos.
                                <br/><b>No tiene props.</b>
                                <br/><b>Debe estar dentro de una {'<Option>'}</b>
                            </p>
                            <ExampleCode codeText={MakeVisible} />
                        </div>


                        {/* full example */}
                        <div className="container">
                            <h2 className="subtitle-v3">Ejemplo con todo</h2>
                            <p className="content">Este ejemplo tiene 2 {'<Select>'} pricipales.
                                <br/>El primer {'<Select>'} es normal, pero el segundo {'<Select>'} tiene un {'<Select>'} anidado.
                            </p>
                            <ExampleCode codeText={fullExample} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakingStructure;