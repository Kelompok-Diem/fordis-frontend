import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';
import { ImageInput } from '../../components/input/image';

import { createPost } from '../../functions/post';

export default class PostForm extends React.Component {
  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            title: "",
            content: "",
            images: [],
          }}
          onSubmit={(values) => {
            const formData = new FormData();

            for (const [key, value] of Object.entries(values)) {
              if (key === 'images') {
                for (const image of value) {
                  formData.append('images', image);
                }
              } else {
                formData.append(key, value);
              }
            }

            createPost(formData);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form encType="multipart/form-data">
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
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
  }
}
