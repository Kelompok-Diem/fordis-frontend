import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { ChatLeftFill, Share } from 'react-bootstrap-icons';
import Vote from './vote';
import Menu from './menu';
import ImageGallery from '../../components/image_gallery';

import { deactivate, share } from '../../functions/post';

export default class PostContent extends React.Component {
  render() {
    const stats = [
      {
        icon: <ChatLeftFill color="#D5E496" size={20} />,
        number: this.props.comment_count || 0,
      },
      {
        icon: <Share color="#000000" size={20} />,
        number: this.props.share_count || 0,
      }
    ]

    return (
      <>
        <Row className="content-row">
          <Col md={1}>
            <Vote
              collection="post"
              votes={this.props.votes}
              targetId={this.props._id}
              upvoted={this.props.user && this.props.user.upvoted}
              downvoted={this.props.user && this.props.user.downvoted}
            />
          </Col>
          <Col md={10}>
            <p className="author">Posted By <b>{this.props.author}</b></p>
            <h3><b>{this.props.title}</b></h3>
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
                onClick={() => share(this.props._id)}
              >
                Share
              </Dropdown.Item>
              {this.props.user && (
                <Dropdown.Item
                  eventKey="2"
                >
                  Report
                </Dropdown.Item>
              )}
              {this.props.user && this.props.user.is_author && (
                <>
                  <Dropdown.Divider />
                  {this.props.is_active && (
                    <Dropdown.Item
                      eventKey="3"
                      onClick={() => deactivate(this.props._id)}
                    >
                      Deactivate
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    eventKey="4"
                  >
                    Edit
                  </Dropdown.Item>
                </>
              )}
              {this.props.user &&
                (this.props.user.is_author || this.props.user.is_admin || this.props.user.is_moderator) &&
                (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      eventKey="5"
                    >
                      Delete
                    </Dropdown.Item>
                  </>
                )
              }
            </Menu>
          </Col>
        </Row>
        <Row className="stats-container">
          <Col md={1}>
          </Col>
          <Col md={10}>
            <Row>
              {stats.map((value, index) => {
                return (
                  <Col md={1} xs={12} key={index}>
                    <Row className="stat-row">
                      <Col md={6} className="stat">
                        {value.icon}
                      </Col>
                      <Col md={6} className="stat">
                        {value.number}
                      </Col>
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}
