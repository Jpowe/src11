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
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

import FormDeliveryIntl from "./FormDeliveryIntl";

const dd = [
  { name: "location1", title: "Select location for delivery", value: 0 },
  { name: "location2", title: "Location 2", value: 1 },
  { name: "location3", title: "Location 3", value: 2 }
];

class FormDelivery extends Component {
  constructor(props) {
    console.log("FORMDELIVERY CONSTRUCT");
    super(props);
    this.state = {
      saveEnabled: false,
      showNew: true,
      showIntl: false,
      location: this.props.currentLocation
    };
  }

  componentDidMount() {
    console.log("FORMDELIVERY COMPDIDMOUNT");
    this.state = {
      data: this.props.data
      //  location: this.props.currentLocation
    };
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
    let newObj;
    if (val === "") {
      newObj = { ...this.props.data, [name]: " " };
    } else {
      newObj = { ...this.props.data, [name]: val };
    }
    this.setState({ data: { ...this.props.data, [name]: val } });
    this.props.onSave({ ...this.props.data, [name]: val });
    this.setState({ saveEnabled: true });
  };
  changeDeliveryLoc = (event, index, value) => {
    console.log("FormDelivery changeDeliveryLoc id   " + value);
    this.setState({ data: { ...this.props.data, location: value } });
    this.setState({ location: value });
    //  const s = R.find(x => x.value == id, this.state.locations);
    //  console.table(s);
    //const newOrder = R.reverse([...this.state.locations, s]);
    //console.table(newOrder);
    //this.setState({ locations: newOrder });
    this.props.changeDeliveryLoc(value);
  };
  changeGiftLocation = (val, name) => {
    console.log("FormDelivery changeGiftLocation " + [val, name]);
    this.setState({ data: { ...this.props.gift, [name]: val } });
    //  this.props.onSaveGiftLocation({ ...this.props.gift, [name]: val });
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
    this.setState({ location: R.prop("placeID", obj) });

    this.props.onAdd(obj, node, bool);
    //this.changeGiftLocation(obj.id, "location");
  };
  getLocations = (data, deliveryAddresses) => {
    console.table(data);
    console.log(JSON.stringify(deliveryAddresses));
    /* !!use DATA to set state */
    console.table(deliveryAddresses);
    let addresses = deliveryAddresses;
    return addresses;
    /*
    const createAddress = obj => {
      return {
        name: obj.placeID,
        title: obj.streetAddress1,
        value: obj.id
      };
    };
    */
    /////////return R.map(createAddress, addresses);
    if (data && data["location"]) {
      console.table([
        ...addresses,
        {
          name: data.location.formattedAddress[0],
          title: data.location.formattedAddress.toString(),
          value: data.location.uuid
        }
      ]);
      return [
        ...addresses,
        {
          name: data.location.formattedAddress[0],
          title: data.location.formattedAddress.toString(),
          value: data.location.uuid
        }
      ];
    } else {
      return addresses;
    }

    /*
    if (!data.location) {
      console.log("not data.location");
      return;
    }
    let arrLoc = R.path(["location", "formattedAddress"], data);
    const loc = `${arrLoc[0]}, ${arrLoc[1]}, ${arrLoc[2]}`;
    return [{ name: "location1", title: loc, value: 0 }];
    */
  };
  check = data => {
    console.log("check " + data);
    return data;
  };
  showItems = () => {
    if (!this.props.locations) {
      return;
    }
    const uniqVals = R.uniqBy(R.prop("value"), this.props.locations);
    return R.map(
      x => <MenuItem value={x.value} primaryText={x.title} />,
      uniqVals
    );
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
              <DropDownMenu
                value={this.state.location ? this.state.location : null}
                onChange={this.changeDeliveryLoc}
                style={{
                  padding: "0px",
                  margin: "0px",
                  fontSize: "large",
                  left: "-20px"
                }}
              >
                {this.showItems()}
              </DropDownMenu>
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
      </Paper>
    );
  }
}

export default FormDelivery;
