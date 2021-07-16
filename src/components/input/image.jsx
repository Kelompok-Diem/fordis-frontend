import React from 'react';
import { useField } from 'formik';
import { Form, Container } from 'react-bootstrap';
import ImageGallery from '../image_gallery';

export const ImageInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const images = props.images.map((value) => {
    return (URL.createObjectURL(value));
  })

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <ImageGallery images={images} />
      <Container>
        <input
          type="file"
          name={props.name}
          accept="image/*"
          onChange={props.onChange}
        />
      </Container>
    </Form.Group>
  );
}
