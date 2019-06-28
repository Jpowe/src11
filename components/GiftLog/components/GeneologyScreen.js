import React, { Component } from "react";
import * as R from "ramda";
import GeneologyComponent from "./Geneology/Geneology";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";
import PersonForm from "./Form/FormContainerPerson";
import OrgForm from "./Form/FormContainerOrg";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import FlatButton from "material-ui/FlatButton";

class GeneologyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { filterStr: "", searchType: "person", tab: "SEARCH" };
    console.log("GeneologyScreen construct");
  }
  componentDidMount() {}
  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);
    if (v.length > 2) {
      this.setState({ showForm: true });
    }
    this.setState({ filterStr: v });
    this.props.onSearchText(v);
  };
  /* if results >6 scroll to see more msg*/
  searchResultsMsg = nResults => {
    return nResults > 6
      ? `${nResults} results found.  Scroll table to see more results.`
      : nResults <= 6
        ? `${nResults} results found.`
        : "No results.  Add party.";
  };
  onRadio = (event, value) => {
    console.log(value);
    this.setState(prevState => ({ searchType: value }));
    this.setState({
      filterStr: null
    });
    this.props.onSearchText("randomstringNoResults");
    this.props.onSearchType(value);
  };

  handleChangeTabs = val => {
    //his.state.tab === "search" ? "form" : "search";
    console.log("handleChangeTabs val " + val);
    let tab = R.toUpper(val) === "SEARCH" ? "SEARCH" : "FORM";
    this.setState({ tab: tab });
  };

  renderTab = (value, icons = {}) => {
    console.log("RenderTab " + [value, this.state.tab]);
    const sty = (a, b) => {
      return a == b
        ? {
            pointerEvents: "none",
            textDecoration: "none",
            backgroundColor: "#E0E0E0",
            //fontSize: "20px",
            //  color: "#440000",
            borderWidth: "1px 4px 1px 4px",
            borderStyle: "solid",
            marginRight: "2px",
            height: "38px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottom: "1px solid #E0E0E0",
            zIndex: 2
          }
        : {
            //textDecoration: "underline",
            backgroundColor: "#d6d6d6",
            //  color: "#fff",
            borderWidth: "1px 1px 1px 1px",
            borderStyle: "solid",
            marginRight: "2px",
            height: "38px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderBottom: "1px solid #333",
            zIndex: 2
          };
    };
    const renderLabelStyle = { opacity: 1 };

    return (
      <div>
        <FlatButton
          onClick={() => this.handleChangeTabs(value)}
          label={value === "FORM" ? "EDIT" : value}
          labelStyle={renderLabelStyle}
          style={sty(this.state.tab, value)}
          //disabled={this.state.tab == value}
        />
      </div>
    );
  };

  render() {
    const { nResults } = this.props;
    return (
      <div>
        <GeneologyComponent
          data={this.props.rows}
          setCurrentSelection={this.props.setCurrentSelection}
          selectedPerson={this.props.selectedPerson}
          expandSelection={this.props.expandSelection}
          parentChildRelationship={(parentUUID, childUUID, addRemove) =>
            this.props.parentChildRelationship(parentUUID, childUUID, addRemove)
          }
          partnerRelationship={this.props.partnerRelationship}
        />
        {!this.props.rows.length > 0 && (
          <div style={{ padding: "400px", fontSize: "large" }}>
            Search for and add parties below
          </div>
        )}
        <div
          style={{
            padding: "20px",
            color: "white",
            backgroundColor: "green",
            position: "absolute",
            top: "800px",
            padding: "4px",
            minWidth: "1200px"
          }}
        >
          <div style={{ display: "flex", padding: "8px" }}>
            <div>{this.renderTab("SEARCH")}</div>
            <div>{this.renderTab("FORM", { add: true, edit: true })}</div>
          </div>

          {this.state.tab === "SEARCH" && (
            <div>
              <div style={{}}>
                <div style={{ width: "600px", marginLeft: "2px" }}>
                  <RadioButtonGroup
                    name="f"
                    defaultSelected="person"
                    onChange={this.onRadio}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      backgroundColor: "#ffffff",
                      opacity: ".8"
                    }}
                  >
                    <RadioButton value="person" label="People" />
                    <RadioButton value="org" label="Orgs" />
                    <RadioButton value="group" label="Groups" />
                  </RadioButtonGroup>
                </div>
                <FieldText ontext={this.filterStr} />
              </div>
              <span style={{ marginLeft: "20px" }}>
                {this.searchResultsMsg(nResults)}
              </span>
              <TableContainer searchType={this.state.searchType} />
            </div>
          )}
          {this.state.searchType === "person" &&
            this.state.tab !== "SEARCH" && <PersonForm />}
          {this.state.searchType === "org" &&
            this.state.tab !== "SEARCH" && <OrgForm />}
          {this.state.searchType === "group" &&
            this.state.tab !== "SEARCH" && (
              <div style={{ padding: "12px" }}>
                <hr />
                NO EDITING OR CREATING OF GROUPS. BLAME FRED
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default GeneologyScreen;
