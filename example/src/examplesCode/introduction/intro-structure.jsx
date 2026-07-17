// introduction demo structure
import React from 'react';
// sub component
import ShowFlags from '../componentsUse/ShowFlags/containers/showFlag';
import PhoneCountry from '../componentsUse/PhoneCountry/phoneCountry';


const structure = [
    // principal select 1
    {
        elementType: 'select',
        name: 'first-pricipal-select',
        label: "Hi, I'm a pricipal select",
        options: [
            {
                value: 'normal-first-option', text: "I'm a normal option"
            },
            {
                value: 'first-sub-select-trigger',
                text: "Hey select me!!!",
                makeVisible: [
                    {
                        elementType: 'select',
                        name: 'a-sub-select1',
                        label: 'Wow!, look it this, a sub select',
                        options: [
                            { value: 'subselect-normal-option1', text: 'normal option'},
                            { value: 'subselect-normal-option2', text: 'another normal option'}
                        ]
                    }
                ]
            },

        ]
    },

    // principal select 2
    {
        elementType: 'select',
        name: 'second-pricipal-select',
        label: "You can render components. I'm also a principal select", // (optional)
        options: [
            { 
                value: 'to-flags-component',
                text: 'Render a Component!',
                makeVisible: [
                    {
                        elementType: 'component',
                        name: 'flags-component1',
                        component: <ShowFlags />
                    }
                ]
            },
            { 
                value: 'to-phone-component',
                text: 'Render another Component!',
                makeVisible: [
                    {
                        elementType: 'component',
                        name: 'phone-component1',
                        component: <PhoneCountry />
                    }
                ]
            }
        ]
    },
    
    // principal select 3
    {
        elementType: 'select',
        name: 'very-nested-selects',
        label: "And this select has many nested selects. I'm a principal select too",
        options: [
            {
                value: 'sub-select',
                text: 'Select me and see all my sub components!',
                makeVisible: [
                    // multiple sub components rendered at once
                    {
                        elementType: 'component',
                        name: 'title',
                        component: <p className="subtitle-v2">You can show more than one component at a time</p>
                    },
                    {
                        elementType: 'component',
                        name: 'flags-component2',
                        component: <ShowFlags />
                    },
                    {
                        elementType: 'component',
                        name: 'phone-component2',
                        component: <PhoneCountry />
                    },
                    {
                        elementType: 'select',
                        name: 'a-sub-select2',
                        label: 'more nested!!',
                        options: [
                            { value: 'subselect-normal-option1', text: 'normal option'},
                            { 
                                value: 'nested1', 
                                text: 'this will show two more <select>',
                                makeVisible: [
                                    {
                                        elementType: 'select',
                                        name: 'nested1',
                                        label: 'select for more nested',
                                        options: [
                                            { value: 'very-nested-option1', text: 'normal option 1'},
                                            { value: 'very-nested-option2', text: 'normal option 2'},
                                            { 
                                                value: 'very-nested-option3', 
                                                text: 'Oh yeah, select me',
                                                makeVisible: [
                                                    {
                                                        elementType: 'component',
                                                        name: 'message',
                                                        component: <p className="subtitle-v2">Well, I think you got the point</p>
                                                    }
                                                ]
                                            },
                                            { value: 'very-nested-option4', text: 'normal option 4'},
                                        ] 
                                    },

                                    {
                                        // a <select> with custom onChange
                                        elementType: 'select',
                                        name: 'customOnChange-select',
                                        label: 'this select has a customOnChange',
                                        options: [
                                            { value: 'customOnChange-option1', text: 'alert the screen width'},
                                            { value: 'customOnChange-option2', text: 'insert a component'},
                                        ],
                                        // customOnChange: (value, store, insertElement) => {
                                        customchange: (value, insertElement) => {
                                            
                                            if(value === 'customOnChange-option1'){
                                                const screenWidth = document.body.offsetWidth;
                                                alert('document.body width is: ' + screenWidth + 'px');
                                            }
                                            // insert a element
                                            else if(value === 'customOnChange-option2'){
                                                const MyComponent = <PhoneCountry />;
                                                const selectName = 'customOnChange-select'; // normally it is this same <select> name
                                                insertElement(selectName, MyComponent);
                                            }
                                        
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ]
            },

            { value: 'normal-option-select3', text: 'normal option' }

        ]
    }

]

export default structure;