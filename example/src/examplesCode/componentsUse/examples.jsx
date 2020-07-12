import React from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';
// components
import FlagsComponent from './ShowFlags/containers/showFlag';
// import PhoneCountry from './PhoneCountry/phoneCountry';
// import MiniForm from './MiniForm/miniForm';


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
                                normal option
                            </Option>
                        </Select>
                    </MakeVisible>
                </Option>
                <Option value="opt2">
                    normal option
                </Option>
            </Select>
        </NestedSelects>
    )
}

const H1 = () => <h1 className="title">Hi I'm a h1</h1>;


function SubComponents(){
    const log = data => console.log('NestedSelects values: ', data);

    return( 
        <NestedSelects getvalues={log}>
            {/* normal <Select> */}
            <Select name="mySelect" label="mySelect">
                <Option value="opt1">option 1</Option>
                <Option value="opt2">option 2</Option>
            </Select>

            {/* <Select with sub components> */}
            <Select name="mySelect2" label="mySelect2">
                <Option value="opt1">opt1</Option>
                <Option value="opt2">
                    show various components
                    <MakeVisible>

                        {/* react tags */}
                        
                        <Select name="mySelect11" label="mySelect11">
                            <Option value="opt1">option 1</Option>
                            <Option value="opt2">option 2</Option>
                        </Select>

                        <Select name="mySelect22" label="mySelect22">
                            <Option value="opt1">option 1</Option>
                            <Option value="opt2">option 2</Option>
                        </Select>

                        <Select name="mySelect33" label="mySelect33">
                            <Option value="opt1">option 1</Option>
                            <Option value="opt2">option 2
                                <MakeVisible>
                                    <Select name="sub1" label="sub1">
                                        <Option value="opt1">option 1</Option>
                                        <Option value="opt2">option 2</Option>
                                    </Select>
                                    <Select name="sub2" label="sub2">
                                        <Option value="opt1">option 1</Option>
                                        <Option value="opt2">option 2</Option>
                                    </Select>
                                    <Select name="sub3" label="sub3">
                                        <Option value="opt1">option 1</Option>
                                        <Option value="opt2">option 2</Option>
                                    </Select>

                                    
                                </MakeVisible>
                            </Option>
                        </Select>

                        <FlagsComponent />

                        {/* components, put here yours React components!!!*/}
                        

                        {/* if you want a sub-select, you can put it also */}
                        

                    </MakeVisible>
                </Option>
            </Select>
        </NestedSelects>
    )
}



export {
    ThreeNestedSelects,
    SubComponents
}