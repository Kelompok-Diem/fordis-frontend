import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="three-dots-container"
  >
    <ThreeDotsVertical />
  </a>
));

export default class Menu extends React.Component {
	render() {
		return (
      <Dropdown alignRight>
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
        >
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.children}
        </Dropdown.Menu>
      </Dropdown>

		)
	}
}
