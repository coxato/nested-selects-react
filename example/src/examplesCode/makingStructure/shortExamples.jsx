import React from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';
import FlagsComponent from '../componentsUse/ShowFlags/containers/showFlag';


function NormalUse(){
    const log = data => console.log('NestedSelects values: ', data);

    return(
        <NestedSelects getvalues={log}>
            <Select name="mySelect" label="mySelect">
                <Option value="opt1">option 1</Option>
                <Option value="opt2">option 2</Option>
            </Select>
        </NestedSelects>
    )
}


function OneSubSelect() {
    const log = data => console.log('NestedSelects values: ', data);

    return(
        <NestedSelects getvalues={log}>
            <Select name="mySelect" label="mySelect">
                <Option value="opt1">option 1</Option>
                <Option value="opt2">
                    select this for trigger sub-elements
                    <MakeVisible>
                        <Select name="myNestedSel" label="myNestedSel">
                            <Option value="opt1-sub-sel">option 1</Option>
                            <Option value="opt2-sul-sel">option 2</Option>
                        </Select>
                    </MakeVisible>
                </Option>
            </Select>
        </NestedSelects>
    )
}

function TwoSubSelects() {
    const log = data => console.log('NestedSelects values: ', data);

    return(
        <NestedSelects getvalues={log}>
            <Select name="mySelect" label="mySelect">
                <Option value="opt1">option 1</Option>
                <Option value="opt2">
                    select this for trigger sub-elements
                    <MakeVisible>
                        <Select name="myNestedSel" label="myNestedSel">
                            <Option value="opt1-sub-sel">option 1</Option>
                            <Option value="opt2-sul-sel">
                                select this for a more nested {'<select>'}
                                <MakeVisible>
                                    <Select name="very-nested-select" label="wow, very nested">
                                        <Option value="opt1">opt1</Option>
                                        <Option value="opt2">opt2</Option>
                                    </Select>
                                </MakeVisible>
                            </Option>
                        </Select>
                    </MakeVisible>
                </Option>
            </Select>
        </NestedSelects>
    )
}

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
                        <h1 className="title">Hi I'm a h1</h1>

                        {/* components, put here yours React components!!!*/}
                        <FlagsComponent />

                        {/* if you want a sub-select, you can put it also */}
                        <Select name="subSel" label="sub select showed with other components">
                            <Option value="opt1">option 1</Option>
                            <Option value="opt2">option 2</Option>
                        </Select>

                    </MakeVisible>
                </Option>
            </Select>
        </NestedSelects>
    )
}

export {
    NormalUse,
    OneSubSelect,
    TwoSubSelects,
    SubComponents,
}