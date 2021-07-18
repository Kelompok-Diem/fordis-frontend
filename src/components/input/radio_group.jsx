import React from 'react';
import { useField } from 'formik';
import { Form, InputGroup, Row, Col, FormControl } from 'react-bootstrap';
import { Field } from 'formik';

import './style.scss';

export const RadioGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group className="custom-radio-group">
      <Form.Label>{label}</Form.Label>
      <Row>
        {props.options.map((option, index) => {
          return (
            <Col md={3} key={index}>
              <InputGroup>
                <span className="input-group-text">
                  <Field
                    type="radio"
                    name={props.name}
                    value={option.value}
                    disabled={props.disabled}
                  />
                </span>
                <FormControl
                  disabled
                  value={option.label}
                  className="disabled-form"
                />
              </InputGroup>
            </Col>
          )
        })}
      </Row>
    </Form.Group>
  );
}
