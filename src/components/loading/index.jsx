import React from 'react';
import {Container, Spinner} from 'react-bootstrap';

export default class Loading extends React.Component {
  render() {
    return (
      <Container
        style={{textAlign: 'center'}}
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span> Loading...</span>
      </Container>
    );
  }
}
