import React, { useState } from 'react';
import Modal from '../Portal/portal';


function ClibBoard({ text }) {
    const [showModal, setShowModal] = useState(false);

    const copyToClipboard = codeTxt => {
        navigator.clipboard.writeText(codeTxt);
        setShowModal(true);
        closeClipboardMessage();
    }
    
    const closeClipboardMessage = () => setTimeout(() => {
        setShowModal(false);
    }, 1750);


    return (
        <div className="clipboard-container">
            <div onClick={() => copyToClipboard(text)} className="copy-icon">copy</div>
            
            
            <Modal showPortal={showModal}>
                <div className="copied-message-container">
                    <div className="copied-message">
                        Copied to clipboard!
                    </div>
                </div>
            </Modal>
        </div>

    )

}

export default ClibBoard;