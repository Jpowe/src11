import React, { Component } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
//import TextField from 'material-ui/TextField';
import SelectField from "material-ui/SelectField";
//import Toggle from 'material-ui/Toggle';
import DatePicker from "material-ui/DatePicker";
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
//import PageBase from "../components/PageBase";
import _ from "lodash";
import R from "ramda";
import Data from "../data";

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";

import DataTables from "material-ui-datatables";

const styles = {
  propContainer: {
    width: 200,
    overflow: "hidden",
    margin: "20px auto 0"
  },
  propToggleHeader: {
    margin: "20px auto 10px"
  }
};

const TABLE_COLUMNS = [
  {
    key: "name",
    label: "NAME",
    sortable: true
  },
  {
    key: "calories",
    label: "CALORIES",
    sortable: true
  }
];

export default class MyComponent extends Component {
  //constructor() {

  constructor(props) {
    super(props);

    this.state = {
      data: Data.genericTableData,
      data2: Data.genericTableData,
      t: ">a"
    };
  }

  //  } //constructor

  handleSortOrderChange() {
    console.log("handleSortOrderChange f called");

    //this.setState({t:'b'})
    //this.setState({test: [{ id: 1, name: 'Chikwa Eligson2',age: 224, location: '2Lagos', level: 'stage-1', mood: 'happy' }]});
  }

  render() {
    const sortin = data => {
      return _.sortBy(data, ["calories"]);
    };
    /*
    const searchIn = (a, e) => {
      let re1 = new RegExp(e, "g");
      let re2 = re1.exec(n);
      return re2;
    };
    */
    /*
    const handleFilterValueChange = e => {
      console.log("handleFilterValueChange " + e);
      this.setState({ data2: R.filter(a => searchIn(a, e))(this.state.data) });
    };
    */
    const initState = () => {
      this.setState({ data2: this.state.data });
      return this.state.data2;
    };
    return (
      <DataTables
        height={"auto"}
        showHeaderToolbar={true}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={this.state.data2}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onSortOrderChange={() =>
          this.setState({ data2: sortin(this.state.data2) })}
        page={1}
        count={100}
      />
    );
  }
}
