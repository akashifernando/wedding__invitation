import { useState, useEffect } from 'react';
import './Envelope.css';

export default function Envelope({ onOpen, reset }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (reset) {
            setIsOpen(false);
        }
    }, [reset]);

    const handleOpen = (e) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    const handleDetailsClick = (e) => {
        e.stopPropagation();
        onOpen();
    };

    return (
        <div className={`envelope-scene ${isOpen ? 'open' : ''}`}>
            <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleOpen}>
                <div className="envelope-back"></div>
                <div className="top-flap"></div>

                <div className="letter">
                    <div className="letter-overlay"></div>
                    <h1 className="names">Nisaansala & Anurudda</h1>
                    <p></p>
                    <p></p>
                    
                    <p className="invite-text">We heartfully invite you to our wedding celebration</p>
                    <button
                        className="gold-btn"
                        onClick={handleDetailsClick}
                    >
                        Open Invitation
                    </button>
                </div>

                <div className="envelope-front">
                    <div className="flap left-flap"></div>
                    <div className="flap right-flap"></div>
                    <div className="flap bottom-flap"></div>
                </div>
            </div>

            {!isOpen && (
                <div className="instructions">
                    <span>Tap the envelope to open</span>
                </div>
            )}
        </div>
    );
}
