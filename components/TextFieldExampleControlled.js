import React from "react";
import TextField from "material-ui/TextField";

export default class TextFieldExampleControlled extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.txt
    };
  }

  handleChange = event => {
    console.log("handlechange");
    this.setState({
      value: event.target.value
    });
  };

  render() {
    return (
      <div style={{ fontStyle: "italic" }}>
        <TextField
          hintText="enter comments here"
          multiLine={false}
          rows={1}
          rowsMax={4}
          value={this.state.value}
          defaultValue=""
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
