import React, { Component } from "react";
import "./App.css";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
//import HighLightOff from "react-material-icons/icons/action/highlight-off";
import muiThemeable from "material-ui/styles/muiThemeable";

class NotifyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //one: true,
      title: "what",
      expanded: false
    };
    this.testFunc = this.testFunc.bind(this);
  }
  testFunc() {
    return this.state.title;
  }
  handleExpandChange() {
    console.log("handleExpandChange");
  }
  handleToggle() {
    console.log("handleToggle");
  }
  render() {
    const { onclick } = this.props;
    return (
      <div>
        <Card style={this.props.styl}>
          <CardHeader
            title={this.props.item.title}
            titleColor={this.props.styl.color}
            subtitle=""
            style={{ height: "20px" }}
          />
          <CardText style={this.props.styl.backgroundColor}>
            {this.props.item.message}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default muiThemeable()(NotifyCard);
