import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Page from '../../components/page';
import { TextInput } from '../../components/input/text';

import { login, register } from '../../functions/auth';

export default class Register extends React.Component {
  render() {
    return (
      <Page>
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
          <Form>
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Formik>
      </Page>
    )
  }
}
