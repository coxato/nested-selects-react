import React from 'react';
/*
 when you install from npm
 import { NestedSelects, Structure } from 'nested-selects-react'; 
 */
// but this is a local example, so we use the local reference to the library component
import { NestedSelects } from 'nested-selects-react';
import myStructure from './structure';



function MySelects(){
    return(
        <div className="container">
            <h1>First simple demo:</h1>
            <p>Just few {"<select>'s"} with a car parts store example</p>

            <NestedSelects selects={myStructure}  storeData={{}}/>

        </div>
    )
} 


export {
    MySelects
}

