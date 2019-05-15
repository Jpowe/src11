import React, { Component } from "react";
import { Link } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
//import Toggle from 'material-ui/Toggle';
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";
import muiThemeable from "material-ui/styles/muiThemeable";
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
import TextFieldExampleControlled from '../components/TextFieldExampleControlled'
import Toggle from "material-ui/Toggle";

import ToggleCheck from "material-ui/svg-icons/toggle/check-box";
import ToggleBlank from "material-ui/svg-icons/toggle/check-box-outline-blank";
import ToggleIndeterminate from "material-ui/svg-icons/toggle/indeterminate-check-box";

import {List, ListItem} from 'material-ui/List';

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
const tableData = [
  {
    name: "John Smith",
    status: "In",
    comment: "John is in 24/7"
  },
  {
    name: "Randal White",
    status: "Out",
    comment: "Randal is out at dentist."
  },
  {
    name: "Stephanie Sanders",
    status: "?",
    comment: "???"
  },
  {
    name: "Steve Brown",
    status: "In",
    comment: "In... comment"
  },
  {
    name: "Joyce Whitten",
    status: "In"
  },
  {
    name: "Samuel Roberts",
    status: "In"
  },
  {
    name: "Adam Moore",
    status: "In"
  },
  {
    name: "John Smith",
    status: "In"
  },
  {
    name: "Randal White",
    status: "Out"
  },
  {
    name: "John Smith",
    status: "In"
  },
  {
    name: "Randal White",
    status: "Out"
  },
  {
    name: "John Smith",
    status: "In"
  },
  {
    name: "Randal White",
    status: "Out"
  }
];

class TableExampleComplex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: "300px",
     val: 'n',
    };
  }

  //muiTheme = this.props.muiTheme;

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled
    });
  };
  handleChange = event => {
    this.setState({ height: event.target.value });
  };
  handleName = (name, status) => (status === "In" ? name.toUpperCase() : name);

  handleRowStyle = status => {
    if (status === "Out") {
      return { backgroundColor: this.props.muiTheme.palette.accent1Color };
    } else if (status === "?") {
      return { backgroundColor: "#90A4AE", color: "red" };
    }
  };
  handleStatusItemStyle = status => {
    console.log('handleStatusItemStyle')

    if (status === "Out") {
      return <ToggleBlank style={{color:'#000099',backgroundColor:'red'}}/>;
    } else if (status === "?") {
      return <ToggleIndeterminate />;
    } else if (status === "In") {
      return <ToggleCheck style={{backgroundColor:'#5fb888',color:'#000099'}}/>;
    }
  };

  render() {
    return (
      <PageBase title="" navigation="BSCC portal / In and out app">

        <List>

          {tableData.map((row, index) =>
              <ListItem style={{backgroundColor:'#Cccccc', margin:1, height:75}} primaryText={this.handleName(row.name,row.status)}
                  leftIcon={this.handleStatusItemStyle(row.status)}
                  secondaryText={<span><TextFieldExampleControlled txt={row.comment}/></span>}
              />
      )}
    </List>





      </PageBase>
    );
  }
}

export default muiThemeable()(TableExampleComplex);
