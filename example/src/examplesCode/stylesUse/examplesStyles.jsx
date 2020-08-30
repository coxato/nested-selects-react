
import React from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';


function StyleExample({ className }) {

    return(
        <div className={className || ''}>
            <NestedSelects getvalues={() => {}}>
        
                {/* without nested */}
                <Select name="mySelect1" id="mySelect1" label="this is mySelect1">
                    <Option value="opt-1">option text 1</Option>
                    <Option value="opt-2">option text 2</Option>
                </Select>

                {/* with just one nested <Select> */}
                <Select name="mySelect2" id="mySelect2" label="this is mySelect2">
                    <Option value="opt-1">option text 1</Option>
                    <Option value="opt-2">
                        option 2 trigger
                        <MakeVisible>
                            <Select name="mySelect2-nested" label="nested select!">
                                <Option value="opt-1">opt 1</Option>
                                <Option value="opt-2">opt 2</Option>
                            </Select>
                        </MakeVisible>
                    </Option>
                </Select>

            </NestedSelects>
        </div>
    )
}

export {
    StyleExample
}
