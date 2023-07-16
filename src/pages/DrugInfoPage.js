import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

const config = require('../config.json');

export default function DrugInfoPage() {
    const {drugName} = useParams();
    const [drugData, setDrugData] = useState(null);
    const [drugReviews, setDrugReviews] = useState(null);
    const infoFields = [
        {key: "DrugName", keyDesc: "Drug Name"},
        {key: "MarketingStatusDescription", keyDesc: "Marketing Status"},
        {key: "ActiveIngredient", keyDesc: "Active Ingredient"},
        {key: "AverageRating", keyDesc: "Average Rating"},
        {key: "NumberOfRatings", keyDesc: "Number of Ratings"},
    ];

    const infoFieldsReview = [
        {key: "Id", keyDesc: "ID", width: '10%'},
        {key: "Review", keyDesc: "Review", width: '60%'},
        {key: "Rating", keyDesc: "Rating", width: '10%'},
        {key: "Date", keyDesc: "Date", width:'10%'},
        {key: "UsefulCount", keyDesc: "Useful Count",width: '10%'}
    ];


    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/drug/${drugName}`)
            .then(res => res.json())
            .then(resJson => setDrugData(resJson));
        fetch(`http://${config.server_host}:${config.server_port}/reviewsOf/${drugName}`)
            .then(res => res.json())
            .then(resJson => {
                setDrugReviews(resJson);
            });
    }, []);


    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {infoFields.map((field) => (
                                <TableCell key={field.key} align="center">
                                    <b>{field.keyDesc}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {infoFields.map((field) => {
                                const infoKey = field.key;
                                return (
                                    <TableCell key={field.key} align="center">
                                        {drugData ? drugData[infoKey] : '-'}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {(drugReviews && drugReviews.length > 0 ? (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {infoFieldsReview.map((field) => (
                                <TableCell key={field.key} align="center" style={{width :field.width}}>
                                    <b>{field.keyDesc}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(drugReviews) && drugReviews.length >0 ? (
                            drugReviews.map((review) => (
                                <TableRow key={review.id}>
                                    {infoFieldsReview.map((field) => {
                                        const infoKey = field.key;
                                        return (
                                            <TableCell key={field.key} align={field.narrow ? "right" : "center"}>
                                                {review[infoKey]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : null}

                    </TableBody>
                </Table>
            </TableContainer>
            ) : <div>
                <br/><h2>  no reviews available for the drug</h2>
            </div>)}
        </div>


    );
}