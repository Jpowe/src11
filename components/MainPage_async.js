/**
* WILL BE USED FOR CODE SPLITTING
*
*//

import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//import InOutdatatable from "../containers/InOutdatatable";
import Dashboard from "../containers/DashboardPage";
import Investments from "../containers/Investments";
//import InOfficeIframe from "./InofficeIframe.js";
//import PendingIframe from "./PendingIframe.js";
//import AddeparIframe from "./AddeparIframe.js";
//import BoxtokenIframe from "./BoxtokenIframe.js";
import Iframe from "./Iframe.js";
//import Bg from "../images/squares-smallC2.jpg";
import Empty from "./Empty";
import asyncComponent from "./AsyncComponent";
import AppliedRoute from "./AppliedRoute";
const AsyncInvestments = asyncComponent(() =>
  import("../containers/Investments")
);

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.onclickLevel = this.onclickLevel.bind(this);
  }
  componentWillMount() {
    this.setState({});
  }
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          padding: "10px",
          //backgroundImage: `url(${Bg})`,
          ///background: `url(${Bg})`,
          ///  backgroundRepeat: "repeat",
          display: "flex",
          justifyContent: "space-between",
          height: "1000px"
        }}
      >
        {this.props.open ? <Empty /> : null}
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <AppliedRoute
            path="/investments"
            exact
            component={AsyncInvestments}
          />
          <Route
            path="/inOffice"
            render={() => (
              <Iframe url="https://portal.bluesprucecapital.net/present/" />
            )}
          />
          <Route
            path="/pending"
            render={() => (
              <Iframe url="https://portal.bluesprucecapital.net/pending/" />
            )}
          />
          <Route
            path="/addepar"
            render={() => (
              <Iframe url="https://portal.bluesprucecapital.net/addepar/" />
            )}
          />
          <Route
            path="/boxtoken"
            render={() => (
              <Iframe url="https://portal.bluesprucecapital.net/boxtoken/" />
            )}
          />
          <Route path="/decisions" />
        </Switch>
      </div>
    );
  }
}
export default MainPage;
