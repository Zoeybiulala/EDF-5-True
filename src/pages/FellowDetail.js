import React, {useState} from 'react';
import {FiCheck, FiMail} from 'react-icons/fi';
import '../styles/FellowDetail.scss';
import NavBar from "../components/NavBar"; // Import the SCSS file

const FellowDetail = () => {
    const [selectedFellow, setSelectedFellow] = useState(null);

    const fellows = [
        {id: 1, name: 'John Doe', progress: ['Task 1', 'Task 2', 'Task 3'], completedTasks: ['Task 1']},
        {id: 2, name: 'Jane Smith', progress: ['Task 1', 'Task 2', 'Task 3'], completedTasks: ['Task 1', 'Task 2']},
        // Add more fellows as needed
    ];

    const handleFellowSelect = (fellow) => {
        setSelectedFellow(fellow);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredFellows = fellows.filter((fellow) =>
        fellow.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div><NavBar isUserPortal={true}/>
            <div className="fellow-detail-page">
                <div className="fellow-selection">
                    <h2>Fellow Selection</h2>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search fellows"
                    />
                    <ul>
                        {filteredFellows.map((fellow) => (
                            <li
                                key={fellow.id}
                                className={selectedFellow === fellow ? 'selected' : ''}
                                onClick={() => handleFellowSelect(fellow)}
                            >
                                {fellow.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {/*<div className="fellow-selection">*/}
                {/*    <h2>Fellow Selection</h2>*/}
                {/*    <ul>*/}
                {/*        {fellows.map((fellow) => (*/}
                {/*            <li*/}
                {/*                key={fellow.id}*/}
                {/*                className={selectedFellow === fellow ? 'selected' : ''}*/}
                {/*                onClick={() => handleFellowSelect(fellow)}*/}
                {/*            >*/}
                {/*                {fellow.name}*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <div className="fellow-progress">
                    {selectedFellow ? (
                        <>
                            <h2>{selectedFellow.name}'s Progress</h2>
                            <ul>
                                {selectedFellow.progress.map((task, index) => (
                                    <li key={index}>
                                        {selectedFellow.completedTasks.includes(task) ? (
                                            <>
                                                <FiCheck className="icon check-icon"/>
                                                {task}
                                            </>
                                        ) : (
                                            <>
                                                {/*<a href={`mailto:fakeemail@gmail.com`}> <FiMail*/}
                                                {/*    className="icon email-icon"/></a>*/}
                                                <a href={`mailto:recipient@example.com?subject=Task%20Uncompleted&body=Example%20Message`}><FiMail
                                                    className="icon email-icon"/></a>
                                                {task}
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>Select a fellow to view progress</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FellowDetail;
