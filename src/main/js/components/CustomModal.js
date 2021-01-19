import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
import { Modal, Button } from 'antd';

class CustomModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: false, visible: false};
  }

  showModal() {
      console.log(typeof this);
      console.log(this.state['visible']);
  };

  handleOk() {
    this.state.loading = true;

    const newEmployee = {};
    this.props.attributes.forEach(attribute => {
        newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
    });
    this.props.onCreate(newEmployee);
    
    this.state.loading = false;
    this.state.visible = false;
    // this.setState({ loading: false, visible: false }); 
  };

  handleCancel() {
    // this.setState({ visible: false });
    this.state.visible = false;
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }
}

export default CustomModal;