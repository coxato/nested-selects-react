import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

// examples code
import Introduction from '../examplesCode/introduction/intro';
import GetStarted from '../examplesCode/getStarted/index';
import MakingStructure from '../examplesCode/makingStructure/index';
import SubComponents from '../examplesCode/componentsUse/index';
import CustomOnChange from '../examplesCode/customOnChange/index';
import Styles from '../examplesCode/stylesUse';

import { url } from '../url';
// app menu
import Menu from '../components/Menu/menu';
// style
import '../globalStyles/bulma.css';
import './app.css';

 
function App(){
    return(
        <div id="app-container">
            <BrowserRouter basename={url}>

                <Menu />

                <div id="app-content-wrapper">
                    <Routes>
                        <Route path="/" element={<Introduction />} />
                        <Route path="/get-started" element={<GetStarted />} />
                        <Route path="/structure" element={<MakingStructure />} />
                        <Route path="/including-sub-components" element={<SubComponents />} />
                        <Route path="/styles" element={<Styles />} />
                        <Route path="/custom-onchange" element={<CustomOnChange />} />
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    )
}

export default App;