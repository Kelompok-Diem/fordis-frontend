import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Page from '../../components/page';
import { TextInput } from '../../components/input/text';
import { ImageInput } from '../../components/input/image';

import { createPost, updatePost } from '../../functions/post';

import './style.scss';

export default class PostForm extends React.Component {
  render() {
    const is_edit = this.props.location.state ? true : false;
    const initialValues = is_edit
      ? this.props.location.state.initialValues
      : {
        title: "",
        content: "",
        images: [],
      };

    return (
      <Page>
        <Container className="top-button-container">
          <Button onClick={() => this.props.history.goBack()}>
            {"< Back"}
          </Button>
        </Container>
        <Container className="post-form-container">
          <Formik
            initialValues={initialValues}
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

              if (is_edit) {
                updatePost(this.props.match.params.id, values);
              } else {
                createPost(formData);
              }
              this.props.history.goBack();
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
                {!is_edit && (
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
                )}
                <Container className="button-container">
                  <Button variant="primary" type="submit">
                    {is_edit ? "Edit" : "Post"}
                  </Button>
                </Container>
              </Form>
            )}
          </Formik>
        </Container>
      </Page>
    )
  }
}
