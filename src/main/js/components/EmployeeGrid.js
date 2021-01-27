import { DataGrid } from '@material-ui/data-grid';
import * as React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

class EmployeeGrid extends React.Component {

    constructor(props) {
        console.log("CONSTRUCTOR OF EMPLOYEE GRID")
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.createEmployeeList = this.createEmployeeList.bind(this);
        this.hrefs = {}
        this.columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First name', width: 130 },
            { field: 'lastName', headerName: 'Last name', width: 130 },
            { field: 'description', headerName: 'Description', width: 200 }
        ];
        
        let employeeList = this.createEmployeeList();
        this.state={rows: employeeList,
                    selected: [],
                    nbRender: 1
            }
        console.log(this.state.rows);
    }

    createEmployeeList() {
        let employeeList = [];
        let id = 1;
        for (const employee of this.props.employees) {
            this.hrefs[id] = employee.url;
            employeeList.push({
                id: id,
                firstName: employee.entity.firstName,
                lastName: employee.entity.lastName,
                description: employee.entity.description
            });
            id++;
        }
        console.log(employeeList)
        return employeeList;
    }

    componentDidUpdate() {
        console.log("COMPONENT DID UPDATE OU PAS BORDEL");
    }

    handleDelete() {
        let localSelected = this.state.selected;
        let dataToBeKept = this.state.rows.filter(function (item) {
            return !(localSelected.includes(String(item.id)))
        })
        for (let id of this.state.selected) {
            this.props.onDelete(this.hrefs[id]); //delete from database
        }
        this.setState({
            rows: dataToBeKept,
            selected: [],
        })
    }

    render() {
        console.log("RERENDER EMPLOYEE GRID")
        const employeeList = this.createEmployeeList()
        console.log(employeeList)
        return (
            <div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid id={this.state.nbRender}
                                rows={employeeList} 
                                columns={this.columns}
                                pageSize={this.props.pageSize}
                                checkboxSelection 
                                onSelectionChange={(newSelection) => {
                                    this.setState({selected: newSelection.rowIds})
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