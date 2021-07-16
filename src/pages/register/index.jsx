import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Page from '../../components/page';
import { TextInput } from '../../components/input/text';

import { login, register } from '../../functions/auth';

import './style.scss'

export default class Register extends React.Component {
  render() {
    return (
      <Page className="auth-page">
        <Container className="title-container">
          <h1 className="title">Register</h1>
        </Container>
        <Formik
          initialValues={{
            full_name: "",
            email:"",
            password: "",
          }}
          onSubmit={(values) => {
            register(values);
            login(values);

            this.props.history.push("/");
          }}
        >
          <Form className="form-container">
            <TextInput
              name="full_name"
              label="Full Name"
              type="text"
            />
            <TextInput
              name="email"
              label="Email"
              type="email"
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
            />
            <Container className="button-container">
              <Button
                className="button"
                variant="primary"
                type="submit"
              >
                Register
              </Button>
            </Container>
          </Form>
        </Formik>
      </Page>
    )
  }
}
