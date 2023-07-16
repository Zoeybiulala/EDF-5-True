import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import '../styles/NameCard.scss';
import '../styles/HomePage.scss';
import LandingTabs from "../components/LandingTabs";
import UserPortal from "../components/UserPortal";
import ManagerPortal from "../components/ManagerPortal";
import NavBar from "../components/NavBar";





export default function HomePage() {
  const [showInfo, setShowInfo] = useState(true);

  const availability = ['Monday','Tuesday','Wednesday','Friday'];
    const managerInfo = {
        photo: 'img_1.png',
        name: 'Alice',
        title: 'Engagement Management',
        contactInfo: {email: 'fakeemail@gmail.com', phone: '123123'},
        availability
    };
    const value = 25;
    const maxValue = 100;

    const [isUserPortal, setIsUserPortal] = useState(true);

    const handlePortalSwitch = () => {
        setIsUserPortal(!isUserPortal);
    };

    return (
        <div>
            <NavBar isUserPortal={isUserPortal}/>
            <div className="portal-switch">
                <button
                    className={`switch-button ${!isUserPortal ? 'active' : ''}`}
                    onClick={handlePortalSwitch}
                >
                    User Portal
                </button>
                <button
                    className={`switch-button ${isUserPortal ? 'active' : ''}`}
                    onClick={handlePortalSwitch}
                >
                    Manager Portal
                </button>
            </div>
            {isUserPortal ?  <ManagerPortal isUserPortal={isUserPortal}/> : <UserPortal />}
      </div>


  );
};