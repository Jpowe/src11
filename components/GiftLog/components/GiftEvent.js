import React, { Component } from "react";
import { connect } from "react-redux";
import FormContainerGiftEvent from "./Form/FormContainerGiftEvent";

class GiftEvent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div>
        <FormContainerGiftEvent />
      </div>
    );
  }
}

export default GiftEvent;
