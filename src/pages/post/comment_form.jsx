import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';
import { createComment } from '../../functions/comment';

export default class CommentForm extends React.Component {
  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            content: "",
          }}
          onSubmit={(values) => {
            const params = {
              ...values,
              post_id: this.props.postId,
            }

            console.log(params);

            createComment(params);
          }}
        >
          <Form>
            <TextInput
              name="content"
              label="Content"
              type="text"
              as="textarea"
              row={5}
            />
            <Button variant="primary" type="submit">
              Comment
            </Button>
          </Form>
        </Formik>
      </Container>
    )
  }
}
