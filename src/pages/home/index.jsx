import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Post from './post';
import Page from '../../components/page';

import { getAllPosts } from '../../functions/post';
import { getProfile } from '../../functions/auth';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      profile: null,
    }
  }

  async componentDidMount() {
    this.setState({
      posts: await getAllPosts(),
      profile: await getProfile(),
    });
  }

  render() {
    const jwt_token = sessionStorage.getItem("user_token");

    return (
      <Page>
        <Container className="top-button-container menu-container">
          {this.state.profile && (
            <>
              {(this.state.profile.is_admin || this.state.profile.is_moderator) && (
                <NavLink
                  to="/reports"
                  className="report-button"
                >
                  <Button variant="outline-primary">
                    Reports
                  </Button>
                </NavLink>
              )}
              <NavLink to="add-post">
                <Button>
                  + New
              </Button>
              </NavLink>
            </>
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
