import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';
import { register } from '../../functions/auth';

export default class Register extends React.Component {
  render() {
    return (
      <Container>
        <p>Register Page</p>
        <Link to="/">
          <Button variant="primary">
            Home
          </Button>
        </Link>
        <Formik
          initialValues={{
            full_name: "",
            email:"",
            password: "",
          }}
          onSubmit={(values) => {
            console.log(values);

            register(values);
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
      </Container>
    )
  }
}
