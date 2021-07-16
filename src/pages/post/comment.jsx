import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Vote from './vote';
import Menu from './menu';
import ImageGallery from '../../components/image_gallery';

export default class Comment extends React.Component {
  render() {
    return (
      <Container className="comment-container">
        <Row>
          <Col md={1}>
            <Vote
              collection="comment"
              votes={this.props.votes}
              targetId={this.props._id}
            />
          </Col>
          <Col md={10}>
            <p className="author">Comment By <b>Muntu</b></p>
            <p>{this.props.content}</p>
            <ImageGallery
              images={this.props.images.map((value) => {
                return (process.env.REACT_APP_API_URL + "/images/" + value)
              })}
            />
          </Col>
          <Col md={1}>
            <Menu>
              <Dropdown.Item
                eventKey="1"
              >
                Report
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="1"
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="3"
              >
                Delete
              </Dropdown.Item>
            </Menu>
          </Col>
        </Row>
      </Container>
    );
  }
}
