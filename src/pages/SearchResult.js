import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  Typography,
  Container,
  FormControlLabel,
  Switch,
  Slider,
  Grid,
} from "@mui/material";
import LazyTable from "../components/LazyTable";
import TableSearchResult from "../components/TableSearchResult";

function SearchResult() {
  const { searchType, searchTerm } = useParams();
  const config = require("../config.json");

  const [avgRating, setAvgRating] = useState([0, 10]);
  const [avgUsefulCount, setAvgUsefulCount] = useState([0, 100]);
  const [prescription, setPrescription] = useState(false);
  const [otc, setOtc] = useState(false);
  const [searchRoute, setSearchRoute] = useState(
    `http://${config.server_host}:${config.server_port}/search_by_condition/${searchTerm}/${avgRating[0]}/${avgRating[1]}/${avgUsefulCount[0]}/${avgUsefulCount[1]}`
  );

  const resultCols = [
    {
      field: "DrugName",
      headerName: "Drug Name",
      renderCell: (row) => (
        <NavLink to={`/drug/${row.DrugName}`}>{row.DrugName}</NavLink>
      ),
    },
    {
      field: "AverageRating",
      headerName: "Average Rating",
    },
    {
      field: "AverageUsefulCount",
      headerName: "Average Useful Count",
    },
  ];

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.checked);
  };

  const handleOtcChange = (event) => {
    setOtc(event.target.checked);
  };

  useEffect(() => {
    if (prescription === true) {
      setOtc(false);
    }
  }, [prescription]);

  useEffect(() => {
    if (otc === true) {
      setPrescription(false);
    }
  }, [otc]);

  useEffect(() => {
    if (prescription === true) {
      setSearchRoute(
        `http://${config.server_host}:${config.server_port}/search_by_condition/prescription/${searchTerm}/${avgRating[0]}/${avgRating[1]}/${avgUsefulCount[0]}/${avgUsefulCount[1]}`
      );
    } else if (otc === true) {
      setSearchRoute(
        `http://${config.server_host}:${config.server_port}/search_by_condition/overcounter/${searchTerm}/${avgRating[0]}/${avgRating[1]}/${avgUsefulCount[0]}/${avgUsefulCount[1]}`
      );
    } else if (prescription === false && otc === false) {
      setSearchRoute(
        `http://${config.server_host}:${config.server_port}/search_by_condition/${searchTerm}/${avgRating[0]}/${avgRating[1]}/${avgUsefulCount[0]}/${avgUsefulCount[1]}`
      );
    }
  }, [otc, prescription, avgRating, avgUsefulCount]);


  return (
    <div>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Search result for: {searchTerm}
        </Typography>
        <Typography sx={{ marginTop: "16px" }} variant="h5">
          Filters
        </Typography>
        <FormControlLabel
          sx={{ marginBottom: "16px" }}
          control={
            <Switch
              checked={prescription}
              onChange={handlePrescriptionChange}
            />
          }
          label="Prescription"
        />
        <FormControlLabel
          sx={{ marginBottom: "16px" }}
          control={<Switch checked={otc} onChange={handleOtcChange} />}
          label="Over The Counter"
        />
        <Grid container>
          <Grid item xs={5}>
            <Typography gutterBottom>Average Rating</Typography>
            <Slider
              sx={{ width: 300 }}
              defaultValue={avgRating}
              values={avgRating}
              min={0}
              max={10}
              step={0.01}
              onChange={(e, newValue) => setAvgRating(newValue)}
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={7}>
            <Typography gutterBottom>Average Useful Count</Typography>
            <Slider
              sx={{ width: 500 }}
              defaultValue={avgUsefulCount}
              values={avgUsefulCount}
              min={0}
              max={100}
              step={0.1}
              onChange={(e, newValue) => setAvgUsefulCount(newValue)}
              marks={[
                { value: 0, label: "0" },
                { value: 50, label: "50" },
                
                { value: 100, label: "100" },
              ]}
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
        <TableSearchResult route={searchRoute} columns={resultCols} />
      </Container>
    </div>
  );
}

export default SearchResult;
