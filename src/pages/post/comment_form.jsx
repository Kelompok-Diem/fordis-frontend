import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';
import { ImageInput } from '../../components/input/image';

import { createComment } from '../../functions/comment';

export default class CommentForm extends React.Component {
  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            content: "",
            images: [],
          }}
          onSubmit={(values) => {
            const params = {
              ...values,
              post_id: this.props.postId,
            }

            const formData = new FormData();

            for (const [key, value] of Object.entries(params)) {
              if (key === 'images') {
                for (const image of value) {
                  formData.append('images', image);
                }
              } else {
                formData.append(key, value);
              }
            }

            createComment(formData);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form encType="multipart/form-data">
              <TextInput
                name="content"
                label="Add a Comment"
                type="text"
                as="textarea"
                row={5}
              />
              <ImageInput
                name="image"
                images={values.images}
                onChange={(e) => {
                  let images = values.images;

                  if (e.currentTarget.files[0]) {
                    images.push(e.currentTarget.files[0]);
                  }

                  setFieldValue("images", images);
                }}
              />
              <Button variant="primary" type="submit">
                Comment
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
  }
}
