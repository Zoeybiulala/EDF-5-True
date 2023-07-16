// import { AppBar, Container, Toolbar, Typography } from '@mui/material'
// import { NavLink } from 'react-router-dom';
//
// // The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// // helper component NavText local to the file is defined to prevent repeated code.
// const NavText = ({ href, text, isMain }) => {
//   return (
//     <Typography
//       variant={isMain ? 'h5' : 'h7'}
//       noWrap
//       style={{
//         marginRight: '30px',
//         fontFamily: 'monospace',
//         fontWeight: 700,
//         letterSpacing: '.3rem',
//       }}
//     >
//       <NavLink
//         to={href}
//         style={{
//           color: 'inherit',
//           textDecoration: 'none',
//         }}
//       >
//         {text}
//       </NavLink>
//     </Typography>
//   )
// }
// export default function NavBar() {
//   return (
//     <AppBar position='static' style={{backgroundColor: '#2196F3'}}>
//       <Container maxWidth='xl'>
//         <Toolbar disableGutters>
//             <NavText href='/' text='EMPortal' isMain/>
//             <NavText href='/faqs' text='FAQs'/>
//             <NavText href='/fellowDetail' text='Fellow Detail'/>
//             {/*<NavText href='/international student' text='International' />*/}
//             {/*<NavText href='/host' text='HostCompany' />*/}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.scss';

const NavBar = ({ isUserPortal }) => {
    const navItems = isUserPortal
        ? [
            { path: '/', label:'EMPortal' },
            { path: '/fellowDetail', label: 'Fellow Detail' }
        ]
        : [
            { path: '/', label: 'EMPortal' },
            { path: '/faqs', label: 'FAQs' }
        ];

    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {navItems.map((item, index) => (
                    <li key={index} className="navbar__item">
                        <Link to={item.path} className="navbar__link">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;