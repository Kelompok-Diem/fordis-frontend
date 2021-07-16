import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CaretUpFill, ChatLeftFill, Share } from 'react-bootstrap-icons';

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
      <NavLink to={"/post/" + this.props._id}>
        <Container style={style.main}>
          <h3 style={style.text}>
            <b>
              {this.props.title}
            </b>
          </h3>
          <p style={style.text}>{this.props.content}</p>
          <Row>
            {stats.map((value, index) => {
              return (
                <Col md={1} xs={12} key={index}>
                  <Row>
                    <Col md={6}>
                      {value.icon}
                    </Col>
                    <Col md={6} className="linked">
                      <p style={style.text}>
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

const style = {
  main: {
    border: "1px solid black",
    borderRadius: "17px",
    marginBottom: "50px",
    padding: "20px 40px",
  },
  text: {
    textDecoration: "none",
    color: "black",
  }
}
