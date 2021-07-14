import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default class Post extends React.Component {
  render() {
    return (
      <Container>
        <NavLink to={"/post/" + this.props._id}>
            <p>
              <b>{this.props.title}
            </b>
          </p>
        </NavLink>
        <p>{this.props.content}</p>
      </Container>
    );
  }
}
