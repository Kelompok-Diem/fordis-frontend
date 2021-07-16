import React from 'react';
import { Container } from 'react-bootstrap';

import './style.scss';

export default class Page extends React.Component {
  render() {
    return (
      <Container className={"page-container " + this.props.className}>
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
