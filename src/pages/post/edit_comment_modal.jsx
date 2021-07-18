import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CommentForm from './comment_form';

export default class EditCommentModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommentForm
            content={this.props.content}
            comment_id={this.props.comment_id}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
