import {
    Autocomplete,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import React, {useState, useEffect} from "react";
import drugNames from "./data/drugNames.json";
import config from "../config.json";

export default function ComparisonWithoutPage() {
    const [compareDrug, setCompareDrug] = useState([]);
    const [drugB, setDrugB] = useState('');
    const [drugATableData, setDrugATableData] = useState(null);
    const [drugBTableData, setDrugBTableData] = useState(null);
    const [sameConditionDrugs, setSameConditionDrugs] = useState(null);
    useEffect(() => {
        if (compareDrug) {
            fetch(`http://${config.server_host}:${config.server_port}/sameConditionDrugs/${compareDrug}`)
                .then(res => res.json())
                .then(resJson => {
                    setSameConditionDrugs(resJson);
                });
        }
    }, [compareDrug]);

    useEffect(() => {
        if (compareDrug) {
            fetch(`http://${config.server_host}:${config.server_port}/drug/${compareDrug}`)
                .then(res => res.json())
                .then(resJson => {
                    setDrugATableData(resJson);
                });
        }
    }, [compareDrug]);

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
        setSameConditionDrugs([]);
        setDrugBTableData(null);
    }, [compareDrug]);
    return (
        <div style={{padding: "100px"}}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6} style={{padding: "100px"}}>

                    <Autocomplete
                        options={drugNames}
                        getOptionLabel={(option) => `${option.DrugName}`}
                        renderInput={(params) => <TextField {...params} label="Select a Drug to Compare"/>}
                        isOptionEqualToValue={(option, value) => {
                            return option.DrugName === value.DrugName
                        }}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.DrugName) {
                                setCompareDrug(newValue.DrugName);
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {sameConditionDrugs && sameConditionDrugs.length > 0 ? (
                        <>
                            <h2>Choose from the following list of drugs that treat the same condition
                                as {compareDrug}</h2>
                            <Autocomplete
                                options={sameConditionDrugs}
                                getOptionLabel={(option) => `${option.DrugName}`}
                                renderInput={(params) => <TextField {...params} label="Select Drug B"/>}
                                isOptionEqualToValue={(option, value) => {
                                    return option.DrugName === value.DrugName;
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue && newValue.DrugName) {
                                        setDrugB(newValue.DrugName);
                                    }
                                }}
                            />
                        </>
                    ) : (
                        compareDrug.length > 0  && <h2>There are no drugs that treat the same condition as {compareDrug}</h2>
                    )}
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
        </div>
    )

}