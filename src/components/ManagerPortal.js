import React from 'react';
import {FiCheck, FiMail} from 'react-icons/fi';
import '../styles/ManagerPortal.scss';
import NavBar from "./NavBar"; // Import the SCSS file

const ManagerPortal = (isUserPortal) => {
    const progressData = [
        { title: 'Orientation', percentage: 80 },
        { title: 'Weekly Tasks', percentage: 65 },
        // Add more progress bars as needed
    ];

    const questions = [
        { question: 'Are all orientation materials up to date?', fellow: 'John Doe' },
        { question: 'Is there any support needed for the weekly task?', fellow: 'Jane Smith' },
        // Add more questions as needed
    ];

    return (
        <div>
            <div className="summary-page">
                <h1>Summary Page</h1>
                <p>Number of Fellows you manage: 70</p>
                <div className="grid-container">
                    {progressData.map((progress, index) => (
                        <div className="grid-item" key={index}>
                            <h3>{progress.title}</h3>
                            <div className="progress-bar">
                                <div className="progress" style={{width: `${progress.percentage}%`}}></div>
                            </div>
                            <p>{progress.percentage}%</p>
                        </div>
                    ))}
                </div>
                <div className="manager-questions">
                    <h2>Questions Needed to Address</h2>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index}>
                                <span className="fellow-name">{question.fellow}: </span>
                                {question.question}
                                <a href={`mailto:${question.email}`} className="email-icon"><FiMail className="icon"/></a>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ManagerPortal;
