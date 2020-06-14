import React, { useState } from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';
// components
import ShowFlags from './ShowFlags/containers/showFlag';
import PhoneCountry from './PhoneCountry/phoneCountry';
import MiniForm from './MiniForm/miniForm';


// example with 3 nested sub <Select>
function ThreeNestedSelects() {
    return(
        <NestedSelects getvalues={ values => console.log(values)}>
            {/* normal Select */}
            <Select name="firstSelect" label="first select">
                <Option value="opt1">opt 1</Option>
                <Option value="opt2">opt 2</Option>
            </Select>
            {/* father of 3 sub <Select> */}
            <Select name="fatherSubSelects" label="father of three sub <Select>">
                <Option value="opt1">
                    opt1 hey select me!!
                    <MakeVisible>
                        {/* nested 1 */}
                        <Select name="nested-1" label="nested 1">
                            <Option value="opt1">
                                opt1 select me again!!
                                <MakeVisible>
                                    {/* nested 2 */}
                                    <Select name="nested-2" label="nested 2">
                                        <Option value="opt1">opt1</Option>
                                        <Option value="opt2">
                                            opt2 and this will show nested 3
                                            <MakeVisible>
                                                {/* nested 3 */}
                                                <Select name="nested-3" label="nested 3, the last.">
                                                    <Option value="opt1">opt1</Option>
                                                    <Option value="opt2">opt2</Option>
                                                </Select>
                                            </MakeVisible>
                                        </Option>
                                    </Select>
                                </MakeVisible>
                            </Option>
                            <Option value="opt2">
                                please select me
                                <MakeVisible>
                                    <Select name="random" label="random">
                                        <Option value="pot11">asdasd</Option>
                                        <Option value="pot12">fsasd</Option>
                                    </Select>
                                </MakeVisible>
                            </Option>
                        </Select>
                    </MakeVisible>
                </Option>
                <Option value="opt2">
                    opt2, hey don't select me!
                </Option>
            </Select>
        </NestedSelects>
    )
}



export {
    ThreeNestedSelects
}