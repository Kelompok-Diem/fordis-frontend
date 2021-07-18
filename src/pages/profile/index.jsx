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
      initialValues: null,
      user: null,
      position: null,
    }
  }

  async getImageFile(image_url, callback) {
    if (image_url === null) {
      callback(null);

      return;
    }

    await fetch(image_url)
      .then(async response => {
        const contentType = response.headers.get('content-type')
        const blob = await response.blob()
        const file = new File([blob], "currentImage.jpg", { contentType })

        callback(file);
      })
  }

  async componentDidMount() {
    const profile = await getUser(this.props.match.params.id);

    let initialValues = {};
    const fields = ["_id", "full_name", "email", "gender", "role"];

    for (const value of fields) {
      initialValues[value] = profile[value];
    }

    if (profile.photo === null) {
      initialValues.photo = null;
    } else {
      await this.getImageFile(process.env.REACT_APP_API_URL + "/images/" + profile.photo, (file) => {
        initialValues.photo = file;
      });
    }

    this.setState({
      initialValues: initialValues,
      user: profile.user,
      position: {
        is_admin: profile.is_admin,
        is_moderator: profile.is_moderator,
      }
    })
  }

  render() {
    return (
      <Page>
        <h1 className="title">Profile</h1>
        {this.state.initialValues
          ? (
            <ProfileForm
              {...this.state}
              history={this.props.history}
            />
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
