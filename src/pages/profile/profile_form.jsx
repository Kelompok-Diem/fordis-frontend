import React from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Menu from '../../components/menu';
import { TextInput } from '../../components/input/text';
import { RadioGroup } from '../../components/input/radio_group';
import { SingleImageInput } from '../../components/input/image';
import DeleteModal from '../../components/delete_modal';
import ReportModal from '../../components/report_modal';

import { updateUser, logOut, promoteModerator, deleteUser } from '../../functions/auth';

export default class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_report_modal: false,
      show_delete_modal: false,
    }
  }

  render() {
    const { user } = this.props;
    const can_edit = user && user.is_owner;

    return (
      <Container>
        <ReportModal
          show={this.state.show_report_modal}
          type="user"
          id={this.props.initialValues._id}
          hideModal={() => this.setState({ show_report_modal: false })}
        />
        <DeleteModal
          show={this.state.show_delete_modal}
          type="user"
          hideModal={() => this.setState({ show_delete_modal: false })}
          action={() => {
            deleteUser(this.props.initialValues._id)
            this.props.history.push("/");
          }}
        />
        <Formik
          initialValues={this.props.initialValues}
          onSubmit={(values) => {
            const formData = new FormData();

            for (const [key, value] of Object.entries(values)) {
              formData.append(key, value);
            }

            updateUser(formData);
          }}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form encType="multipart/form-data">
              <Row>
                <Col md={4}>
                  <SingleImageInput
                    image={values.photo}
                    gender={values.gender}
                    onChange={(e) => setFieldValue("photo", e.currentTarget.files[0])}
                    disabled={!can_edit}
                  />
                </Col>
                <Col md={7}>
                  <TextInput
                    name="full_name"
                    label="Full Name"
                    type="text"
                    disabled={!can_edit}
                  />
                  <TextInput
                    name="email"
                    label="Email"
                    type="text"
                    disabled
                  />
                  {can_edit && (
                    <TextInput
                      name="password"
                      label="Password"
                      type="password"
                    />
                  )}
                  <RadioGroup
                    name="gender"
                    label="Gender"
                    disabled={!can_edit}
                    options={[
                      {
                        value: "M",
                        label: "Male",
                      },
                      {
                        value: "F",
                        label: "Female",
                      }
                    ]}
                  />
                  <RadioGroup
                    name="role"
                    label="Role"
                    disabled={!can_edit}
                    options={[
                      {
                        value: "student",
                        label: "Student",
                      },
                      {
                        value: "alumni",
                        label: "Alumni",
                      },
                      {
                        value: "lecturer",
                        label: "Lecturer",
                      }
                    ]}
                  />
                </Col>
                <Col md={1}>
                  <Menu>
                    {user && (
                      <Dropdown.Item
                        eventKey={1}
                        onClick={() => this.setState({ show_report_modal: true })}
                      >
                        Report
                      </Dropdown.Item>
                    )}
                    {user && !user.is_owner &&
                      !this.props.position.is_admin &&
                      (user.is_admin || user.is_moderator) && (
                        <>
                          <Dropdown.Divider />
                          {user.is_admin && !this.props.position.is_moderator && (
                            <Dropdown.Item
                              eventKey={2}
                              onClick={() => promoteModerator(this.props.initialValues._id)}
                            >
                              Promote
                            </Dropdown.Item>
                          )}
                          {!user.is_owner && (
                            <Dropdown.Item
                              eventKey={3}
                              onClick={() => this.setState({ show_delete_modal: true })}
                            >
                              Delete
                            </Dropdown.Item>
                          )}
                        </>
                      )
                    }
                    {user && user.is_owner && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey={4}
                          onClick={() => {
                            logOut();
                            this.props.history.push("/");
                            window.location.reload();
                          }}
                        >
                          Log Out
                        </Dropdown.Item>
                      </>
                    )}
                  </Menu>
                </Col>
              </Row>
              {user && user.is_owner && (
                <Container
                  className="button-container"
                  fluid
                >
                  <Button
                    variant="outline-primary"
                    onClick={() => resetForm()}
                    className="reset-button"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Save Edit
                  </Button>
                </Container>
              )}
            </Form>
          )}
        </Formik>
      </Container>
    )
  }

}
