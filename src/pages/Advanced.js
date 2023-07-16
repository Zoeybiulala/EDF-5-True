import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const config = require('../config.json');


export default function Advanced() {

    return (
        <Container>
          <h1 style={{ fontSize: 64 }}>Advanced Analytics</h1>
            <h2><Link href="/advancedpage">Drug Ratings on Different Conditions</Link></h2>
          <h2> <Link href="/otcandp">Conditions with OTC and Prescription Drugs</Link></h2>
      </Container>
        
      );
}