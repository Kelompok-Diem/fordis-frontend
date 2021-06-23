import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      <Container>
        <p>Profile Page</p>
        <Link to="/">
          <Button variant="primary">
            Home
          </Button>
        </Link>
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
      </Container>
    )
  }
}