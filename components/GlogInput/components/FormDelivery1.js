import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import FieldText from "./FieldText";
import TextField from "material-ui/TextField";
import FieldDropDown from "./FieldDropDown";
import GeoSuggest from "./GeoSuggest/MyGeoSuggest";
import ButtonAction from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Checkbox from "material-ui/Checkbox";

import FormDeliveryIntl from "./FormDeliveryIntl";

const dd = [
  { name: "location1", title: "Select location for delivery", value: 0 },
  { name: "location2", title: "Location 2", value: 1 },
  { name: "location3", title: "Location 3", value: 2 }
];

class FormDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = { saveEnabled: false, showNew: false, showIntl: false };
  }
  componentDidMount() {
    this.state = { data: this.props.data };
  }
  componentWillReceiveProps(nextProps) {
    console.log(" FormDelivery CWRP " + nextProps.selection);
    console.log("CWRP nextprops.data " + nextProps.data);
    this.setState({ tab: nextProps.selection });
  }
  showTextF(hint, value, label) {
    return (
      <div>
        <TextField
          value={value}
          hintText={hint}
          floatingLabelText={label}
          fullWidth={false}
          multiLine={false}
          name={"name"}
          style={{ width: "250px", fontSize: "20px" }}
        />
      </div>
    );
  }

  removePrevLoc = giftID => {
    console.log("this.props.locations " + this.props.locations);
    const getValues = arrObj => {
      console.log("getValues ");
      return R.map(x => x.id, arrObj);
    };
    const locs = this.props.locations;
    let row = R.find(x => R.contains(giftID, getValues(x.gift)), locs);
    console.table(row);
  };
  selectedDD = (location, giftID, previousLocID) => {
    console.log("selectedDD prevlocID " + previousLocID);
    this.removePrevLoc(giftID);
    let arrGift = [];
    arrGift = R.path(["gift"], location);
    console.log("arrGift " + JSON.stringify(arrGift));
    arrGift = R.filter(x => x.id !== previousLocID, arrGift);
    console.log("arrGift " + JSON.stringify(arrGift));
    arrGift.push({ id: giftID });
    console.log("arrGift " + JSON.stringify(arrGift));
    location.gift = arrGift;
    console.log(JSON.stringify(location));
    this.props.onType(location, giftID);
  };
  formatLocations = locations => {
    console.log("formatLocations");
    const parseObj = obj => {
      return {
        name: obj.streetAddress1,
        value: obj.id,
        title: obj.streetAddress1
      };
    };

    return R.map(x => parseObj(x), locations);
  };
  getValue = z => {
    let field = R.prop("name", z);
    return R.prop(field, this.props.data);
  };
  childChange = (val, name) => {
    this.setState({ data: { ...this.props.data, [name]: val } });
    this.props.onSave({ ...this.props.data, [name]: val });
    this.setState({ saveEnabled: true });
  };
  changeGiftLocation = (val, name) => {
    this.setState({ data: { ...this.props.gift, [name]: val } });
    this.props.onSaveGiftLocation({ ...this.props.gift, [name]: val });
    this.setState({ saveEnabled: true });
  };
  handleNewLoc = (obj, node, bool) => {
    console.log("FormDelivery handleNewLoc " + [obj, node, bool]);
    console.table(obj);

    this.setState({
      street: [
        { name: "location1", title: R.prop("streetAddress1", obj), value: 0 }
      ]
    });
    //  this.setState({ temp: [{ name: "location1", title: "temp", value: 0 }] });

    this.props.onAdd(obj, node, bool);
    this.changeGiftLocation(obj.id, "location");
  };
  getLocations = data => {
    console.log("getLocations");
    console.table(data);
    if (!data.location) {
      console.log("not data.location");
      return;
    }
    let arrLoc = R.path(["location", "formattedAddress"], data);

    const loc = `${arrLoc[0]}, ${arrLoc[1]}, ${arrLoc[2]}`;

    return [{ name: "location1", title: loc, value: 0 }];
  };

  render() {
    const {
      fields,
      data,
      locations,
      giftID,
      gift,
      deliveryAddresses
    } = this.props;
    return (
      <Paper zDepth={1}>
        <div style={{ border: "1px solid #bbb" }}>
          <div style={{ display: "flex", alignItem: "flex-end" }}>
            <div>
              <FieldDropDown
                options={
                  deliveryAddresses ? deliveryAddresses : this.state.street
                }
                status={0}
                onselect={value => this.changeGiftLocation(value, "location")}
              />
            </div>

            <div style={{ margin: "10px 20px 0px 0px" }}>
              <ButtonAction
                mini={true}
                onClick={() => this.setState({ showNew: !this.state.showNew })}
              >
                <ContentAdd />
              </ButtonAction>
            </div>
          </div>
          {this.state.showNew && (
            <div>
              <div style={{ margin: "20px 20px 0px 0px" }}>
                <Checkbox
                  label="International"
                  onClick={() =>
                    this.setState({ showIntl: !this.state.showIntl })
                  }
                  labelStyle={{ color: "#999" }}
                  checked={this.state.showIntl}
                />
              </div>

              {this.state.showIntl ? (
                <FormDeliveryIntl
                  onselect={o => this.handleNewLoc(o, "locations", false)}
                />
              ) : (
                <GeoSuggest
                  onselect={o => this.handleNewLoc(o, "locations", false)}
                />
              )}
            </div>
          )}
        </div>
        <div style={{ marginTop: "20px", color: "#990000" }}>
          Must select location BEFORE entering following fields:
        </div>
        {fields.map(x => (
          <FieldText
            obj={x}
            data={this.getValue(x)}
            change={this.childChange}
            type={x.type}
            multiLine={x.uiType}
          />
        ))}
      </Paper>
    );
  }
}

export default FormDelivery;
