import React from 'react';
import '../styles/NameCard.scss';

const NameCard = ({ manager }) => {
    const { photo, name, title, contactInfo, availability } = manager;

    const handleScheduleMeeting = () => {
        // could be something linked with calendly
        console.log(`Scheduling a meeting with ${name}`);
    };

    return (
        <div>
        <h2>Meet your Manager!</h2>
        <div className="name-card">
            <div className="photo">
                <img src={photo} alt={name} />
            </div>
            <div className="details">
                <h2>{name}</h2>
                <p>{title}</p>
                <ul className="contact-info">
                    <li>Email: {contactInfo.email}</li>
                    <li>Phone: {contactInfo.phone}</li>
                </ul>
                <div className="availability">
                    <p>Meeting Availability:</p>
                    <ul>
                        {availability.map((timeSlot) => (
                            <li key={timeSlot}>{timeSlot}</li>
                        ))}
                    </ul>
                </div>
                <a href="#" className="meeting" onClick={handleScheduleMeeting}>
                    Schedule a Meeting
                </a>
            </div>
        </div>
        </div>
    );
};

export default NameCard;
