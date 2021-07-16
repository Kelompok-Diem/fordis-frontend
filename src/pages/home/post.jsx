import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CaretUpFill, ChatLeftFill, Share } from 'react-bootstrap-icons';

import './style.scss';

export default class Post extends React.Component {
  render() {
    const stats = [
      {
        icon: <CaretUpFill color="#23AE87" size={35} />,
        number: this.props.votes,
      },
      {
        icon: <ChatLeftFill color="#D5E496" size={20} />,
        number: this.props.comment_count || 0,
      },
      {
        icon: <Share color="#000000" size={20} />,
        number: this.props.share_count,
      }
    ]

    return (
      <NavLink
        to={"/post/" + this.props._id}
        className="navigator"
      >
        <Container className="post-card">
          <h3>
            <b>
              {this.props.title}
            </b>
          </h3>
          <p>{this.props.content}</p>
          <Row>
            {stats.map((value, index) => {
              return (
                <Col md={1} xs={12} key={index}>
                  <Row>
                    <Col md={6}>
                      {value.icon}
                    </Col>
                    <Col md={6}>
                      <p>
                        {value.number}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )
            })}
          </Row>
        </Container>
      </NavLink>
    );
  }
}
