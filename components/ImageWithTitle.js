import React from "react";
import "../widget.css";
import muiThemeable from "material-ui/styles/muiThemeable";
import WidgetBase from "./WidgetBase";

class Widget extends React.Component {
  render() {
    const { title } = this.props;
    const handleClick = () => {
      console.log("click Widget");
      this.props.handle(this.props.image, title);
    };
    return (
      <div onClick={() => handleClick()}>
        <WidgetBase title={title}>
          <img src={this.props.image} alt="alt 3" style={this.props.style} />
        </WidgetBase>
      </div>
    );
  }
}
export default muiThemeable()(Widget);
