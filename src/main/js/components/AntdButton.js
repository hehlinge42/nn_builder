// import React, { useState } from 'react';
// import { Modal, Button } from 'antd';

// class AntdButton {

//     constructor(props) {
//         super(props);
//         this.isModalVisible = useState(false);
//         this.setIsModalVisible = useState(false);
// 	}
    
//     showModal = () => {
//         setIsModalVisible(true);
//     };

//     handleOk() {
//         setIsModalVisible(false);
//     };

//     handleCancel() {
//         setIsModalVisible(false);
//     };

//     render() {

//         return (
//             <>
//             <Button type="primary" onClick={showModal}>
//                 Open Modal
//             </Button>
//             <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//             </Modal>
//             </>
//         );
//     };
// };

// export default AntdButton;