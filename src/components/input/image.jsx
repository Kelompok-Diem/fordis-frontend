import React from 'react';
import { useField } from 'formik';
import { Form, Container, Image } from 'react-bootstrap';
import ImageGallery from '../image_gallery';
import MaleAvatar from '../../assets/images/male_avatar.png';
import FemaleAvatar from '../../assets/images/female_avatar.png';

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

export const SingleImageInput = ({ ...props }) => {
  const [field, meta] = useField(props);

  let image_source = null;
  if (props.image) {
    image_source = URL.createObjectURL(props.image);
  } else {
    image_source = props.gender === 'F' ? FemaleAvatar : MaleAvatar;
  }

  return (
    <Form.Group className="single-image-input">
      <button className="image-container">
        <Image
          src={image_source}
          width="100%"
          onClick={() => document.getElementById("image-selector").click()}
        />
      </button>
      <input
        id="image-selector"
        type="file"
        name={props.name}
        accept="image/*"
        onChange={props.onChange}
      />
    </Form.Group>
  )
}
