import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  Container,
  Link,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MuiTableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import conditionList from "./data/condition.json";
const data = require("./data/data.json");
const config = require("../config.json");

export default function AdvancedPage() {
  const [condition, setCondition] = useState(null);
  const [drugs, setDrugs] = useState(data);

  const infoFields = [
    { key: "ApplNo", keyDesc: "Application #" },
    { key: "ProductNo", keyDesc: "Product #" },
    { key: "Form", keyDesc: "Form" },
    { key: "Strength", keyDesc: "Strength" },
    { key: "DrugName", keyDesc: "Drug Name" },
    { key: "ActiveIngredient", keyDesc: "Active Ingredient" },
  ];

  const TableCell = styled(MuiTableCell)`
    :last-of-type {
      width: 100;
      max-width: 100;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  useEffect(() => {
    if (condition) {
      console.log(condition["Conditions"]);
      let c = condition["Conditions"];
      fetch(
        `http://${config.server_host}:${config.server_port}/complex/twoconditions/${c}`
      )
        .then((res) => res.json())
        .then((resJson) => {
          setDrugs(resJson);
        });
    } else {
      setDrugs(data);
    }
  }, [condition]);

  const drugData = data;

  return (
    <Container>
      <h1 style={{ fontSize: 50 }}>Drug Ratings on Different Conditions</h1>
      <p>
        {" "}
        This table shows a list of drugs that can be used to treat multiple
        conditions, the conditions these drugs are treating, and the average
        rating of the drug when reviewed for a specific condition. In addition,
        you can specify a condition to look for.{" "}
      </p>
      <h2>Please select a condition</h2>
      <Autocomplete
        disablePortal
        options={conditionList}
        getOptionLabel={(option) => option.Conditions}
        renderInput={(params) => (
          <TextField {...params} label="Select Condition" />
        )}
        onChange={(event, newValue) => {
          if (newValue && newValue.id && newValue.Conditions) {
            setCondition(newValue);
          }
        }}
      />

      {!condition ? (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell key="Name">Name</TableCell>
                <TableCell key="Condition">Condition</TableCell>
                <TableCell key="AvgConditionRating">
                Avg. Condition Rating
                </TableCell>
                <TableCell key="NumRatings">Number of Ratings</TableCell>
                <TableCell key="AvgDrugRating">Avg. Drug Rating</TableCell>
                <TableCell key="Availability">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drugs.map((row, idx) => (
                <TableRow key={row.DrugName}>
                  <TableCell key="Name">
                    <Link href={`/drug/${row.DrugName}`}>{row.DrugName}</Link>
                  </TableCell>
                  <TableCell key="Condition">{row.Conditions}</TableCell>
                  <TableCell key="AvgConditionRating">
                    {row.AvgConditionRating}
                  </TableCell>
                  <TableCell key="NumRatings">{row.NumRatings}</TableCell>
                  <TableCell key="AvgDrugRating">{row.AvgDrugRating}</TableCell>
                  <TableCell key="Availability">
                    {row.MarketingDescription}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : drugs && drugs.length > 0 ? (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell key="Name">Name</TableCell>
                <TableCell key="Condition">Condition</TableCell>
                <TableCell key="AvgConditionRating">
                  Avg. Condition Rating
                </TableCell>
                <TableCell key="NumRatings">Number of Ratings</TableCell>
                <TableCell key="AvgDrugRating">Avg. Drug Rating</TableCell>
                <TableCell key="Availability">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drugs.map((row, idx) => (
                <TableRow key={row.DrugName}>
                  <TableCell key="Name">
                    <Link href={`/drug/${row.DrugName}`}>{row.DrugName}</Link>
                  </TableCell>
                  <TableCell key="Condition">{row.Conditions}</TableCell>
                  <TableCell key="AvgConditionRating">
                    {row.AvgConditionRating}
                  </TableCell>
                  <TableCell key="NumRatings">{row.NumRatings}</TableCell>
                  <TableCell key="AvgDrugRating">{row.AvgDrugRating}</TableCell>
                  <TableCell key="Availability">
                    {row.MarketingDescription}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2> No Drugs Found. </h2>
      )}
    </Container>
  );
}
