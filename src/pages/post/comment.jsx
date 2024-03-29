import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Vote from './vote';
import Menu from '../../components/menu';
import EditCommentModal from './edit_comment_modal';
import ImageGallery from '../../components/image_gallery';
import DeleteModal from '../../components/delete_modal';
import ReportModal from '../../components/report_modal';

import { deleteComment } from '../../functions/comment';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_edit_modal: false,
      show_delete_modal: false,
      show_report_modal: false,
    }
  }

  render() {
    return (
      <Container
        id={this.props._id}
        className="comment-container"
      >
        <ReportModal
          show={this.state.show_report_modal}
          type="comment"
          id={this.props._id}
          hideModal={() => this.setState({ show_report_modal: false })}
        />
        <EditCommentModal
          show={this.state.show_edit_modal}
          hideModal={() => this.setState({ show_edit_modal: false })}
          content={this.props.content}
          comment_id={this.props._id}
        />
        <DeleteModal
          show={this.state.show_delete_modal}
          type="comment"
          hideModal={() => this.setState({ show_delete_modal: false })}
          action={() => deleteComment(this.props._id)}
        />
        <Row>
          <Col md={1}>
            <Vote
              collection="comment"
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
            <p>{this.props.content}</p>
            <ImageGallery
              images={this.props.images.map((value) => {
                return (process.env.REACT_APP_API_URL + "/images/" + value)
              })}
            />
          </Col>
          <Col md={1}>
            <Menu>
              {this.props.user && (
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => this.setState({ show_report_modal: true })}
                >
                  Report
                </Dropdown.Item>
              )}
              {this.props.user && this.props.user.is_author && (
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => this.setState({ show_edit_modal: true })}
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
                      eventKey="3"
                      onClick={() => this.setState({ show_delete_modal: true })}
                    >
                      Delete
                    </Dropdown.Item>
                  </>
                )
              }
            </Menu>
          </Col>
        </Row>
      </Container>
    );
  }
}
