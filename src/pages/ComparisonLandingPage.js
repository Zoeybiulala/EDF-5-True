import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

export default function ComparisonLandingPage() {
    return (
        <div style={{ padding: "50px" }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Here are the choices for you to compare two drugs
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} align="center">
                    <h3>If you have a condition in mind</h3>
                    <Button variant="contained" color="primary" size="large" style={{backgroundColor: '#2196F3'}} component={Link} to="/comparison/withCondition">
                        Compare by a given condition
                    </Button>
                </Grid>
                <Grid item xs={12} md={4} align="center">
                    <h3>If you have an active ingredient in mind</h3>
                    <Button variant="contained" color="primary" size="large" style={{backgroundColor: '#2196F3'}} component={Link} to="/comparison/withAI">
                        compare By a given active ingredient
                    </Button>
                </Grid>
                <Grid item xs={12} md={4} align="center">
                    <h3>If you have a drug in mind</h3>
                    <Button variant="contained" color="primary" size="large" style={{backgroundColor: '#2196F3'}} component={Link} to="/comparison/withoutCondition">
                        compare By a given drug
                    </Button>
                </Grid>

            </Grid>
        </div>
    );
}
