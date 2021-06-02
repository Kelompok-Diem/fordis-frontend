import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <p>Home Page</p>
        <Link to="/register">
          <Button variant="primary">
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="primary">
            Login
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="primary">
            Profile
          </Button>
        </Link>
      </Container>
    )
  }
}
