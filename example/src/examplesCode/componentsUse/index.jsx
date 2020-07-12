import React from 'react';
// clipboard
// import ClipBoard from '../../components/commons/ClipBoard/clipBoard';
// example components
import ExampleCode from '../../components/commons/ExampleCode/exampleCode';
import {
    ThreeNestedSelects,
    SubComponents
} from './examples';
// examples in text
import { subComponentsExampleCode } from '../exampleInText/allExamplesInText';


function SubComponentsPage() {
    

    return(
        <div className="columns direction-column">
            <div className="column has-text-centered">
                <h1 className="title">Incluyendo sub componentes</h1>
                <h2 className="subtitle">Aprende como incluir todo tipo de sub componentes</h2>
            </div>

            <div className="column card">
                <div className="card-content">
                    <p className="content">
                        En la siguiente sección se te muestra como incluir o mejor dicho, <b>como mostrar</b> {' '} 
                        sub componentes cuando se haga click sobre una determinada <b>{'<Option>'}</b>.
                        Dichos componentes pueden ser uno o más {'<Select>'} ó componentes creados por ti. 
                        <br/>
                        <br/>
                        Primero empezaremos con como incluir muchos <b>{'<Select>'}</b> anidados, luego cómo incluir tantos <b>sub-componentes</b> como quieras.
                    </p>
                </div>
            </div>

            {/* multiples selects */}
            <div className="column card">
                <div className="card-content">
                    <h1 className="title">Multiples {'<Select>'} anidados.</h1>
                    <p className="content">
                        ¿Quieres saber cómo hacer que cuando le des click a una <b>{'<Option>'}</b> se muestre un sub <b>{'<Select>'}</b>?.
                        &nbsp;Es muy simple, solo coloca tantos sub <b>{'<Select>'}</b> como quieras dentro de un <b>{'<MakeVisible>'}</b>.
                        <br/>
                        Recuerda que un <b>{'<MakeVisible>'}</b> debe estar dentro de una <b>{'<Option>'}</b>
                        <br/>
                        <br/>
                        El siguiente ejemplo muestra un <b>{'<Select>'}</b> que tiene dentro varios sub <b>{'<Select>'}</b>.
                        <br/><b>3 {'<Select>'}</b> anidados para ser exactos:
                    </p>
                    <ThreeNestedSelects />
                </div>

                <div className="card-content">
                    <ExampleCode codeText={subComponentsExampleCode.threeNestedSelects} />
                </div>

                <div className="card-content">
                    <div className="content">
                        <span style={{textDecoration: 'underline'}}>Seguro notaste que se puede complicar un poco la lectura</span>, ya que se va anidando cada vez mas dependiendo de que tantos select uses. Por ahora solo recuerda que dentro de un <b>{'<Option></Option>'}</b> puedes poner un texto y un <b>{'<MakeVisible></MakeVisible>'}</b> y dentro del MakeVisible puedes colocar cualquier componente que quieras.
                        Asi que, puedes poner tantos sub elementos como lo necesites, aunque ya vez que a partir de 3 niveles de anidación la cosa no es tan facil de leer.
                        <br/>
                        <br/>
                        No te preocupes ya que esto se ira simplificando con el tiempo, a medida que se hagan actualizaciones.
                    </div>
                </div>
            </div>

            <div className="column card">
                <div className="card-content">
                    <h1 className="title">Sub componentes</h1>
                    <p className="content">
                        No solo se pueden poner <b>{'<Select></Select>'}</b> dentro de un <b>{'<MakeVisible></MakeVisible>'}</b>, también se pueden colocar tantos componentes como quieras, ya sean componentes creados por ti o por alguien más.
                    </p>
                    <p className="content">
                        En el siguiente ejemplo vez como incluir un componente para mostrar es muy fácil.
                    </p>

                    <div className="card-content">
                        <SubComponents />
                    </div>

                    <p className="subtitle">Código:</p>
                    <ExampleCode codeText={subComponentsExampleCode.subComponentsInsideMakeVisible} />

                </div>
            </div>
        </div>
    )
}


export default SubComponentsPage;