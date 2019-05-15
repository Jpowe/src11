import React, { Component } from "react";
import Geosuggest from "react-geosuggest";
import "./GeoSuggest.css";
import Paper from "material-ui/Paper";
import uuidv4 from "uuid/v4";
import FieldText from "../FieldText";
import RaisedButton from "material-ui/RaisedButton";

export default class MyGeoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apt: null
    };
  }
  componentDidMount() {
    this._geoSuggest.focus();
  }
  formatAddy(o) {
    console.log("raw addy:" + o.gmaps.formatted_address);
    const rawAddy = o.gmaps.formatted_address.split(",");
    const street = rawAddy[0].trim();
    const city = rawAddy[1].trim();
    let stateZip = rawAddy[2].split(" ");
    const state = stateZip[1].trim();
    const zip = stateZip[2].trim();
    this.setState({
      streetAddress1: street,
      city: city,
      state: state,
      zip: zip,
      placeID: o.placeId,
      latitude: o.location.lat,
      longitude: o.location.lng
    });
    /*
    return {
      id: uuidv4(),
      streetAddress1: street,
      city: city,
      state: state,
      zipcode: zip,
      person: [],
      gift: [],
      placeID: o.placeId,
      apt: this.state.apt
    };
    */
  }

  onSelect(o) {
    console.log({ o });
    o ? this.formatAddy(o) : null;
    //this._geoSuggest.clear();
  }
  aptChange = str => {
    console.log("aptChange str " + str);
    this.setState({ apt: str });
  };
  handleSubmit = () => {
    console.log("handleSubmit geo");
    let o = {
      id: uuidv4(),
      streetAddress1: this.state.streetAddress1,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zip,
      placeID: this.state.placeID,
      apt: this.state.apt,
      longitude: this.state.longitude,
      latitude: this.state.latitude
    };
    this.props.onselect(o);
  };
  render() {
    return (
      <Paper zDepth={2}>
        <div style={{ backgroundColor: "#DF5C33" }}>
          <Geosuggest
            ref={el => (this._geoSuggest = el)}
            onSuggestSelect={o => this.onSelect(o)}
            renderSuggestItem={suggestion => suggestion.description}
            placeholder={
              "Enter new address. Selection becomes address for gift."
            }
            minLength={3}
          />
        </div>
        <div style={{ margin: 8 }}>
          <FieldText
            obj={{ title: "Apt/Suite" }}
            //data={this.getValue(x)}
            change={this.aptChange}
          />
        </div>
        <RaisedButton
          label="Save address"
          primary={true}
          onClick={this.handleSubmit}
          style={{ margin: 8 }}
        />
      </Paper>
    );
  }
}
