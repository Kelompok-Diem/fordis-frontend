import React from 'react';
import { Container } from 'react-bootstrap';
import ImageGallery from '../../components/image_gallery';
import Vote from './vote';

export default class Comment extends React.Component {
  render() {
    return (
      <Container>
        <p>{this.props.content}</p>
        <ImageGallery
          images={this.props.images.map((value) => {
            return (process.env.REACT_APP_API_URL + "/images/" + value)
          })}
        />
        <Vote
          collection="comment"
          votes={this.props.votes}
          targetId={this.props._id}
        />
      </Container>
    );
  }
}
