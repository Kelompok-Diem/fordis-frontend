import React from 'react';
import { Navbar, Container, Image, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';

import { getProfile } from '../../functions/auth';

import './style.scss';
import Logo from '../../assets/images/logo.png';

const NavigationBarRouter = withRouter(props => <NavigationBar {...props} />);

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
    }
  }

  async componentDidMount() {
    this.setState({
      profile: await getProfile(),
    }, () => console.log(this.state));
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <Navbar
        className="navbar"
        expand="lg"
        sticky="top"
        bg="light"
      >
        <Container fluid>
          <Navbar.Brand>
            <NavLink to="/">
              <Image
                alt=""
                src={Logo}
                width="45%"
              />
            </NavLink>
          </Navbar.Brand>
          {pathname !== "/login" && pathname !== "/register" && (
            this.state.profile ? (
              <NavLink
                className="navigator profile-container"
                to={"/profile/" + this.state.profile._id}
              >
                <p className="profile name">{this.state.profile.full_name}</p>
                <p className="profile">{this.state.profile.email}</p>
              </NavLink>
            ) : (
              <Navbar.Collapse className="justify-content-end">
                <NavLink
                  to="/login"
                  className="login-button"
                >
                  <Button variant="outline-primary">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="primary">
                    Register
                  </Button>
                </NavLink>
              </Navbar.Collapse>
            )
          )}
        </Container>
      </Navbar>
    )
  }
}

export default NavigationBarRouter;
