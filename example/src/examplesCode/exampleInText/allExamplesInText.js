// examples in string to show the code and copy it

// ========================== get started example ============================
const npmInstall = "npm i nested-selects-react";
const yarnInstall = "yarn add nested-selects-react";


const getStartedExampleCode = (
`
import React, { useState } from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';


function MyForm(){
    const [ state, setState ] = useState({ 
        nestedSelectsValues: null 
    });
    // to get the <Select>'s data
    const getValues = data => setState({ ...state, nestedSelectsValues: data });

    const handleSubmit = ev => {
        ev.preventDefault();
        console.log(state);
    }

    return(
        <form onSubmit={() => false}>
            {/* nested-selects-react code */}
            <NestedSelects getvalues={getValues}>
                {/* first principal select */}
                <Select name="first-select" label="first select">
                    <Option value="sel1-option1">sel1 option 1</Option>
                    <Option value="sel1-option2">sel1 option 2</Option>
                </Select>
                {/* second principal select */}
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
            <button type="button" onClick={handleSubmit}>save</button>
        </form>
    )
}

export default MyForm;
`
);

// =========================== making structure page ==============================
const makingStructureExampleCode = {
    NestedSelects:
`<NestedSelects getvalues={(values) => console.log(values) } >
    {...}
</NestedSelects>
`,

    Select:
`<Select name="mySelect"  id="mySelect"  label="this is mySelect">
    {...}
</Select>
`,

    Option:
`<Option value="opt-value">option text</Option>`,

    MakeVisible:
`
{/* this option will trigger all components inside <MakeVisible> */}
<Option value="opt-value">
    option text
    <MakeVisible>
        {/* component */}
        {/* component */}
        {/* component */}
        ...
    </MakeVisible>
</Option>
`,

    fullExample:
`
import React, { useState } from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';


function MySubSelects() {

    const [state, setState] = useState({});

    const handleValues = data => {
        console.log("the nestedSelectsValues:", state);

        setState({
            ...state,
            nestedSelectsValues: {...data}
        })
    }

    return(
        <NestedSelects getvalues={handleValues} >
    
            {/* without nested */}
            <Select name="mySelect1" id="mySelect1" label="this is mySelect1">
                <Option value="opt-value1">option text 1</Option>
                <Option value="opt-value2">option text 2</Option>
            </Select>

            {/* with just one nested <Select> */}
            <Select name="mySelect2" id="mySelect2" label="this is mySelect2">
                <Option value="opt-value1">option text 1</Option>
                <Option value="opt-value2">
                    option 2 trigger
                    <MakeVisible>
                        <Select name="mySelect2-nested" label="nested select!">
                            <Option value="opt1">opt 1</Option>
                            <Option value="opt2">opt 2</Option>
                        </Select>
                    </MakeVisible>
                </Option>
            </Select>

        </NestedSelects>

    )
}
`
}


// ==================== sub components page examples ==========================
const subComponentsExampleCode = {
    threeNestedSelects:
`
import React from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';

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

`,

    subComponentsInsideMakeVisible:
`
import React from 'react';
import { NestedSelects, Select, Option, MakeVisible } from 'nested-selects-react';
// === change this with your custom or customs components ===
import FlagsComponent from './ShowFlags/containers/showFlag';
// ==============================================


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
`
}

const customOnChangeExampleCode = {
customChangeValue: 
`
function CustomChangeValue(){

    const handleCustomChange = (value) => {
        // here your logic
        if(value === "opt1") console.log("is first option");
        else if(value === "opt2") console.log("is second option");
        else console.log("is default option");
    }

    return(
        <div className="container">
            <NestedSelects getvalues={() => {}}>
                <Select 
                    customchange={handleCustomChange} 
                    name="select1" 
                    label="select and see the console" 
                > 
                    <Option value="opt1">option 1</Option>
                    <Option value="opt2">otra opcion</Option>
                </Select>
            </NestedSelects>
        </div>
    )
}
`,
handlerChangeInsert: 
`
// insert an element asynchronously
const handleChangeInsert = async (value, insertElement ) => {
    // here your logic
    if(value === "opt2"){
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            // insert element with data
            insertElement("select1", <MiniList data={data} />)
        } catch ({message}) {
            console.log(message);
        }
    }
}
`,

customChangeInsert:
`
function MiniList({data}){
    return (
        <ul>
            {data.map(({id, name}) => <li key={id}>{name}</li>)}
        </ul>
    )
}

function CustomChangeInsert(){
    // insert an element asynchronously
    const handleChangeInsert = async (value, insertElement ) => {
        // here your logic
        if(value === "opt1"){
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                // insert element with data
                insertElement("select1", <MiniList data={data} />)
            } catch ({message}) {
                console.log(message);
            }
        }
    }

    return(
        <div className="container">
            <NestedSelects getvalues={() => {}}>
                <Select 
                    customchange={handleChangeInsert} 
                    name="select1" 
                    label="select and see the console" 
                > 
                    <Option value="opt1">normal option</Option>
                    <Option value="opt2">insert an element asynchronously</Option>
                </Select>
            </NestedSelects>

        </div>
    )
}
`,

fullyIndependentAsyncComponent:
`
// fully independent functional component
function MiniListImproved(){
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const usersArr = await response.json();
            setUsers(usersArr);
            setLoading(false);

        } catch ({message}) {
            console.log(message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        loading
        ?
        <p>Loading</p>
        :
        <ul>
            {users.map(({id, name}) => <li key={id}>{name}</li>)}
        </ul>    
    ) 
}

// nested-selects-react
function CustomChangeInsertImproved(){
    return(
        <div className="container">
            <NestedSelects getvalues={() => {}}>
                <Select  name="select1" label="with <MakeVisible>"> 
                    <Option value="opt1">normal option</Option>
                    <Option value="opt2">
                        insert element with MakeVisible
                        <MakeVisible>
                            <MiniListImproved />
                        </MakeVisible>
                    </Option>
                </Select>
            </NestedSelects>
        </div>
    )
}
`

}



export {
    npmInstall,
    yarnInstall,
    getStartedExampleCode, 
    makingStructureExampleCode,
    subComponentsExampleCode,
    customOnChangeExampleCode
}

