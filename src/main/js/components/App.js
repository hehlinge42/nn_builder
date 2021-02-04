'use strict';

import EmployeeGrid from './EmployeeGrid';
import FormDialogCreate from './FormDialogCreate';

const ReactDOM = require('react-dom');
const React = require('react');
const client = require('../client');
const root = '/api';
const when = require('when')
const follow = require('../follow');
const stompClient = require('../websocket-listener');


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: [], attributes: [], links: {}, loadedData: false};
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this)
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
				{rel: 'employees'}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
			this.loadFromServer();
		});
		this.setState(this.state);
	}

	onDelete(href) {
		client({method: 'DELETE', path: href}).done(response => {
			this.loadFromServer();
		});
	}

	onUpdate(employee, updatedEmployee) {
		client({
			method: 'PUT',
			path: employee.entity._links.self.href,
			entity: updatedEmployee,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': employee.headers.Etag
			}
		}).done(response => {
			this.loadFromServer();
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' +
					employee.entity._links.self.href + '. Your copy is stale.');
			}
		});
		console.log("Avant setState onUpdate");
		this.setState(this.state)
		console.log("Après setState onUpdate");
	}

	loadFromServer() {
		console.log("Dans loadFromServer");
		follow(client, root, [
			{rel: 'employees'}]
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
				links: this.links,
				loadedData: true
			});
		});
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'employees'
		}]).then(employeeCollection => {
			this.links = employeeCollection.entity._links;
			this.page = employeeCollection.entity.page;
	
			return employeeCollection.entity._embedded.employees.map(employee => {
				return client({
					method: 'GET',
					path: employee._links.self.href
				})
			});
		}).then(employeePromises => {
			return when.all(employeePromises);
		}).then(employees => {
			this.setState({
				page: this.page,
				employees: employees,
				attributes: Object.keys(this.schema.properties),
				links: this.links
			});
		});
	}

	componentDidMount() {
		this.loadFromServer();
		stompClient.register([
			{route: '/topic/newEmployee', callback: this.refreshCurrentPage},
			{route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
			{route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
		]);
	}

	render() {
		if (!this.state.loadedData) {
			return <div/>;
		}
		return (
			<div>
				<FormDialogCreate attributes={this.state.attributes} onCreate={this.onCreate}/>
				{/* <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/> */}
				<EmployeeGrid employees={this.state.employees}
							  links={this.state.links}
							  onNavigate={this.onNavigate}
							  onDelete={this.onDelete}
							  onUpdate={this.onUpdate}
							  loadFromServer={this.loadFromServer}/>
			</div>
		)
	}
}

export default App;
