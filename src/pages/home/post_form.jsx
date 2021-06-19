import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';

import { createPost } from '../../functions/post';

export default class PostForm extends React.Component {
  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            title: "",
            content: "",
          }}
          onSubmit={(values) => {
            console.log(values);

            createPost(values);
          }}
        >
          <Form>
            <TextInput
              name="title"
              label="Title"
              type="text"
            />
            <TextInput
              name="content"
              label="Content"
              type="text"
              as="textarea"
              row={5}
            />
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </Formik>
      </Container>
    )
  }
}
