import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        // this.pushEmployee = this.pushEmployee.bind(this);

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

    // pushEmployee(newEmployee) {
	// 	follow(client, root, ['employees']).then(employeeCollection => {
	// 		return client({
	// 			method: 'POST',
	// 			path: employeeCollection.entity._links.self.href,
	// 			entity: newEmployee,
	// 			headers: {'Content-Type': 'application/json'}
	// 		})
	// 	}).then(response => {
	// 		return follow(client, root, [
	// 			{rel: 'employees', params: {'size': this.state.pageSize}}]);
	// 	}).done(response => {
	// 		if (typeof response.entity._links.last !== "undefined") {
	// 			this.onNavigate(response.entity._links.last.href);
	// 		} else {
	// 			this.onNavigate(response.entity._links.self.href);
	// 		}
	// 	});
    // }
    
    handleSubmit(e) {
        console.log("SUBMIT FDP")
        e.preventDefault();
        firstName = document.getElementById("firstName").value;
        lastName = document.getElementById("lastName").value;
        email = document.getElementById("email").value;
        
        console.log(firstName)
        console.log(lastName)
        console.log(email)

        const newEmployee = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email
        };
		
        this.props.onCreate(newEmployee);
        this.setState({open: false});
    };

    render() {
        return (
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                Open form dialog
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
                    id="email"
                    label="Email Address"
                    type="email"
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