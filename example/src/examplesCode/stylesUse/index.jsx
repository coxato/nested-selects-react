import React from 'react';
import { StyleExample } from './examplesStyles';
import ExampleCodeView from '../../components/commons/ExampleCode/exampleCode';
import { nativeClasses, specificElements } from './cssTextCode';


function StylesPage() {    

    return(
        <div className="columns direction-column">
            <div className="column has-text-centered">
                <h1 className="title">Agregando estilos</h1>
            </div>


            <div className="column card">
                <div className="card-content">
                    <p className="content">
                        <b>nested-selects-react</b> viene sin estilos por defecto, es asi para que personalices a tu gusto
                        &nbsp;todos los componentes hijos.
                        <br/>
                        <br/>
                        Por defecto cuando uses <b>nested-selects-react</b>, se ve así:
                    </p>
                    <StyleExample className="without-style" />
                </div>

                <div className="card-content">
                    <p className="content">
                        Y si aplicas estilos, puedes cambiar mucho la cosa:
                        <br/>
                    </p>
                    <StyleExample />
                </div>
            </div>


            <div className="column card">
                <div className="card-content">
                    <p className="subtitle-v3">
                        Las clases css que trae <i>nested-selects-react</i> son las siguientes:
                    </p>
                    <ul className="class-colors list">
                        <li className="list-item">
                            .nsr <div className="class-color" style={{backgroundColor: 'darkorchid'}}></div>
                        </li>
                        <li className="list-item">
                            .nsr-principalSelect <div className="class-color" style={{backgroundColor: 'royalblue'}}></div>
                        </li>
                        <li className="list-item">
                            .nsr-select-container <div className="class-color" style={{backgroundColor: 'darkred'}}></div>
                        </li>
                        <li className="list-item">
                            .nsr-label <div className="class-color" style={{backgroundColor: 'white'}}></div>
                        </li>
                        <li className="list-item">
                            .nsr-sub-select <div className="class-color" style={{backgroundColor: 'yellow'}}></div>
                        </li>
                    </ul>

                    <StyleExample className="custom-style" />
                    <ExampleCodeView codeText={nativeClasses} lang="css" />
                </div>
            </div>

            <div className="column card">
                <div className="card-content">
                    <div className="content">
                        También puedes modificar todos los elementos de un tipo. Por ejemplo, si quieres modificar todos los {'<select>'} sería asi:
                    </div>
                    <StyleExample className="custom-style selects-styles" />
                    <ExampleCodeView codeText={specificElements} lang="css" />
                </div>
            </div>


        </div>
    )
}


export default StylesPage;