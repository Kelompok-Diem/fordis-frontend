import React from 'react';
import { Container } from 'react-bootstrap';

export default class Page extends React.Component {
  render() {
    return (
      <Container style={style.main}>
        {this.props.children}
      </Container>
    )
  }
}

const style = {
  main: {
    marginTop: "30px",
    marginBottom: "50px",
  }
}
