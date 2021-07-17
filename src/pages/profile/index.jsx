import React from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Skeleton from 'react-loading-skeleton';
import Page from '../../components/page';
import Menu from '../../components/menu';
import { TextInput } from '../../components/input/text';
import { RadioGroup } from '../../components/input/radio_group';
import { SingleImageInput } from '../../components/input/image';

import { getProfile, logOut } from '../../functions/auth';

import './style.scss';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null
    }
  }

  async componentDidMount() {
    const profile = await getProfile();

    this.setState({
      profile: profile,
    })
  }

  render() {
    console.log(this.props);

    return (
      <Page>
        <h1 className="title">Profile</h1>
        {this.state.profile
          ? (
            <Container>
              <Formik
                initialValues={{
                  ...this.state.profile,
                  password: '',
                  gender: '',
                  role: '',
                  photo: null,
                }}
                onSubmit={(values) => {
                  console.log(values);
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
                        />
                      </Col>
                      <Col md={7}>
                        <TextInput
                          name="full_name"
                          label="Full Name"
                          type="text"
                        />
                        <TextInput
                          name="email"
                          label="Email"
                          type="text"
                          disabled
                          className="disabled-form"
                        />
                        <TextInput
                          name="password"
                          label="Password"
                          type="password"
                        />
                        <RadioGroup
                          name="gender"
                          label="Gender"
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
                          <Dropdown.Item
                            eventKey={1}
                          >
                            Report
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            eventKey={2}
                          >
                            Promote
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey={3}
                          >
                            Delete
                          </Dropdown.Item>
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
                        </Menu>
                      </Col>
                    </Row>
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
                  </Form>
                )}
              </Formik>
            </Container>
          ) : (
            <Row>
              <Col md={4}>
                <Skeleton height={200} />
              </Col>
              <Col md={7}>
                <Skeleton count={5} />
              </Col>
            </Row>
          )
        }
      </Page>
    )
  }
}
