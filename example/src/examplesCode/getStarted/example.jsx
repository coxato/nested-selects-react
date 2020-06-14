import React, { useState } from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';


// ***************************** WITH THE API ***********************************
// ============== create the <selects> structure ================
// const struct = new Structure();
// // ***** principal selects *****
// const select1 = struct.makeElement('select', { name: 'first-select', label: 'first select' })
// const select1Options = struct.makeElement('options', {
//     optionsArray: [
//         { value: 'sel1-option1', text: 'option 1' },
//         { value: 'sel1-option2', text: 'option 2' }
//     ]
// });

// const select2 = struct.makeElement('select', { name: 'second-select', label: 'second select' })
// const select2Options = struct.makeElement('options', {
//     optionsArray: [
//         { value: 'sel2-option1', text: 'option 1' },
//         { value: 'sel2-option2', text: 'sel2 option 2 trigger' }
//     ]
// });
// // ***** sub selects *****
// const subSelect = struct.makeElement('select', { name: 'sub-select', label: 'Wow! check this out, a sub select!'});
// const subSelectOptions = struct.makeElement('options', {
//     optionsArray: [
//         { value: 'sub-sel1-option1', text: 'sub option 1' },
//         { value: 'sub-sel1-option2', text: 'sub option 2' }
//     ]
// });

// // ======== add options to selects ========
// struct.addOptionsToSelect(select1, select1Options);
// struct.addOptionsToSelect(select2, select2Options);
// struct.addOptionsToSelect(subSelect, subSelectOptions);

// // ========== link trigger options with sub elements ==========
// struct.linkElementWithTriggerOption(subSelect, 'sel2-option2');

// // ========== save elements ==========
// const theStruct = struct.savePrincipalSelects(select1, select2);


// // ***************************** HANDMADE ***********************************
// const myStructureHandMade = [
//     // first principal <select>
//     {
//         elementType: 'select',
//         name: 'first-select',
//         label: 'first select',
//         options: [
//             { value: 'sel1-option1', text: 'option 1' },
//             { value: 'sel1-option2', text: 'option 2' }
//         ]
//     },
//     // second principal <select>
//     {
//         elementType: 'select',
//         name: 'second-select',
//         label: 'second select',
//         options: [
//             { value: 'sel2-option1', text: 'option 1' },
//             // trigger option
//             { value: 'sel2-option2', text: 'sel2 option 2 trigger',
//                 makeVisible: [
//                     {    
//                         elementType: 'select',
//                         name: 'sub-select',
//                         label: 'Wow! check this out, a sub select!',
//                         options: [
//                             { value: 'sub-sel1-option1', text: 'option 1' },
//                             { value: 'sub-sel1-option2', text: 'option 2' }
//                         ]   
//                     }
//                 ]
//             }
//         ]
//     }
// ]

// ***************************** WITH THE COMPONENTS ***********************************
// const myStructureComponents = [
//     <Select name="first-select" label="first select">
//         <Option value="sel1-option1">sel1 option 1</Option>
//         <Option value="sel1-option2">sel1 option 2</Option>
//     </Select>
// ,
//     <Select name="second-select" label="first select">
//         <Option value="sel2-option1">sel2 option 1</Option>
//         {/* trigger option */}
//         <Option value="sel2-option2">
//             sel2 option 2 trigger
//             <MakeVisible>
//                 <Select name="sub-select" label="Wow! check this out, a sub select!">
//                     <Option value="sub-sel-option1">option 1</Option>
//                     <Option value="sub-sel-option1">option 2</Option>
//                 </Select>
//             </MakeVisible>    
//         </Option>
//     </Select>
// ]


function MyForm(){
    const [ state, setState ] = useState({ 
        nestedSelectsValues: null 
    });

    // to get the selects data
    const getValues = data => setState({ ...state, nestedSelectsValues: data });

    const handleSubmit = ev => {
        ev.preventDefault();
        console.clear();
        console.log("NestedSelects values", state);
        alert("look the console")
    }

    return(
        <form onSubmit={() => false}>
            <NestedSelects getvalues={getValues}>

                <Select name="first-select" label="first select">
                    <Option value="sel1-option1">sel1 option 1</Option>
                    <Option value="sel1-option2">sel1 option 2</Option>
                </Select>

                <Select name="second-select" label="second select">
                    <Option value="sel2-option1">sel2 option 1</Option>
                    {/* trigger option */}
                    <Option value="sel2-option2">
                        sel2 option 2 trigger
                        <MakeVisible>
                            <Select name="sub-select" label="Wow! check this out, a sub select!">
                                <Option value="sub-sel-option1">option 1</Option>
                                <Option value="sub-sel-option1">option 2</Option>
                            </Select>
                        </MakeVisible>    
                    </Option>
                </Select>

            </NestedSelects>
            <button type="button" className="button btn-custom" onClick={handleSubmit}>save</button>
        </form>
    )
}

export default MyForm;