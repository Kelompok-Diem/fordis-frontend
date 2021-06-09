import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostForm from './post_form';
import Post from './post';
import Loading from '../../components/loading';

import { getAllPosts } from '../../functions/post';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null
    }
  }

  async componentDidMount() {
    this.setState({
      posts: await getAllPosts()
    }, () => console.log(this.state.posts));
  }

  render() {
    return (
      <Container>
        <p>Home Page</p>
        <Link to="/register">
          <Button variant="primary">
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="primary">
            Login
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="primary">
            Profile
          </Button>
        </Link>
        <PostForm />
        {this.state.posts
          ? (
            this.state.posts.map((value, index) => {
              return (
                <Post
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
    )
  }
}
