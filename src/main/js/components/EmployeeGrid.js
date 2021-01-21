import { DataGrid } from '@material-ui/data-grid';
import * as React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

class EmployeeGrid extends React.Component {

    constructor(props) {
        super(props);
        this.setSelection = this.setSelection.bind(this);
        // this.update = this.update.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.hrefs = {}
        this.selected = []
        this.columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First name', width: 130 },
            { field: 'lastName', headerName: 'Last name', width: 130 },
            { field: 'description', headerName: 'Description', width: 200 }
        ];
        
        let employeeList = [];
        let id = 1;
        for (const employee of this.props.employees) {
            this.hrefs[id] = employee.url;
            employeeList.push({
                'id': id,
                'firstName': employee.entity.firstName,
                'lastName': employee.entity.lastName,
                'description': employee.entity.description
            });
            id++;
        }
        console.log(this.hrefs)
        console.log(employeeList)
        this.state={rows: employeeList}
        console.log(this.state.rows);
    }
    setSelection(rowIds) {
        this.selected = rowIds;
    }

    handleDelete() {
        for (let id of this.selected) {
            this.props.onDelete(this.hrefs[id]);
        }
        this.setState(this.state);
    }

    render() {
        console.log("Renders called employee grid");

        return (
            <div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.rows} 
                                columns={this.columns}
                                pageSize={this.props.pageSize}
                                checkboxSelection 
                                onSelectionChange={(newSelection) => {
                                    this.setSelection(newSelection.rowIds);
                                }}/>
                </div>
                <div>
                    <Button variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={this.handleDelete}>
                                Delete
                    </Button>
                </div>
            </div>   
        )
    }
}

export default EmployeeGrid;