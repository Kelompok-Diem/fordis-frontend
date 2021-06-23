import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { share } from '../../functions/post';

export default class Share extends React.Component {
  render() {
    return (
      <Container>
        <Button onClick={() => share(this.props.postId, this.props.title)}>
          Share
        </Button>
        <p>
          {this.props.shareCount}
        </p>
      </Container>
    )
  }
}
