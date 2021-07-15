import React from 'react';
import { Container } from 'react-bootstrap';
import Page from '../../components/page';
import Loading from '../../components/loading';

import { getProfile } from '../../functions/auth';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null
    }
  }

  async componentDidMount() {
    const profile = await getProfile();

    this.setState({
      profile: profile,
    })
  }

  render() {
    return (
      <Page>
        {this.state.profile
          ? (
            <Container>
              <p>Full Name: {this.state.profile.full_name}</p>
              <p>Email: {this.state.profile.email}</p>
            </Container>
          ) : (
            <Loading />
          )
        }
      </Page>
    )
  }
}
