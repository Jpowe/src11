import React, { Component } from "react";
import Paper from "material-ui/Paper";
import * as R from "ramda";
import RaisedButton from "material-ui/RaisedButton";
import FieldText from "./FieldText";
import FieldDropDown from "./FieldDropDown";
import AutoComplete from "material-ui/AutoComplete";
import {
  isNumber,
  emailPattern,
  dateFormat,
  dateFormatMMDD
} from "../../utils/utils";

//  const { eventType } = data;
class Form extends Component {
  constructor(props) {
    console.log("FORM construct");
    super(props);
    this.state = {
      saveEnabled: false,
      title: this.props.title,
      data: this.props.data,
      searchText: this.props.formGiftEvent ? this.props.data.eventType[0] : ""
    };
  }
  componentDidMount() {
    console.table(this.props.data);
    this.state = {
      data: this.props.data,
      searchText: this.props.formGiftEvent ? this.props.data.eventType[0] : ""
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(" FORM CWRP " + JSON.stringify(nextProps));
    console.log("FORM CWRP nextprops.data " + nextProps.data);
  }
  handleChange = event => {
    this.setState({ saveEnabled: true });
    console.log(this.validate(this.state.data));
    this.validate(this.state.data);
    //  console.log(event.target.name);
  };
  handleSave = () => {
    console.log("Form handleSave  ");
    this.setState({ saveEnabled: false });
    this.props.onSave(this.state.data);
  };
  onSave = () => {
    this.handleSave();
  };
  getValue = (z, data = null) => {
    try {
      console.table(this.props.data);

      let field = R.prop("name", z);
      if (field == "value") {
        console.table(z);
      }
      console.log("field " + field);
      let fld = R.prop(field, this.props.data);
      console.table(data);
      console.log("fld " + fld);
      if (fld === 0) {
        console.log("here1");
        return "0";
      }
      if (fld === true) {
        console.log("here2");
        return "True";
      } else if (fld === false) {
        console.log("here3");
        return "False";
      }
      if (field === "eventDate") {
        const { eventDay, eventMonth } = this.props.data;
        return `${eventMonth} ${eventDay}`;
      }
      console.log(fld);
      return fld;
    } catch (e) {
      console.log("CATCH " + e.message);
    }
  };
  getValueDD = (z, data) => {
    let v = this.getValue(z, data);
    console.log("v " + v);
    console.log("z.options " + JSON.stringify(z.options));
    try {
      if (!z.options || v == "undefined") {
        return;
      }
      if (Number(v)) {
        return v;
      }
      if (!v) {
        console.log("here !");
        return 0;
      }
      console.log(R.find(x => x.name == String(v), z.options));
      console.log(R.prop("value", R.find(x => x.name == String(v), z.options)));
      return R.prop("value", R.find(x => x.name == String(v), z.options));
    } catch (e) {
      console.log(e.message);
    }
  };

  childChange = (val = "", name) => {
    let data = this.state.data;
    data = { ...data, [name]: val };
    this.setState({ data: data });
    console.log(this.validate(this.state.data));
    this.validate(data)
      ? this.setState({ saveEnabled: true })
      : this.setState({ saveEnabled: false });
  };

  onNew = () => {
    this.setState({
      title: "Enter data for new entry",
      createNewDisabled: true
    });
    this.props.onNew();
  };
  onAdd = () => {
    this.setState({
      saveEnabled: false,
      createNewDisabled: false,
      title: "Showing data"
    });
    this.props.onAdd();
  };
  showOptions = options => {
    return options;
  };

  handleUpdateInput = searchText => {
    console.log("EVENTS.js handleUpdateInput " + searchText);
    this.setState({
      searchText: searchText
    });
  };
  handleNewRequest = (str, i) => {
    console.log("handleNewRequest f " + [str, i]);
    let data = this.state.data;
    data = { ...data, [str]: i };
    this.setState({ data: data });

    console.log(this.validate(this.state.data));
    this.validate(data)
      ? this.setState({ saveEnabled: true })
      : this.setState({ saveEnabled: false });
    //this.props.onSave({ ...this.props.data, str: i });
  };
  validate = obj => {
    console.log("FCGE validate f ");
    console.table(obj);
    try {
      const reqFields = R.filter(x => x.required, this.props.fields);
      console.log("requFIelds ...");
      console.table(reqFields);
      const fieldValid = reqObj => {
        let isValid = true;
        console.log("fieldValid " + JSON.stringify(reqObj));
        console.log(
          "R.prop(v,obj) " + JSON.stringify(R.prop(R.prop("name", reqObj), obj))
        );
        if (reqObj.type === "date") {
          isValid = dateFormat.test(R.prop(R.prop("name", reqObj), obj));
        } else if (reqObj.type === "dateMMDD") {
          console.log(dateFormatMMDD(R.prop(R.prop("name", reqObj), obj)));
          isValid = dateFormatMMDD(R.prop(R.prop("name", reqObj), obj));
        } else {
          console.log(
            "!R.prop(R.prop(name, reqObj), obj) " +
              R.prop(R.prop("name", reqObj), obj)
          );
          if (R.prop(R.prop("name", reqObj), obj) === undefined) {
            console.log(R.prop(R.prop("name", reqObj), obj));
            isValid = false;
          }
        }
        return isValid;
      };
      const arrValids = R.map(x => fieldValid(x), reqFields);
      console.log("arr valids " + arrValids);
      this.setState({ validated: !R.contains(false, arrValids) });
      return !R.contains(false, arrValids);
    } catch (err) {
      console.log(err.message);
    }
  };
  /*
  getSearchText = data => {
    console.log("getSearchText ");
    console.table(data);
    const { eventType } = data;
    console.log("eventType " + eventType);
    return eventType[0];
  };*/
  getWidth = prop => {
    return prop ? prop : "400px";
  };
  render() {
    const { fields, showNew } = this.props;
    return (
      <Paper zDepth={1}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#A4AECB",
            minWidth: this.getWidth(this.props.width)
          }}
        >
          <RaisedButton
            label="Save"
            backgroundColor="#f58c32"
            labelColor={"#fff"}
            //  onClick={this.onAdd}
            onClick={this.onSave}
            disabled={!this.state.saveEnabled}
          />
          {showNew && (
            <RaisedButton
              label="CREATE NEW"
              backgroundColor="#f58c32"
              labelColor={"#fff"}
              onClick={this.onNew}
              disabled={this.state.saveEnabled}
              style={{ marginLeft: "4px" }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            height: "auto",
            padding: "21px"
          }}
        >
          <div>
            {fields &&
              this.props.data &&
              fields.map(
                (x, i) =>
                  x.uiType === "dropDown" ? (
                    <div>
                      <div
                        style={{
                          color: "#DF5C33",
                          //  fontSize: "small",
                          marginLeft: "4px",
                          marginTop: "10px"
                        }}
                      >
                        {x.required ? `${x.title} *` : x.title}
                      </div>
                      <FieldDropDown
                        options={x.options}
                        status={this.getValueDD(x, this.props.data)}
                        //data={ }
                        onselect={value => this.childChange(value, x.name)}
                      />
                    </div>
                  ) : x.uiType === "autoComplete" ? (
                    <div>
                      <div
                        style={{
                          color: "#DF5C33",
                          //  fontSize: "small",
                          marginLeft: "4px",
                          marginTop: "10px"
                        }}
                      >
                        {x.required ? `${x.title} *` : x.title}
                      </div>
                      <AutoComplete
                        hintText="Select gift event type"
                        searchText={
                          this.state.searchText ? this.state.searchText : " "
                        }
                        onUpdateInput={this.handleUpdateInput}
                        onNewRequest={str => this.handleNewRequest(x.name, str)}
                        dataSource={x.options ? x.options : []}
                        //filter={(searchText, key) => key.indexOf(searchText) !== -1}
                        filter={AutoComplete.fuzzyFilter}
                        openOnFocus={true}
                        name={x.name}
                        style={{ marginLeft: "4px" }}
                      />
                    </div>
                  ) : x.uiType === "textArea" ? (
                    <FieldText
                      obj={x}
                      data={this.getValue(x)}
                      change={this.childChange}
                      type={x.type}
                      multiLine={true}
                    />
                  ) : (
                    <FieldText
                      obj={x}
                      data={this.getValue(x)}
                      change={this.childChange}
                      type={x.type}
                    />
                  )
              )}
          </div>
        </div>
      </Paper>
    );
  }
}

export default Form;
