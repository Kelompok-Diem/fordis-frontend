import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Page from '../../components/page';
import ProfileForm from './profile_form';

import { getUser } from '../../functions/auth';

import './style.scss';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null
    }
  }

  async componentDidMount() {
    const profile = await getUser(this.props.match.params.id);

    this.setState({
      profile: profile,
    }, () => console.log(this.state.profile))
  }

  render() {
    return (
      <Page>
        <h1 className="title">Profile</h1>
        {this.state.profile
          ? (
            <ProfileForm {...this.state.profile}/>
          ) : (
            <Row>
              <Col md={4}>
                <Skeleton height={200} />
              </Col>
              <Col md={7}>
                <Skeleton count={5} />
              </Col>
            </Row>
          )
        }
      </Page>
    )
  }
}
