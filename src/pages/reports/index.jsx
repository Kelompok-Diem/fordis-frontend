import React from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import Page from '../../components/page';
import ReportTable from './table';

export default class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "user",
    }
  }

  render() {
    return (
      <Page>
        <h1>Report Table</h1>
        <Tabs
          activeKey={this.state.key}
          onSelect={(k) => this.setState({ key: k })}
        >
          <Tab eventkey="user" title="User">
          </Tab>
          <Tab eventkey="post" title="Post">
          </Tab>
          <Tab eventkey="comment" title="Comment">
          </Tab>
        </Tabs>
        <ReportTable />
      </Page>
    )
  }
}
