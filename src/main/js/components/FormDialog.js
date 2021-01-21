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

// export default function FormDialog() {
class FormDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleClickOpen() {
        console.log("OPEN FDP")
        this.setState({open: true});
        // setOpen(true);
    };

    handleCancel() {
        console.log("CANCEL FDP")
        this.setState({open: false});
    };
    
    handleSubmit(e) {
        e.preventDefault();
        firstName = document.getElementById("firstName").value;
        lastName = document.getElementById("lastName").value;
        description = document.getElementById("description").value;

        const newEmployee = {
            'firstName': firstName,
            'lastName': lastName,
            'description': description
        };
		
        this.props.onCreate(newEmployee);
        this.setState({open: false});
    };

    render() {
        return (
            <div>
            <Button variant="contained"
                    color="primary"
                    onClick={this.handleClickOpen}
                    startIcon={<AddIcon />}>
                Create new user
            </Button>
            <Dialog open={this.state.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New User</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please fill in all fields.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="search"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="search"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="search"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    };
};

export default FormDialog;