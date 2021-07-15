import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Page from '../../components/page';
import { TextInput } from '../../components/input/text';

import { login } from '../../functions/auth';

export default class Login extends React.Component {
  render() {
    return (
      <Page>
        <Formik
          initialValues={{
            email:"",
            password: "",
          }}
          onSubmit={(values) => {
            login(values);

            this.props.history.push("/");
          }}
        >
          <Form>
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
