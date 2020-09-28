import React, { useState, useEffect } from "react";
import { Select, Option, NestedSelects, MakeVisible } from 'nested-selects-react';

// ===== just catch option value ===== 
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
                    name="select1" 
                    label="select and see the console" 
                    customchange={handleCustomChange} 
                > 
                    <Option value="opt1">option 1</Option>
                    <Option value="opt2">option 2</Option>
                </Select>

            </NestedSelects>

        </div>
    )
}


// ===== catch value and insert sub element =====
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


// ===== insert element with MakeVisible =====

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



export {
    CustomChangeValue,
    CustomChangeInsert,
    CustomChangeInsertImproved
}
