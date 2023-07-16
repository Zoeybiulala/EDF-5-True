import { useState } from "react";
import {
  Container,
  Link,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const data = require("./data/otc.json");

export default function OTCPrescription() {
  const columns = [
    { id: "Conditions", label: "Condition", minWidth: 170 },
    {
      id: "AvgOTCRating",
      label: "Avg. OTC Rating",
      minWidth: 100,
      align: "center",
    },
    {
      id: "AvgPrescriptionRating",
      label: "Avg. Prescription Rating",
      minWidth: 170,
      align: "center",
    },
    {
      id: "OTCDrugs",
      label: "OTC Drugs",
      minWidth: 170,
      align: "left",
    },
    {
      id: "PrescriptionDrugs",
      label: "Prescription Drugs",
      minWidth: 170,
      maxWidth: 200,
    },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Container>
      <h1 style={{ fontSize: 50 }}>
        Conditions with OTC and Prescription Drugs
      </h1>
      <p>
        {" "}
        This table shows conditions where OTC and prescription drugs are
        available, and shows a list of the otc and prescription drugs available
        to treat a condition, as well as their average ratings.{" "}
      </p>

      <TableContainer maxWidth="500px">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "Conditions" ? (
                            <Link href={`/search-result/condition/${value}`}>
                              {" "}
                              {value}
                            </Link>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
