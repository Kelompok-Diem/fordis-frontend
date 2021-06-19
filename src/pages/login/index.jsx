import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';
import { login } from '../../functions/auth';

export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <p>Login Page</p>
        <Link to="/">
          <Button variant="primary">
            Home
          </Button>
        </Link>
        <Formik
          initialValues={{
            email:"",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);

            login(values);
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
      </Container>
    )
  }
}
