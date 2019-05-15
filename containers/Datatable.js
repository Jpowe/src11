import React, {Component} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
//import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
//import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
//import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,

} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import DataTables from 'material-ui-datatables';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

const TABLE_COLUMNS = [
{
  key: 'name',
  label: 'Dessert (100g serving)',
  sortable: true,

}, {
  key: 'calories',
  label: 'Calories',
  sortable: true,
},

];

const TABLE_DATA = [
{
  name: 'Frozen yogurt',
  calories: '155',
  fat: '6.0',
  carbs: '24',
  protein: '4.0',
  sodium: '87',
  calcium: '14%',
  iron: '1%',
}, {
  name: 'Ice cream sandwich',
  calories: '159',
  fat: '6.0',
  carbs: '24',
  protein: '4.0',
  sodium: '87',
  calcium: '14%',
  iron: '1%',
},

];

  export default class MyComponent extends Component {

  render() {
    return (
      <PageBase title="datatable"
                navigation="BSCC portal / datatable">
      <DataTables
        height={'auto'}
        showHeaderToolbar={true}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={TABLE_DATA}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onFilterValueChange={this.handleFilterValueChange}
        onSortOrderChange={this.handleSortOrderChange}
        page={1}
        count={100}
  />
  </PageBase>
    );
  }
}
