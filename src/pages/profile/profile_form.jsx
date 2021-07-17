import React from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Menu from '../../components/menu';
import { TextInput } from '../../components/input/text';
import { RadioGroup } from '../../components/input/radio_group';
import { SingleImageInput } from '../../components/input/image';

import { updateUser, logOut } from '../../functions/auth';

export default class ProfileForm extends React.Component {
  render() {
    const { user } = this.props;
    const can_edit = user && user.is_owner;

    let initialValues = {};
    const fields = ["full_name", "email", "gender", "role", "photo"];

    for (const value of fields) {
      initialValues[value] = this.props[value];
    }

    console.log(initialValues);

    return (
      <Container>
        <Formik
          initialValues={{
            ...initialValues,
            photo: null,
          }}
          onSubmit={(values) => {
            console.log(values);

            updateUser(values);
          }}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form>
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
                      >
                        Report
                      </Dropdown.Item>
                    )}
                    {user &&
                      (user.is_admin || user.is_moderator) && (
                        <>
                          <Dropdown.Divider />
                          {user.is_admin && this.props.is_moderator && (
                            <Dropdown.Item
                              eventKey={2}
                            >
                              Promote
                            </Dropdown.Item>
                          )}
                          {!this.props.is_admin && (
                            <Dropdown.Item
                              eventKey={3}
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
              {user && (
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
