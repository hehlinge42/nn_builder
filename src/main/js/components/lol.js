import React, { Component, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`
  },
  { field: "city", headerName: "City", width: 100 },
  { field: "state", headerName: "State", width: 100 }
];

var data = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    city: "Milwaukee",
    state: "Wisconsin"
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    city: "Dubuque",
    state: "Iowa"
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    city: "Appleton",
    state: "Wisconsin"
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    city: "Madison",
    state: "Wisconsin"
  },
  {
    id: 5,
    lastName: "Targaryenmnsdlfbsjbgjksbgksbfksfgbk",
    firstName: "Daenerys",
    age: null,
    city: "Green Bay",
    state: "Wisconsin"
  }
];

var rowsToKeep = [];
var rowsToBeDeleted = [];

class ElgibleContracts extends Component {
  //const [rows, setRows] = useState(data);
  //const [deletedRows, setDeletedRows] = useState([]);

  state = {
    data: data
  };

  /*
   * It's assumed that the user will want to delete all the rows,
   * but there will be scenarios when that's not the case.
   */
  setRowsToBeDeleted = () => {
    for (var i = 0; i < data.length; i++) {
      rowsToBeDeleted.push(data[i].id);
    }
    rowsToBeDeleted = [...new Set(rowsToBeDeleted)]; //Did this because clicking the button twice will make doubles appear for each row
  };

  /*
   * This method fires off when the checkbox is clicked for a given row.
   */
  handleRowSelection = (e) => {
    // remove it if it's already present - this means the user unchecked it
    if (rowsToKeep.includes(e.data.id)) {
      for (var i = 0; i < rowsToKeep.length; i++) {
        if (rowsToKeep[i] === e.data.id) {
          rowsToKeep.splice(i, 1);
        }
      }
    } else {
      // user clicked it - add it to the list of rows to keep.
      rowsToKeep.push(e.data.id);
    }

    this.setRowsToBeDeleted();
    console.log("Rows to Keep: " + rowsToKeep);
    //setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
    //console.log("All rows: " + rows);
  };

  /*
   * This method updates the data that's to be displayed.
   */
  handlePurge = () => {
    // Check to see what rows are to be deleted and which ones aren't.
    for (var j = 0; j < rowsToKeep.length; j++) {
      if (rowsToBeDeleted.includes(rowsToKeep[j])) {
        // delete it from 'rows to be deleted' array
        console.log("Found:" + rowsToKeep[j]);
        while (rowsToBeDeleted.indexOf(rowsToKeep[j]) !== -1) {
          rowsToBeDeleted.splice(rowsToBeDeleted.indexOf(rowsToKeep[j]), 1);
        }
      } else {
        // do nothing
      }
    }

    let data_to_be_kept = this.state.data.filter(function (item) {
      return rowsToBeDeleted.includes(item.id) === false;
    });

    console.log("Rows to Delete: " + rowsToBeDeleted);
    console.log("Rows to be kept", data_to_be_kept);

    this.setState({
      data: data_to_be_kept
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "Stone" }}>Elgible Contracts</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 380, width: 950 }}>
          <DataGrid
            rows={this.state.data}
            columns={columns}
            pageSize={10}
            checkboxSelection
            onRowSelected={this.handleRowSelection}
          />
        </div>
        <br />
        <Button
          variant="contained"
          color="primary"
          startIcon={<DeleteIcon />}
          style={{ textTransform: "none" }}
          onClick={this.handlePurge}
        >
          Purge Records
        </Button>
      </div>
    );
  }
}

export default ElgibleContracts;
