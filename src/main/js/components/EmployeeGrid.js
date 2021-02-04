import { DataGrid, CellParams, GridApi, ColDef } from '@material-ui/data-grid';

import * as React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormDialogUpdate from './FormDialogUpdate';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


class EmployeeGrid extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.createEmployeeList = this.createEmployeeList.bind(this);
        this.hrefs = {}
        this.columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First name', width: 130 },
            { field: 'lastName', headerName: 'Last name', width: 130 },
            { field: 'description', headerName: 'Description', width: 200 },
            {
              field: 'update',
              headerName: 'Update',
                renderCell: (params) => {
                    const handleUpdate = () => {
                        const api = params.api;
                        const fields = api
                            .getAllColumns()
                            .map((c) => c.field)
                            .filter((c) => c !== "__check__" && !!c);
                        const thisRow = {};
                        fields.forEach((f) => {
                            thisRow[f] = params.getValue(f);
                        });
                        this.child.setState({
                            firstName: thisRow.firstName,
                            lastName: thisRow.lastName,
                            description: thisRow.description,
                            employee: this.props.employees[thisRow.id -1],
                            open: true})
                    }
                    return <IconButton aria-label="delete" color="primary" onClick={handleUpdate}><EditIcon /></IconButton> 
                }
            }
        ];
        
        let employeeList = this.createEmployeeList();
        this.state={rows: employeeList,
                    selected: []
                }
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
        return employeeList;
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
        const employeeList = this.createEmployeeList()
        return (
            <div>
                <div style={{ height: 400, width: '100%' }}>
                    <FormDialogUpdate attributes={this.state.attributes} 
                                        onUpdate={this.props.onUpdate}
                                        open={this.state.open}
                                        ref={ref => (this.child = ref)}
                                        setState={state => this.setState(state)}/>
                    <DataGrid id={this.state.nbRender}

                                rows={employeeList} 
                                columns={this.columns.map((column) => ({
                                    ...column,
                                    disableClickEventBubbling:true,
                                }))}
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