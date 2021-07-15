import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { vote } from '../../functions/post';

export default class Vote extends React.Component {
  render() {
    return (
      <Container>
        <Button onClick={() => vote(
          this.props.collection, "1", this.props.targetId
        )}>
          Upvote
        </Button>
        <Button onClick={() => vote(
          this.props.collection, "-1", this.props.targetId
        )}>
          Downvote
        </Button>
        <p>
          {this.props.votes}
        </p>
      </Container>
    )
  }
}
