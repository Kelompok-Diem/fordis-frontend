import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { ChatLeftFill, Share } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import Vote from './vote';
import Menu from '../../components/menu';
import ImageGallery from '../../components/image_gallery';
import DeleteModal from '../../components/delete_modal';

import { deactivate, share, deletePost } from '../../functions/post';

export default class PostContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_modal: false
    }
  }

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
        <DeleteModal
          show={this.state.show_modal}
          type="post"
          hideModal={() => this.setState({ show_modal: false })}
          action={() => {
            deletePost(this.props._id);
            this.props.history.push("/");
          }}
        />
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
            <p className="author">
              Posted By{" "}
              <NavLink
                to={"/profile/" + this.props.author._id}
              >
                {this.props.author.full_name}
              </NavLink>
            </p>
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
                    onClick={() => this.props.history.push({
                      pathname: "/edit-post/" + this.props._id,
                      state: {
                        initialValues: {
                          title: this.props.title,
                          content: this.props.content
                        }
                      }
                    })}
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
                      onClick={() => this.setState({ show_modal: true })}
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
