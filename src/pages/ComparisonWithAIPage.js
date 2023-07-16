import React, {useState, useEffect} from "react";
import {Autocomplete, TextField, Grid} from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@mui/material';

import config from "../config.json";

export default function ComparisonWithAIPage() {
    const [AI, setAI] = useState(null);
    const [data, setData] = useState(null);

    const optionList = [
        { name: "ADAPALENE", id: 1 },
        { name: "ACETAMINOPHEN", id: 2 },
        { name: "IBUPROFEN", id: 3 },
        { name: "LORATADINE", id: 4 },
        { name: "TERBINAFINE HYDROCHLORIDE", id: 5 },
        { name: "LEVONORGESTREL", id: 6 },
    ];

    useEffect(() => {
        if (AI) {
            fetch(`http://${config.server_host}:${config.server_port}/compare_by_active/${AI}`)
                .then(res => res.json())
                .then(resJson => {
                    console.log(resJson[0]['Drug1']);
                    setData(resJson[0]);
                });
        }
    }, [AI]);

    // useEffect(() => {
    //     // setDrugs([]);
    //     // setDrugBTableData(null);
    //     // setDrugATableData(null);
    // }, [AI]);


    return (
        <div style={{padding: "50px"}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        disablePortal
                        options={optionList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Active Ingredient"/>
                        )}
                        isOptionEqualToValue={(option, value) => {
                            return option.name === value.name;
                        }}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.name) {
                                console.log(newValue.name);
                                setAI(newValue.name);
                            }
                        }}
                    />
                </Grid>

                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} md={6}>
                        {AI && data && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><b>DrugA Name</b></TableCell>
                                            <TableCell>{data['Drug1']}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>DrugA Reviews</b></TableCell>
                                            <TableCell>{data['Reviews1']}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Average Rating (out of 10)</b></TableCell>
                                            <TableCell>{data['AverageRating1']}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Marketing Status</b></TableCell>
                                            <TableCell>{data['Marketed1']}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {AI && data && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><b>DrugB Name</b></TableCell>
                                            <TableCell>{data['Drug2']}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>DrugA Reviews</b></TableCell>
                                            <TableCell>{data['Reviews2']}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Average Rating (out of 10)</b></TableCell>
                                            <TableCell>{data['AverageRating2']}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><b>Marketing Status</b></TableCell>
                                            <TableCell>{data['Marketed2']}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );


}
