import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Post from './post';
import Page from '../../components/page';

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
    const jwt_token = sessionStorage.getItem("user_token");

    return (
      <Page>
        <Container className="top-button-container menu-container">
          {jwt_token && (
            <NavLink to="add-post">
              <Button>
                + New
              </Button>
            </NavLink>
          )}
        </Container>
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
            <Container>
              <h3><Skeleton /></h3>
              <Skeleton count={5} />
            </Container>
          )
        }
      </Page>
    )
  }
}
