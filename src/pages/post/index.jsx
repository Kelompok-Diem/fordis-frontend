import React from 'react';
import { Container, Button } from 'react-bootstrap';
import PostContent from './post';
import CommentForm from './comment_form';
import Comment from './comment';
import Page from '../../components/page';
import Loading from '../../components/loading';

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
        {this.state.post
          ? (
            <PostContent {...this.state.post} />
          ) : (
            <Loading />
          )
        }
        {this.state.post && this.state.post.is_active && (
          <CommentForm
            postId={this.props.match.params.id}
          />
        )}
        {this.state.comments
          ? (
            this.state.comments.map((value, index) => {
              return (
                <Comment
                  key={index}
                  {...value}
                />
              )
            })
          ) : (
            <Loading />
          )
        }
      </Page>
    );
  }
}
