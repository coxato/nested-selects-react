import React from "react";
import { Select, Option, MakeVisible, NestedSelects } from 'nested-selects-react';

function TestInside(){

    return(
        <div className="container">
            <NestedSelects getvalues={(data) => console.log(data)}>
                <Select name="select1" id="select1"> 
                    <Option value="opt1-s1">option 1</Option>
                    <Option value="opt2-s1">otra opcion</Option>
                </Select>
 

                <Select name="select3" id="select3" >
                    <Option value="hey">
                        opt 1
                        <MakeVisible>
                            <h1>hola soy un titulo</h1>
                            <div className="card has-background-primary p-3">
                                <div className="title">soy una tarjeta</div>
                            </div>
                            <Select name="nested" label="fist nested">
                                <Option value="n-1">nested 1</Option>
                                <Option value="n-2">
                                    nested 2
                                    <MakeVisible>
                                        <div className="form card">
                                            ola ka se
                                        </div>
                                    </MakeVisible>
                                </Option>
                            </Select>
                        </MakeVisible>
                    </Option>
                    <Option value="hey2">opt 2</Option>
                </Select>

            </NestedSelects>

        </div>
    )

}




export default TestInside;