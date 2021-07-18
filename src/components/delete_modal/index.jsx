import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class DeleteModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {this.props.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete this {this.props.type}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={this.props.hideModal}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={this.props.action}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
