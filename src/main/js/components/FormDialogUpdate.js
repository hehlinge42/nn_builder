import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

const ReactDOM = require('react-dom');
const client = require('../client');
const root = '/api';
const follow = require('../follow');

class FormDialogUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            description: "",
            employee: undefined,
            open: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit(e) {

        e.preventDefault();
        firstName = document.getElementById("firstName").value;
        lastName = document.getElementById("lastName").value;
        description = document.getElementById("description").value;

        const updatedEmployee = {
            'firstName': firstName,
            'lastName': lastName,
            'description': description
        };
		
        this.props.onUpdate(this.state.employee, updatedEmployee);
        this.setState({open: false});       
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleCancel() {
        this.setState({open: false});
    };

    render() {
        return (
            <Dialog open={this.state.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update user</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please update relevant fields.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    defaultValue={this.state.firstName}
                    type="search"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    defaultValue={this.state.lastName}
                    type="search"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    defaultValue={this.state.description}
                    type="search"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
}


export default FormDialogUpdate;