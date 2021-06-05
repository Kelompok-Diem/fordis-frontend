import React from 'react';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

export const TextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...field}
        {...props}
      />
    </Form.Group>
  );
}
