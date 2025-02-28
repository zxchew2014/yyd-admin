import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import _ from "lodash";

class GenerateHeaderCellList extends React.Component {
  render() {
    const { headerList } = this.props;

    return _.map(headerList, value => {
      return <Table.HeaderCell key={value}>{value}</Table.HeaderCell>;
    });
  }
}

GenerateHeaderCellList.propTypes = {
  headerList: PropTypes.array.isRequired
};

export default GenerateHeaderCellList;
