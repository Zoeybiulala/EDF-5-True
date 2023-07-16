import React, {useEffect, useState} from 'react';
import '../styles/FAQPage.scss';
import NavBar from "../components/NavBar"; // Import the SCSS file

const FAQPage = () => {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.innerHTML = `
      window.GPTTConfig = {
        uuid: "94c85b4c70ee4816afec1434898d3168"
      };
    `;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://app.gpt-trainer.com/widget-asset.js';
        script2.defer = true;
        document.body.appendChild(script2);
    }, []);

    const faqs = [
        {"question" : "Which organizations will be participating?", "answer" : "Companies, cities, universities and nonprofits of any size, located anywhere throughout the United States, can hire an Climate Corps fellow. A list of current year host organizations will be available to candidates during the interview process and fellows are matched with host organizations based on their location, industry and project type preferences."},
        {"question" : "How many hosts and fellows participate each summer?", "answer" : "In 2022, we placed 210 fellows within 154 organizations in the US, China, and India. The number changes each year and depends on the number of organizations participating in the program."},
        {"question" : "Can students apply to a specific organization?", "answer" : "Applicants cannot apply to a specific organization, but a list of 2023 host organizations and projects will be available to candidates after the interview process. Applicants will be able to indicate their preferences for organization, project, location and sector. Fellows are matched on relevant experience, host organization needs and applicant preferences."},
        {"question" : "Can international students apply?", "answer" : "We welcome applications from anyone who fits the program criteria. For US fellowships, candidates must be eligible to work in the United States during the summer. If you are an international student, please make it clear on your application that you are eligible to work in the United States. For China fellowships, candidates must be Chinese citizens or nationals from other countries who are currently registered in a Chinese university. For India fellowships, candidates must be Indian citizens or nationals from other countries who are currently registered in an Indian university."},
        {"question" : "Do students have to have a certain graduate degree to apply?", "answer" : "We welcome applications from all graduate degree and graduate certificate program students who meet the Climate Corps qualifications."},
        {"question" : "How long is the fellowship?", "answer" : "Climate Corps fellowships are 10-12 weeks between June and September, plus 1 week for Climate Corps Fellow Training. Fellow Training will take place in late May and will be hosted virtually on Zoom with in-person regional meetups. The exact weeks for the fellowship will depend on the host’s and fellow’s schedules."}
    ];

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggle = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div>
            <NavBar isUserPortal={false}/>

            <div className="faq-page">
                <h1>Frequently Asked Questions</h1>
                <ul>
                    {faqs.map((faq, index) => (
                        <li
                            key={index}
                            className={expandedIndex === index ? 'expanded' : ''}
                        >
                            <h3 onClick={() => handleToggle(index)}>{faq.question}</h3>
                            <p>{faq.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FAQPage;
