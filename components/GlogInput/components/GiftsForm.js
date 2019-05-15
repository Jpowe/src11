import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
//import TableContainer from "./Grid/TableContainer";
import FormContainer from "./Form/FormContainer";
import Stepper from "./Stepper";
import ListWidget from "./ListWidget";
import muiThemeable from "material-ui/styles/muiThemeable";
import PivotContainerGifts from "./PivotContainerGifts";
import ListSingleLevel from "./ListSingleLevel/ListSingleLevel";
import GiftsPartiesContainer from "./GiftsPartiesContainer";
import GiftsRequestsContainer from "./GiftsRequestsContainer";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";
import { registryStatuses } from "../common/data";
import GiftsExtraContainer from "./GiftsExtraContainer";

class GiftsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNew: this.props.action == "edit" ? true : false,
      showRequest: true
    };
  }
  componentDidMount() {
    console.log("GIFTFORM componentDidMount");
    this.state = {
      createNew: this.props.action == "edit" ? true : false
    };
  }

  formSave = () => {
    this.props.bubbleUp();
    this.setState({ createNew: true });
  };
  getMessage = action => {
    return action === "edit"
      ? `Edit selection or its associations.  Also edit Vendor/Order/Delivery details.`
      : "Enter new gift details.  After clicking 'save',  associate a request or parties to the gift.  Vendor/Order/Delivery details.";
  };
  change = (val, name) => {
    console.log("GiftsForm change ");
    console.log("val name : " + [val, name]);
    this.setState({ [name]: val });
    //  this.props.change(name, val);
    console.log("this.state.reqID " + this.state.reqID);
    this.props.updateGRG(this.state.reqID, {
      giftYear: val,
      status: ""
    });
  };
  bubbleUp = (x, obj) => {
    console.log("bubbleUp " + x, JSON.stringify(obj));
    this.setState({ showParties: true });
    this.setState({ reqID: x });
    //call updategiftrequest gift with state.giftYeaer, and request id....get gift id in action */
    /*
    this.props.updateGRG(x, {
      giftYear: this.state.giftYear,
      status: this.state.status
    });
    */
  };
  render() {
    const { title, muiTheme, action, data } = this.props;
    return (
      <Paper zDepth={1}>
        <h4>{this.getMessage(action)}</h4>
        <div style={{ height: "auto", padding: "21px" }}>
          <h2>{title}</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              padding: "10px"
            }}
          >
            <div style={{ padding: "10px" }}>
              <FormContainer
                bubbleUp={this.formSave}
                bubbleNew={() => this.setState({ createNew: true })}
                hideCreateButton={action === "edit"}
                config={this.props.configPersonalAssts}
              />
            </div>
            <div
              style={{
                padding: "10px",
                opacity: !this.state.createNew ? 0.3 : 1
              }}
            />
            <div
              style={{
                padding: "10px",
                opacity: !this.state.createNew ? 0.3 : 1
              }}
            >
              <Paper>
                <GiftsExtraContainer bubbleUp={this.change} />
              </Paper>
              <div>
                <GiftsRequestsContainer
                  bubbleUp={x => this.bubbleUp(x)}
                  onselect={x => this.onSelectParties(x)}
                  groups={this.props.requests}
                  multiSelect={true}
                  title={"Requests"}
                  giftRequestGiftPayload={{
                    giftYear: this.state.giftYear,
                    status: this.state.status
                  }}
                  showRequestContainer={x => this.setState({ showRequest: x })}
                  enabled={String(this.state.giftYear).length == 4}
                />
              </div>
            </div>

            <div
              style={{
                padding: "10px",
                opacity: !this.state.createNew ? 0.3 : 1
              }}
            >
              <div>
                <GiftsPartiesContainer
                  onselect={x => this.onSelectParties(x)}
                  groups={this.props.groups}
                  multiSelect={true}
                  title={"Parties"}
                  enabled={String(this.state.giftYear).length == 4}
                />
              </div>
            </div>
            <div style={{ padding: "10px" }}>
              <div style={{ opacity: !this.state.createNew ? 0.3 : 1 }}>
                <Stepper />
              </div>
            </div>
          </div>
          <div />
        </div>
      </Paper>
    );
  }
}

export default muiThemeable()(GiftsForm);
