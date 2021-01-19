'use strict';

import { Button } from 'antd';

const React = require('react');
const ReactDOM = require('react-dom');

class CreateDialog extends React.Component {

	constructor(props) {
        super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newEmployee = {};
		this.props.attributes.forEach(attribute => {
			newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newEmployee);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<Button href="#createEmployee" type="primary" shape="circle">Create</Button>

				<div id="createEmployee" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new employee</h2>

						<form>
							{inputs}
							{/* <button onClick={this.handleSubmit}>Create</button> */}
                            <Button type="primary" shape="circle" onClick={this.handleSubmit}>
                                CreateShabang
                            </Button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default CreateDialog;