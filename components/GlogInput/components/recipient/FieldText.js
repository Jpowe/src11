import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { debounce } from "throttle-debounce";

class FieldText extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.change = debounce(1000, this.bubbleUp);
  }
  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      value: event.target.value
    });
    //  this.props.ontext(event.target.value);
    this.change(value, name);
  };
  bubbleUp = (value, name) => {
    this.props.ontext(value);
  };
  render() {
    const { obj } = this.props;
    return (
      <div style={{ padding: "2px" }}>
        <TextField
          value={this.state.value}
          hintText={this.props.hintText ? this.props.hintText : "Search here"}
          floatingLabelText={obj ? obj.title : null}
          fullWidth={false}
          multiLine={false}
          onChange={this.handleChange}
          name={obj ? obj.name : null}
          style={{ width: "600px", fontSize: "20px", backgroundColor: "#eee" }}
          underlineShow={true}
          //underlineFocusStyle={{ borderColor: "#f58c32" }}
        />
      </div>
    );
  }
}

export default FieldText;
