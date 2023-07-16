import React, {useState, useEffect} from "react";
import {Autocomplete, TextField, Grid, getTableSortLabelUtilityClass} from "@mui/material";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


import conditionList from "./data/condition.json";
import config from "../config.json";

export default function ComparisonPage() {
    const [condition, setCondition] = useState(null);
    const [drugs, setDrugs] = useState([]);

    const [drugA, setDrugA] = useState('');
    const [drugB, setDrugB] = useState('');
    const [drugATableData, setDrugATableData] = useState(null);
    const [drugBTableData, setDrugBTableData] = useState(null);

    useEffect(() => {
        if (condition) {
            console.log(condition['Conditions']);
            let c = condition['Conditions'];
            fetch(`http://${config.server_host}:${config.server_port}/drugOfCondition/${c}`)
                .then(res => res.json())
                .then(resJson => {
                    setDrugs(resJson);
                });
        }
    }, [condition]);

    useEffect(() => {
        if (drugA) {
            console.log(drugA);
            fetch(`http://${config.server_host}:${config.server_port}/drug/${drugA}`)
                .then(res => res.json())
                .then(resJson => {
                    setDrugATableData(resJson);
                });
        }
    }, [drugA]);

    useEffect(() => {
        if (drugB) {
            fetch(`http://${config.server_host}:${config.server_port}/drug/${drugB}`)
                .then(res => res.json())
                .then(resJson => {
                    setDrugBTableData(resJson);
                });
        }
    }, [drugB]);

    useEffect(() => {
        setDrugs([]);
        setDrugBTableData(null);
        setDrugATableData(null);
    }, [condition]);


    return (
        <div style={{padding: "50px"}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <h2>For the condition, please select two drugs to compare</h2>

                    <Autocomplete
                        disablePortal
                        options={conditionList}
                        getOptionLabel={(option) => option.Conditions}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Condition"/>
                        )}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.id && newValue.Conditions) {
                                setCondition(newValue);
                            }
                        }}
                    />
                </Grid>

                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} md={6}>
                        {Array.isArray(drugs) && drugs.length > 0 && (
                            <Autocomplete
                                options={drugs}
                                getOptionLabel={(option) => `${option.DrugName}`}
                                renderInput={(params) => <TextField {...params} label="Select Drug A"/>}
                                isOptionEqualToValue={(option, value) => {
                                    return option.DrugName === value.DrugName
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue && newValue.DrugName) {
                                        setDrugA(newValue.DrugName);
                                    }
                                }}
                            />)
                        }
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {Array.isArray(drugs) && drugs.length > 0 &&
                            <Autocomplete
                                options={drugs}
                                getOptionLabel={(option) => `${option.DrugName}`}
                                renderInput={(params) => <TextField {...params} label="Select Drug B"/>}
                                isOptionEqualToValue={(option, value) => {
                                    return option.DrugName === value.DrugName
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue && newValue.DrugName) {
                                        setDrugB(newValue.DrugName);
                                    }
                                }}
                            />
                        }
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} md={6}>
                        {drugATableData && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><b>Marketing Status</b></TableCell>
                                        <TableCell>{drugATableData['MarketingStatusDescription']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Active Ingredient</b></TableCell>
                                        <TableCell>{drugATableData['ActiveIngredient']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Average Rating (out of 10)</b></TableCell>
                                        <TableCell>{drugATableData['AverageRating']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Number of Ratings</b></TableCell>
                                        <TableCell>{drugATableData['NumberOfRatings']}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {drugBTableData && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><b>Marketing Status</b></TableCell>
                                        <TableCell>{drugBTableData['MarketingStatusDescription']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Active Ingredient</b></TableCell>
                                        <TableCell>{drugBTableData['ActiveIngredient']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Average Rating (out of 10)</b></TableCell>
                                        <TableCell>{drugBTableData['AverageRating']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><b>Number of Ratings</b></TableCell>
                                        <TableCell>{drugBTableData['NumberOfRatings']}</TableCell>
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
