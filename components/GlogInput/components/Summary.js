import React, { Component } from "react";
//import "./App.css";
import ListWidget from "./ListWidget";
import muiThemeable from "material-ui/styles/muiThemeable";
import Events from "./Events";
import RaisedButton from "material-ui/RaisedButton";
import { typography } from "material-ui/styles";
import Paper from "material-ui/Paper";
import MainListDropDown from "./MainListDropDown";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(JSON.stringify(this.props.dataPeople));
  }

  handleClickGifts(id) {
    console.log("handleClickGifts");
    this.props.onclick(id);
    //  this.props.onclick2("gifts");
  }
  handleClickRecipients(id) {
    console.log("handleClickRecips id " + id);
    this.props.onclick(id);
    //  this.props.onclick2("people");
  }
  handleClickRequests(id) {
    this.props.onclick(id);
    this.props.setRequestID(id);
    //  this.props.onclick2("requests");
  }
  render() {
    const { props } = this;
    return (
      <div>
        <MainListDropDown />
        <RaisedButton
          label="List of gift events for selected month"
          backgroundColor="#f58c32"
          labelColor={"#fff"}
          style={{ marginTop: "15px", marginRight: "20px" }}
          onClick={this.props.onDialog}
          //disabled={this.props.loading}
        />

        <hr />
        <Paper zDepth={2} style={{ backgroundColor: "#6076A9" }}>
          <h2
            style={{
              color: "#fff",
              fontWeight: typography.fontWeightLight,
              paddingTop: "10px",
              marginLeft: "10px"
            }}
          >
            Gift event instance
          </h2>

          <Events
            data={props.evt}
            gei={props.gei}
            onNew={this.props.onNew}
            onEvt={this.props.onEvt}
            onRegistry={this.props.onRegistry}
            onActive={this.props.onActive}
            onTextChange={this.props.onTextChange}
            onDialog={this.props.onDialog}
            ontoggle={this.props.ontoggle}
            color={props.muiTheme.palette.accent5Color}
            giftEventTypes={this.props.giftEventTypes}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              //  backgroundColor: "rgba(134, 54, 55, 0.3)",
              padding: "40px"
            }}
          >
            <div>
              <ListWidget
                title={"Parties"}
                data={props.dataPeople}
                primaryText={"name"}
                color={props.muiTheme.palette.accent4Color}
                color2={props.muiTheme.palette.accent5Color}
                color3={props.muiTheme.palette.primary3Color}
                onclick={id => this.handleClickRecipients(id)}
                ondelete={this.props.ondelete}
                onAdd={() => this.props.onAdd("people")}
                bDelete={true}
              />
            </div>
            <div>
              <ListWidget
                title={"Gift requests"}
                data={props.dataRequests}
                primaryText={"requestNotes"}
                color={props.muiTheme.palette.accent4Color}
                color2={props.muiTheme.palette.accent5Color}
                color3={props.muiTheme.palette.primary3Color}
                onclick={id => this.handleClickRecipients(id)}
                ondelete={this.props.ondelete}
                onAdd={() => this.props.onAdd("requests")}
                bDelete={true}
                secondaryText1={"recipients"}
              />
            </div>

            <div>
              <ListWidget
                title={"Gift history"}
                data={props.giftHistory}
                primaryText={"description"}
                color={props.muiTheme.palette.accent4Color}
                color2={props.muiTheme.palette.accent5Color}
                color3={props.muiTheme.palette.primary3Color}
                onclick={id => this.handleClickRecipients(id)}
                ondelete={this.props.ondelete}
                onAdd={() => this.props.onAdd("gifts")}
                bDelete={true}
                secondaryText1={"parties"}
                secondaryText2={"requests"}
                secondaryText3={"value"}
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
export default muiThemeable()(Summary);
