import React from 'react';
import PostForm from './post_form';
import Post from './post';
import Page from '../../components/page';
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
      <Page className="main">
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
      </Page>
    )
  }
}
