import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
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
    });
  }

  render() {
    return (
      <Container>
        <p>Home Page</p>
        <NavLink to="/register">
          <Button variant="primary">
            Register
          </Button>
        </NavLink>
        <NavLink to="/login">
          <Button variant="primary">
            Login
          </Button>
        </NavLink>
        <NavLink to="/profile">
          <Button variant="primary">
            Profile
          </Button>
        </NavLink>
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
