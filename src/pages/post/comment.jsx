import React from 'react';
import { Container } from 'react-bootstrap';
import ImageGallery from '../../components/image_gallery';

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
      </Container>
    );
  }
}
