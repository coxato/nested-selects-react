import React from 'react';
import { createPortal } from 'react-dom';

function PortalModal({children, showPortal}){
    
    if(showPortal){
        return(
            createPortal(
                <div className="portal-container">
                    {children}
                </div>,
                document.getElementById('portalModal')
            )
        )
    }
    
    return null;
}

export default PortalModal;