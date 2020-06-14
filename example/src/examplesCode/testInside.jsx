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
                    <Option value="hey">holas</Option>
                    <Option value="wow2">
                        otra opcion
                        <MakeVisible>
                            <Select name="last-select">
                                <Option value="sfasfd">ijioajosij</Option>
                                <Option value="sssfasfd">
                                    ijioajosiasdj
                                    <MakeVisible>
                                        <Select name="super-last">
                                            <Option value="opt1">qwerty</Option>
                                            <Option value="opt1">ytrewq</Option>
                                        </Select>
                                        <Select name="super-last-2">
                                            <Option value="opt1">
                                                qwerty
                                            </Option>
                                            <Option value="opt1">ytrewq</Option>
                                        </Select>
                                    </MakeVisible>
                                </Option>
                            </Select>
                        </MakeVisible>
                    </Option>
                </Select>

            </NestedSelects>

        </div>
    )

}




export default TestInside;