import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentForm from './comment_form';
import Comment from './comment';
import Share from './share';
import Vote from './vote';
import Loading from '../../components/loading';
import ImageGallery from '../../components/image_gallery';

import { getPostById, deactivate } from '../../functions/post';
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
              <ImageGallery
                images={this.state.post.images.map((value) => {
                  return (process.env.REACT_APP_API_URL + "/images/" + value)
                })}
              />
              <Button
                variant="primary"
                onClick={() => deactivate(this.state.post._id)}
              >
                Deactivate
              </Button>
              <Share
                postId={this.props.match.params.id}
                shareCount={this.state.post.share_count}
                title={this.state.post.title}
              />
              <Vote
                collection="post"
                votes={this.state.post.votes}
                targetId={this.props.match.params.id}
              />
            </Container>
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
      </Container>
    );
  }
}
