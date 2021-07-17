import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/input/text';
import { ImageInput } from '../../components/input/image';

import { createComment, updateComment } from '../../functions/comment';

export default class CommentForm extends React.Component {
  render() {
    const is_edit = this.props.comment_id ? true : false;
    const initialValues = is_edit
      ? {
        content: this.props.content
      } : {
        content: "",
        images: [],
      }

    return (
      <Container className="comment-form-container">
        <Formik
          initialValues={initialValues}
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

            if (is_edit) {
              updateComment(this.props.comment_id, values);
            } else {
              createComment(formData);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form encType="multipart/form-data">
              <TextInput
                name="content"
                label={is_edit ? "" :"Add a Comment"}
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
                  {is_edit ? "Edit" : "Comment"}
                </Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Container>
    )
  }
}
