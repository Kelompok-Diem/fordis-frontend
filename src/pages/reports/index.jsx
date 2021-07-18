import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Page from '../../components/page';
import ReportTable from './table';

import { getAllReports } from '../../functions/report';

export default class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: null,
    }
  }

  async componentDidMount() {
    this.setState({
      reports: await getAllReports(),
    });
  }

  render() {
    const types = ["user", "post", "comment"];

    return (
      <Page>
        <h1>Report Table</h1>
        {this.state.reports ? (
          <>
            <Tabs defaultActiveKey={this.state.key}>
              {types.map((value, index) => {
                return (
                  <Tab
                    key={index}
                    eventKey={value}
                    title={value.charAt(0).toUpperCase() + value.slice(1)}
                  >
                    <ReportTable data={this.state.reports[value]}/>
                  </Tab>
                )
              })}
            </Tabs>
          </>
        ) : (
          <>
            <h1><Skeleton count={2}/></h1>
            <Skeleton count={5} />
          </>
        )}
      </Page>
    )
  }
}
