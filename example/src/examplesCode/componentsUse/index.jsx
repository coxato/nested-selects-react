import React from 'react';
// clipboard
import ClipBoard from '../../components/commons/ClipBoard/clipBoard';
// example components
import {
    ThreeNestedSelects
} from './examples';
// examples in text
import { subComponentsExampleCode } from '../exampleInText/allExamplesInText';


function SubComponentsPage() {
    // example in text
    const { threeNestedSelects } = subComponentsExampleCode;

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
                        Primero empezaremos con como incluir muchos <b>{'<Select>'}</b> anidados, luego cómo incluir tantos <b>sub-componentes</b> como quieras y por último cómo <b>poner todo junto</b>.
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
                        El siguiente ejemplo muestra un <b>{'<Select>'}</b> que tiene dentro varios sub <b>{'<Select>'}</b>, <b>3 {'<Select>'}</b> anidados para ser exactos:
                    </p>
                    <ThreeNestedSelects />
                </div>
            </div>
        </div>
    )
}


export default SubComponentsPage;