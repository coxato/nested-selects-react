import React, { useEffect } from 'react';
import Prism from 'prismjs';
import ClipBoard from '../ClipBoard/clipBoard';
// styles
import '../../../globalStyles/prism.css';
require('prismjs/components/prism-jsx'); // auto run

function ExampleCode({ codeText, lang = 'jsx' }) {

    // to highlight the code
    useEffect(() => {
        Prism.highlightAll(false);
    },[]);


    return(
        <pre>
            <ClipBoard text={codeText} />
            <code className={`language-${lang}`} >{codeText}</code>
        </pre>
    )
    
}

export default ExampleCode;