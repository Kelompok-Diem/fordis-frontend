import React from 'react';
import { Figure } from 'react-bootstrap';

export default class ImageGallery extends React.Component {
  render() {
    return (
      <>
        {this.props.images.map((value, index) => {
          return (
            <Figure.Image
              key={index}
              width="200px"
              height="200px"
              src={value}
            />
          )
        })}
      </>
    );
  }
}
