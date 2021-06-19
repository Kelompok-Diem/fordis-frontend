import React from 'react';
import { Container } from 'react-bootstrap';

export default class Post extends React.Component {
  render() {
    return (
      <Container>
        <p><b>{this.props.title}</b></p>
        <p>{this.props.content}</p>
      </Container>
    );
  }
}
