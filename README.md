# nested-selects-react

[![NPM](https://img.shields.io/npm/v/nested-selects-react.svg)](https://www.npmjs.com/package/nested-selects-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# nestedSelectsReact
A react component to manage nested `<select>` tags.

install with npm:
```
npm i nested-selects-react
```
install with yarn:
```
yarn add nested-selects-react
```

## Demo and docs
url...

### in case you want to use it fast
```JSX
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
                <Select name="second-select" label="first select">
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
```

nested-selects-react comes without styles.
If you want to add styles please check docs. it's very easy
url...
## License

MIT © [carlosEdua](https://github.com/carlosEdua)

> Powered by create-react-library
