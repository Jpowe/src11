import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { white } from "material-ui/styles/colors";

//import {Link} from 'react-router';
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import { grey400 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";

export default class Support extends React.Component {
  state = {
    active: false
  };

  styles = {
    title: {
      color: white
    },
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: "right"
    },
    saveButton: {
      marginLeft: 5
    }
  };
  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  actions = [
    <FlatButton
      label="IGNORE BUTTON"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleToggle}
    />
  ];

  render() {
    return (
      <span>
        <FlatButton
          label="Support"
          onClick={this.handleToggle}
          primary={true}
        />
        <Dialog
          title="SUPPORT TICKET"
          actions={this.actions}
          modal={false}
          open={this.state.active}
          onRequestClose={this.handleToggle}
        >
          <form>
            <TextField
              hintText="Name"
              floatingLabelText="Name"
              fullWidth={true}
              errorText="This field is required"
            />

            <TextField
              hintText="Describe issue--multiline"
              floatingLabelText="Issue"
              fullWidth={true}
              errorText="This field is required"
              multiLine={true}
            />

            <SelectField floatingLabelText="URGENCY" value="" fullWidth={true}>
              <MenuItem key={0} primaryText="NOW" />
              <MenuItem key={1} primaryText="YESTERDAY" />
              <MenuItem key={2} primaryText="ASAP" />
            </SelectField>

            <DatePicker
              hintText="DUE Date"
              floatingLabelText="Expiration Date"
              fullWidth={true}
            />

            <div style={this.styles.toggleDiv}>
              <Toggle label="Disabled" labelStyle={this.styles.toggleLabel} />
            </div>
            <Divider />
            <div style={this.styles.buttons}>
              <RaisedButton
                label="Send"
                style={this.styles.saveButton}
                type="submit"
                primary={true}
              />
            </div>
          </form>
        </Dialog>
      </span>
    );
  }
}
