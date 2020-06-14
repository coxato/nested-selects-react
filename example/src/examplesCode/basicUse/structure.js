/*
 when you install from npm
 import { NestedSelects, Structure } from 'nested-selects-react'; 
 */
// but this is a local example, so we use the local reference to the library component
import { Structure } from 'nested-selects-react';

/**
 * this is a basic example of nested-selects-react, with just 3 <select>'s
 * and other <select>'s inside of them
 * ********** THE EXAMPLE **********
 * We will use the example of a car parts store, to easily explain how to start.
 * this car parts store does two things, sell parts (obvious lol) and has repair services
 * so we need a <select> that can trigger sub choices.
 */

// ========== first make the structure of elements ==========
// You have 2 ways to make it.
// Manually and with help of the Structure API
// If you want see with more detail about the structure creation please check ***** URL TO Structure EXAMPLE *****

// 1) first way, manually:
// remember, we want to make a <select>, that can trigger sub choices for car parts and services.
const myStructure = [
    // first principal select
    {
        elementType: 'select',
        name: 'what-need',            // the name is very important, try a unique name per <select>
        placeholder: 'What you need?',// optional
        options: [                    // array of options
            {
                value: 'need-parts',  // a value like <option value="need-parts">
                text: 'I need car parts',
                // ok, here is the trick, if you want something
                // to appear when the user selects this option
                // just put in makeVisible property.
                // for example, when the user select 'I need car parts'
                // a sub select will be shown
                makeVisible: [
                    {
                        elementType: 'select',
                        name: 'car-part-selected',
                        placeholder: 'Select the part that you want',
                        options: [
                            {
                                value: 'taillights',
                                text: 'taillights'
                            },
                            {
                                value: 'timing-belt',
                                text: 'timing belt'
                            }
                        ]
                    }
                ]
            },
            // second option of principal select
            {
                value: 'need-service',
                text: 'I need car services',
                // and here we go again, if you want something
                // to appear when the user selects this option
                // just put in makeVisible property.
                makeVisible: [
                    {
                        elementType: 'select',
                        name: 'service-selected',
                        placeholder: 'What service do you need?',
                        options: [
                            {
                                value: 'maintenance-only',
                                text: 'Just car maintenance'
                            },
                            {
                                value: 'engine-repair',
                                text: 'Engine repair'
                            },
                        ]
                    }
                ]
            }
        ]
    },

    // second principal select
    // this is an extra simple select, the importants to this example are higher 
    {
        elementType: 'select',
        name: 'just-a-normal-select',
        options: [
            {
                value: 'option1',
                text: 'option 1'
            },
            {
                value: 'option2',
                text: 'option 2'
            },
            {
                value: 'option3',
                text: 'option 3'
            }
        ]
    }
]

export default myStructure;