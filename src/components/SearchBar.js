import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment } from "@mui/material";
import conditionList from "../pages/data/condition.json";
import drugNameList from "../pages/data/drugNames.json";

function SearchBar() {
  const navigate = useNavigate();
  const [conditionOptions, setConditionOptions] = React.useState([]);
  const [nameOptions, setNameOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState();
  const [selectedSearchByCond, setSelectedSearchByCond] = React.useState(true); // default search by condition, if this is false then search by name

  const fetchConditionOptions = async () => {
    const res = [];
    conditionList.forEach(elem => {
      if (elem.Conditions != null) res.push(elem.Conditions);
    });
    
    setConditionOptions(res);
  };

  const fetchNameOptions = async () => {
    const res = [];
    drugNameList.forEach(elem => {
      if (elem.DrugName != null) res.push(elem.DrugName);
    });

    setNameOptions(res);
  };

  React.useEffect(() => {
    fetchConditionOptions();
    fetchNameOptions();
  }, []);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      if (!selectedOption) {
        alert("Please select a search option.");
      } else if (selectedSearchByCond) {
        navigate(
          `/search-result/condition/${selectedOption}`
        );
      } else if (!selectedSearchByCond) {
        navigate(
          `/drug/${selectedOption}`
        );
      } else {
        navigate(`/error`);
      }
    }
  }

  const handleButtonClick = (isSearchByCond) => {
    setSelectedSearchByCond(isSearchByCond);
  };


  return (
    <Grid container>
      <Grid item xs={12}>
        <Autocomplete
          id="search-bar"
          freeSolo
          options={selectedSearchByCond ? conditionOptions : nameOptions}
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Search for a ${selectedSearchByCond ? "condition" : "drug name"}`}
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onKeyUp={handleKeyPress.bind(this)}
            />
          )}
          sx={{ flexGrow: 1 }}
          onChange={(event, selectedOption) =>
            setSelectedOption(selectedOption)
          }
        />
      </Grid>
      <Grid item>
        <Button
          variant={selectedSearchByCond ? "contained" : "outlined"}
          style={{
            backgroundColor: selectedSearchByCond ? "#64B5F6" : undefined,
            marginTop: "16px",
            marginRight: "200px",
            marginLeft: "250px",
          }}
          onClick={() => handleButtonClick(true)}
        >
          Condition
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant={!selectedSearchByCond ? "contained" : "outlined"}
          style={{
            backgroundColor: !selectedSearchByCond ? "#64B5F6" : undefined,
            marginTop: "16px",
          }}
          onClick={() => handleButtonClick(false)}
        >
          Drug Name
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
