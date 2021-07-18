import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default class ReportTable extends React.Component {
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
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <Button
                variant="outline-primary"
                className="delete-button"
                style={{ marginRight: "10px" }}
              >
                Delete
              </Button>
              <Button>
                Go To
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
