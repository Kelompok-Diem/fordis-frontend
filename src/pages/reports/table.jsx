import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../../components/delete_modal';

import { deleteReport } from '../../functions/report';

import './style.scss';

export default class ReportTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_delete_modal: false,
    }
  }

  render() {
    return (
      <Table
        hover
        className="report-table"
      >
        <thead>
          <tr>
            <th>Reporter</th>
            <th>The Report</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((value, index) => {
            return (
              <>
                <DeleteModal
                  show={this.state.show_delete_modal}
                  type="report"
                  hideModal={() => this.setState({ show_delete_modal: false })}
                  action={() => deleteReport(value._id)}
                />
                <tr key={index}>
                  <td>
                    <NavLink to={"/profile/" + value.reporter._id}>
                      {value.reporter.full_name}
                    </NavLink>
                  </td>
                  <td>{value.reason}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="delete-button"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.setState({ show_delete_modal: true })}
                    >
                      Delete
                    </Button>
                    <NavLink to={value.route}>
                      <Button>
                        Go To
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              </>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
