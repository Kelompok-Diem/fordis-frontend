import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PostContent from './post';
import CommentForm from './comment_form';
import Comment from './comment';
import Page from '../../components/page';

import { getPostById } from '../../functions/post';
import { getCommentsByPostId } from '../../functions/comment';

import './style.scss';

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      comments: null,
    }
  }

  async componentDidMount() {
    const post_id = this.props.match.params.id;

    const post = await getPostById(post_id);
    const comments = await getCommentsByPostId(post_id);

    this.setState({
      post: post,
      comments: comments,
    })
  }

  render() {
    return (
      <Page>
        <Container className="top-button-container">
          <Button onClick={() => this.props.history.goBack()}>
            {"< Back"}
          </Button>
        </Container>
        <Container className="post-container">
          {this.state.post
            ? (
              <PostContent {...this.state.post} />
            ) : (
              <Container>
                <SkeletonTheme color="white">
                  <Row>
                    <Col md={4}>
                      <Skeleton />
                    </Col>
                  </Row>
                  <h3><Skeleton /></h3>
                  <Skeleton count={5} />
                </SkeletonTheme>
              </Container>
            )
          }
        </Container>
        <Container className="comment-section">
          {this.state.post && this.state.post.is_active && (
            <CommentForm
              postId={this.props.match.params.id}
            />
          )}
          {this.state.comments
            ? (
              <>
                <Container className="title-container">
                  <h2 className="discussion-title">Discussion</h2>
                </Container>
                {this.state.comments.length > 0 ? (
                  this.state.comments.map((value, index) => {
                    return (
                      <Comment
                        key={index}
                        {...value}
                      />
                    )
                  })
                ) : (
                  this.state.post.is_active && (
                    <p>There are no comments here. Be the first to comment</p>
                  )
                )}
              </>
            ) : (
              <Container>
                <SkeletonTheme color="white">
                  <Row>
                    <Col md={4}>
                      <Skeleton />
                    </Col>
                  </Row>
                  <Skeleton count={5} />
                </SkeletonTheme>
              </Container>
            )
          }
        </Container>
      </Page>
    );
  }
}
