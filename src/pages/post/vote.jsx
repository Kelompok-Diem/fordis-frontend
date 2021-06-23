import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { vote } from '../../functions/post';

export default class Vote extends React.Component {
  render() {
    return (
      <Container>
        <Button onClick={() => vote("1", this.props.postId)}>
          Upvote
        </Button>
        <Button onClick={() => vote("-1", this.props.postId)}>
          Downvote
        </Button>
        <p>
          {this.props.votes}
        </p>
      </Container>
    )
  }
}
