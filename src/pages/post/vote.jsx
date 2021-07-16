import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';

import { vote } from '../../functions/post';

import './style.scss';

export default class Vote extends React.Component {
  render() {
    return (
      <Container className="vote-container">
        <Row>
          <Col md={12}>
            <button
              className="vote-button"
              onClick={() => vote(
                this.props.collection, "1", this.props.targetId
              )}
            >
              <CaretUpFill
                className="upvote-icon"
                size={35}
              />
            </button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="vote-count">
              {this.props.votes}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <button
              className="vote-button"
              onClick={() => vote(
                this.props.collection, "-1", this.props.targetId
              )}
            >
              <CaretDownFill
                className="downvote-icon"
                size={35}
              />
            </button>
          </Col>
        </Row>
      </Container>
    )
  }
}
