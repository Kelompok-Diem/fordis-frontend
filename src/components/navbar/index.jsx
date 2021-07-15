import React from 'react';
import { Navbar, Container, Image, Button } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';

import { getProfile } from '../../functions/auth';

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
        style={style.main}
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
                style={style.logo}
              />
            </NavLink>
          </Navbar.Brand>
          {pathname !== "/login" && pathname !== "/register" && (
            this.state.profile ? (
              <NavLink to="/profile">
                <p style={style.profile}><b>{this.state.profile.full_name}</b></p>
                <p style={style.profile}>{this.state.profile.email}</p>
              </NavLink>
            ) : (
              <Navbar.Collapse className="justify-content-end">
                <NavLink to="/login">
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

const style = {
  main: {
    height: "60px"
  },
  logo: {
    width: "45%"
  },
  profile: {
    margin: 0,
    textDecoration: "none",
    color: "black"
  },
}

export default NavigationBarRouter;
