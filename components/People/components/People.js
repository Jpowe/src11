import React, { Component } from "react";
import * as R from "ramda";
import "../../../App.css";
import Paper from "material-ui/Paper";
import globalStyles from "../../../styles";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import FieldText from "./FieldText";
import TableContainer from "./Search/TableContainer";
import GiftSortYearView from "./GiftSortYearView";
import GiftEventView from "./GiftEventView";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import PersonForm from "./FormContainerPerson";
const data = [
  { uuid: 1, urgent: true, name: "a" },
  { uuid: 2, urgent: true, name: "b" },
  { uuid: 3, urgent: false, name: "c" }
];

/*
*Table container shows person search results
* sort by YEAR OR GiftEvents
*
*/
class People extends Component {
  constructor(props) {
    super(props);
    this.state = { data: data, view: "formPerson", value: 1 };
  }
  componentDidMount() {}

  filterStr = v => {
    console.log("filterStr str= " + v);
    console.log("filterLength " + v.length);
    this.setState({ filterStr: v, view: "formPerson" });
    this.props.onSearchText(v);
  };
  getYears = rows => {
    try {
      const getGRs = rows => {
        return R.flatten(R.map(x => R.prop("eventGiftRequests", x), rows));
      };
      const getGiftsYrs = grs => {
        const d1 = R.flatten(R.map(x => R.prop("requestGifts", x), grs));
        return R.uniq(R.map(x => x.giftYear, d1));
      };
      const diff = function(a, b) {
        return b - a;
      };
      return R.sort(diff, getGiftsYrs(getGRs(rows)));
    } catch (e) {
      console.log(e.message);
    }
  };
  /*
  removeGRs = (data,yrs) => {
    console.log("removeGRs");

    //arrSHOW_GRS:[{year:2019,gr:abc2},{year:2018:gr:3dc4}]

    const f = (yr,ges)=>{
      R.map(x=>R.contains?(x.eventGiftRequests) ,ges)
    }
    yrs.map((yr,index)=>{
      f(yr,data[index])
    })


    return data;
  };
  */
  /* sort rows for BY YEAR */
  sortRows = rows => {
    console.log("People.sortRows");
    console.table(rows);
    console.log(JSON.stringify(rows));
    try {
      let arrSHOW_GRS = [];
      console.log(JSON.stringify(this.getYears(rows)));
      const arrYears = this.getYears(rows);
      const giftYrInGE = (yr, ge) => {
        return R.contains(
          true,
          R.map(x => giftYrInGR(yr, x), ge.eventGiftRequests)
        )
          ? ge.uuid
          : null;
      };
      const giftYrInGR = (yr, gr) => {
        if (!!R.find(x => x.giftYear == yr, R.prop("requestGifts", gr))) {
          console.log("true " + gr.uuid);
          arrSHOW_GRS.push({ year: yr, gr: gr.uuid });
        }
        return R.find(x => x.giftYear == yr, R.prop("requestGifts", gr))
          ? true
          : false;
      };
      const useGEs = yr => R.map(x => giftYrInGE(yr, x), rows);
      const updateData = (yr, useGEs, rows) => {
        return R.filter(x => R.contains(x.uuid, useGEs(yr)), rows);

        // R.filter(x=>x.eventGiftRequest ,rows2)
      };
      const newData = R.map(x => updateData(x, useGEs, rows), arrYears);

      console.table(newData);
      //console.table(this.removeGRs(newData, arrYears));
      console.table(arrSHOW_GRS);
      return newData;
      //return rows;
    } catch (e) {
      console.log(e.message);
    }
  };
  toggleState = () => {
    console.log("toggleState");
    const view = this.state.view;
    this.setState({
      view: this.state.view === "year" ? "giftevents" : "year",
      value: this.state.view === "year" ? 2 : 1
    });
  };
  onView = view => {
    console.log("onView " + view);
    this.setState({ view: view });
  };
  render() {
    const { rows, loading } = this.props;
    const styles = {
      content: {
        padding: 4
      },
      text: {
        //fontWeight: "lighter",
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "#220088",
        padding: "4px 0  4px 8px",
        borderRadius: "5px"
      },
      paper: {
        borderRadius: "5px"
      }
    };
    return (
      <div style={{ minWidth: "1200px" }}>
        <Paper style={styles.paper} zDepth={globalStyles.depth.n}>
          <div
            style={{
              color: "#00502F",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "1000px"
            }}
          >
            <h2>Gift History for Person</h2>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px"
            }}
          >
            <div
              style={{
                fontSize: "20px",
                marginRight: "30px",
                fontVariant: "small-caps",
                color: "#00502F"
              }}
            >
              Search, select, and show
            </div>
            <FieldText ontext={this.filterStr} />
          </div>
          <TableContainer
            searchType={"person"}
            onView={view => this.onView(view)}
          />
          <div>
            <hr />
            <hr />
            {!loading &&
              rows &&
              !rows.length &&
              (this.state.view === "year" ||
                this.state.view === "giftevents") && (
                <h3
                  style={{
                    fontStyle: "italic",
                    color: "#DF5C33",
                    padding: "8px"
                  }}
                >
                  No gift history.
                </h3>
              )}

            {rows.length > 0 &&
              this.state.view !== "formPerson" && (
                <DropDownMenu
                  value={this.state.value}
                  onChange={this.toggleState}
                >
                  <MenuItem value={1} primaryText="Sort by year" />
                  <MenuItem value={2} primaryText="Sort by gift event" />
                </DropDownMenu>
              )}
            {this.state.view === "year" && (
              <div>
                <GiftSortYearView
                  data={this.sortRows(rows)}
                  yrs={this.getYears(rows)}
                />
              </div>
            )}
            {this.state.view === "giftevents" && (
              <div>
                <GiftEventView rows={rows} yrs={null} />
              </div>
            )}
            {this.state.view === "formPerson" && <PersonForm />}
          </div>
        </Paper>
      </div>
    );
  }
}

export default People;
