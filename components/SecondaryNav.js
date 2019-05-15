import React from "react";
import R from "ramda";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import { fullWhite } from "material-ui/styles/colors";

//import { ContentExplorer } from "box-ui-elements";
//import messages from "box-ui-elements/lib/i18n/en-US";
//import "box-ui-elements/dist/explorer.css";

///////////////////////import { Widget } from "react-chat-widget";
///////////////////////import "./secondaryNav.css";
/*
const token = "5llww8kfg6hc3x9fzhvtrpvgpzps69zy";
const getLocalizedMessage = (id, replacements) =>
  messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);
*/
const componentLogic = [
  { name: "addepar", action: "linkToExternal", data: "https://addepar.com/" },
  {
    name: "bloomberg",
    action: "linkToExternal",
    data: "https://bloomberg.com/"
  },
  { name: "boxui", action: "modal" },
  { name: "slackui", action: "modal" },
  { name: "officeui", action: "modal" }
];

//const getLocalizedMessage = (id, replacements) =>
///messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

export default class SecondaryNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selected: null
    };
  }
  linkToExternal(item) {
    console.log("linkToExternal " + item.data);
    window.open(item.data, "_blank");
  }
  modal(obj) {
    console.log("modal f " + obj.name);
    this.setState({ modalOpen: !this.state.modalOpen });
  }
  render() {
    const handleSubNav = n => {
      console.log("SecondaryNav handle subNav " + n);
      this.setState({ selected: n });
      const item = R.find(x => x.name == n, componentLogic);
      console.log("item " + item.action);
      this[item.action](item);
    };
    return (
      <div
        style={{
          backgroundColor: "#555",
          opacity: 0.8,
          height: "40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end"
        }}
      >
        <FlatButton
          label="Addepar"
          style={{ color: "#fff" }}
          onClick={() => handleSubNav("addepar")}
        />
        <FlatButton
          label="Bloomberg"
          style={{ color: "#fff" }}
          onClick={() => handleSubNav("bloomberg")}
        />
        <Dialog
          modal={false}
          open={this.state.modalOpen}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
          onRequestClose={() => this.setState({ modalOpen: false })}
          contentStyle={{
            width: "95%",
            maxWidth: "none"
          }}
        >
          <div>Subnav widget {this.state.selected}</div>
        </Dialog>
      </div>
    );
  }
}
