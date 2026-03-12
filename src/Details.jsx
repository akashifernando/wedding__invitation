import { useEffect, useState } from 'react';
import img1 from './images/IMG_7558.JPG.jpeg';
import img2 from './images/IMG_7560.JPG.jpeg';
import img3 from './images/IMG_7561.JPG.jpeg';
import img4 from './images/IMG_7562.JPG.jpeg';
import img5 from './images/IMG_7563.JPG.jpeg';
import img6 from './images/IMG_7565.JPG (1).jpeg';
import img7 from './images/IMG_7574.JPG.jpeg';
import img8 from './images/IMG_7577.JPG (1).jpeg';
import img9 from './images/IMG_7579.JPG.jpeg';
import img10 from './images/IMG_7585.JPG.jpeg';
import './Details.css';

const engagementPhotos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function Details({ isActive, onClose }) {
    const [showContent, setShowContent] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        let interval;
        let countdownInterval;

        if (isActive) {
            setTimeout(() => setShowContent(true), 500);

            // Cycle photos every 5.5 seconds
            interval = setInterval(() => {
                setPhotoIndex((prev) => (prev + 1) % engagementPhotos.length);
            }, 5500);

            // Countdown to April 4th, 2026, 9:00 AM 
            const weddingDate = new Date("April 4, 2026 09:00:00").getTime();
            
            countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = weddingDate - now;

                if (distance > 0) {
                    setTimeLeft({
                        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((distance % (1000 * 60)) / 1000)
                    });
                } else {
                    clearInterval(countdownInterval);
                }
            }, 1000);

        } else {
            setShowContent(false);
            setPhotoIndex(0); // Reset to first photo when closed
        }

        return () => {
            if (interval) clearInterval(interval);
            if (countdownInterval) clearInterval(countdownInterval);
        };
    }, [isActive]);

    return (
        <div className={`details-page ${isActive ? 'active' : ''}`}>
            <div className="particles" id="particles">
                {isActive && <Particles count={40} />}
            </div>

            <div className="glass-card">
                <h2>The Wedding of</h2>
                <h1 className="names-large">Nisansala <br />&amp;<br /> Anurudda</h1>
                <div className="divider"></div>
                <p className="date">Saturday, 04th April 2026</p>

                <div className="engagement-photo-container">
                    {engagementPhotos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`Engagement ${index + 1}`}
                            className={`engagement-photo ${index === photoIndex ? 'visible' : ''}`}
                        />
                    ))}
                </div>

                <p className="heartfelt-message">
                    With heartfull of love and happiness, we are delighted to invite you to our wedding!
                </p>

                <p className="location">
                    <a href="https://maps.app.goo.gl/4kLNYULwS2wSFRJw7?g_st=iw" target="_blank" rel="noopener noreferrer">
                        <svg className="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Hotel Wediya Nilla<br />
                        Galgamuwa, Ehetuwewa<br />
                        <br />
                        <span className="maps-highlight">Click here for Google Maps Location</span>
                    </a>
                </p>

                <div className="countdown-container">
                    <div className="time-box">
                        <span className="time-number">{timeLeft.days}</span>
                        <span className="time-label">Days</span>
                    </div>
                    <div className="time-box">
                        <span className="time-number">{timeLeft.hours}</span>
                        <span className="time-label">Hours</span>
                    </div>
                    <div className="time-box">
                        <span className="time-number">{timeLeft.minutes}</span>
                        <span className="time-label">Mins</span>
                    </div>
                    <div className="time-box">
                        <span className="time-number">{timeLeft.seconds}</span>
                        <span className="time-label">Secs</span>
                    </div>
                </div>

                <div className="events-grid">
                    <div className="event-item full-width">
                        <h3>8:45 AM</h3>
                        <p>Groom Entrance</p>
                    </div>
                    <div className="event-item full-width">
                        <h3>10:30 AM</h3>
                        <p>Poruwa ceremony</p>
                    </div>
                    <div className="event-item full-width">
                        <h3>12:30 PM</h3>
                        <p>Lunch</p>
                    </div>
                    <div className="event-item full-width">
                        <h3>4:00 PM</h3>
                        <p>Going Down</p>
                    </div>
                </div>

                <div className="rsvp-section">
                    <p>Please bless us with your presence</p>
                    <button
                        className="gold-btn outline"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Bless the Couple
                    </button>
                </div>
            </div>
        </div>
    );
}

// Simple Particle Component for React
function Particles({ count }) {
    const particles = Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.5 + 0.1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        const style = {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: `rgba(212, 175, 55, ${opacity})`,
            borderRadius: '50%',
            left: `${startX}%`,
            top: `${startY}%`,
            boxShadow: `0 0 ${size * 2}px rgba(212, 175, 55, ${opacity})`,
            animation: `fly ${duration}s linear ${delay}s infinite`,
            opacity: 0,
        };

        return <div key={i} style={style} />;
    });

    return (
        <>
            <style>
                {`
          @keyframes fly {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: var(--opacity, 0.5); }
            90% { opacity: var(--opacity, 0.5); }
            100% { transform: translate(calc(100px - 50px), -300px); opacity: 0; }
          }
        `}
            </style>
            {particles}
        </>
    );
}
