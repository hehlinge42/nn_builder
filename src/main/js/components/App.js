'use strict';

import EmployeeList from './EmployeeList';
import EmployeeGrid from './EmployeeGrid';
import CreateDialog from './CreateDialog';

import Button from "@material-ui/core/Button";
import FormDialog from './FormDialog';

const ReactDOM = require('react-dom');
const React = require('react');
const client = require('../client');
const root = '/api';
const when = require('when')
const follow = require('../follow');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: [], attributes: [], pageSize: 2, links: {}, loadedData: false};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

	onNavigate(navUri) {
		client({
			method: 'GET',
			path: navUri
		}).then(employeeCollection => {
			this.links = employeeCollection.entity._links;

			return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
			);
		}).then(employeePromises => {
			return when.all(employeePromises);
		}).done(employees => {
			this.setState({
				employees: employees,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links,
			});
		});
	}

	onCreate(newEmployee) {
		follow(client, root, ['employees']).then(employeeCollection => {
			return client({
				method: 'POST',
				path: employeeCollection.entity._links.self.href,
				entity: newEmployee,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'employees', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
			console.log("AVANT LOG FROM SERVEUR")
			this.loadFromServer(this.state.pageSize);
			console.log("APRES LOG FROM SERVEUR")
		});
		this.setState(this.state);
		console.log("APRES SET STATE")
		console.log(this.state.employees)
	}

	onDelete(href) {
		client({method: 'DELETE', path: href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'employees', params: {size: pageSize}}]
		).then(employeeCollection => {
			return client({
				method: 'GET',
				path: employeeCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				this.links = employeeCollection.entity._links;
				return employeeCollection;
			});
		}).then(employeeCollection => {
			return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
			);
		}).then(employeePromises => {
			return when.all(employeePromises);
		}).done(employees => {
			this.setState({
				employees: employees,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: this.links,
				loadedData: true
			});
		});
	}

	componentDidMount() {
		console.log("in componentDidMount")
		this.loadFromServer(this.state.pagesize);
		console.log("out of componentDidMount")
		console.log(this.state)
	}

	render() {
		console.log("In App.js Renders called employee grid");

		console.log(this.state.employees)

		if (!this.state.loadedData) {
			return <div/>;
		}
		return (
			<div>
				<FormDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
				{/* <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/> */}
				<EmployeeGrid employees={this.state.employees}
							  links={this.state.links}
							  pageSize={this.state.pageSize}
							  onNavigate={this.onNavigate}
							  onDelete={this.onDelete}
							  updatePageSize={this.updatePageSize}
							  loadFromServer={this.loadFromServer}/>
			</div>
		)
	}
}

export default App;
