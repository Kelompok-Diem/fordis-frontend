import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextInput } from '../input/text';

export default class ReportModal extends React.Component {
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
          <Modal.Title>
            Report this {this.props.type}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            reason: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <Modal.Body>
              <TextInput
                name="reason"
                label="Be specific for the report that it consist why and what happen."
                type="text"
                as="textarea"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                onClick={this.props.hideModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                Report
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    );
  }
}
