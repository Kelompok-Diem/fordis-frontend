import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading';
import { getProfile } from '../../functions/auth';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null
    }
  }

  async componentDidMount() {
    const profile = await getProfile();

    console.log(profile);

    this.setState({
      profile: profile,
    })
  }

  render() {
    return (
      <Container>
        <p>Profile Page</p>
        <Link to="/home">
          <Button variant="primary">
            Home
          </Button>
        </Link>
        {this.state.profile
          ? (
            <Container>
              <p>Full Name: {this.state.profile.fullName}</p>
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
