import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentForm from './comment_form';
import Share from './share';
import Loading from '../../components/loading';

import { getPostById } from '../../functions/post';
import { getCommentsByPostId } from '../../functions/comment';

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
      <Container>
        <Link to="/">
          <Button variant="primary">
            Home
          </Button>
        </Link>
        {this.state.post
          ? (
            <Container>
              <p><b>{this.state.post.title}</b></p>
              <p>{this.state.post.content}</p>
              <Share
                postId={this.props.match.params.id}
                shareCount={this.state.post.share_count}
                title={this.state.post.title}
              />
            </Container>
          ) : (
            <Loading />
          )
        }
        <CommentForm
          postId={this.props.match.params.id}
        />
        {this.state.comments
          ? (
            this.state.comments.map((value, index) => {
              return (
                <p key={index}>{value.content}</p>
              )
            })
          ) : (
            <Loading />
          )
        }
      </Container>
    );
  }
}