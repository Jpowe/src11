import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
//import InOutdatatable from "../containers/InOutdatatable";
import Dashboard from "../containers/DashboardPage";
import Investments from "../containers/Investments";
import Iframe from "./Iframe.js";
//import Bg from "../images/squares-smallC2.jpg";
import Empty from "./Empty";
import PositivePay from "./PositivePay/GridContainer";
import PendingContainer from "./PendingList/PendingContainer";
import Addepar from "./Addepar/AddeparContainer";
import BoxToken from "./BoxToken/Form.js";
import InOfficeContainer from "./InOffice/InOfficeContainer.js";
import ComingSoon from "./ComingSoon";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
//import FlowWrightIntiateAPI from "./test/FlowWright-initate-api";
import WorkflowHR from "./WorkflowHR/NewHireHR.js";
import TollPass from "./WorkflowHR/TollPass.js";
import CC from "./WorkflowHR/CC.js";
import GlogInput from "./GlogInput/components/Main";
import QuickAccess from "./QuickAccess/FormContainer";
import IrisCalendar from "./IrisCalendar/DatePickerContainer.js";
import Add2Intact from "./Add2Intact/A2I";
import GiftLog from "./GiftLog/components/Main";
import ListView from "./Gifts/components/ListView";
import People from "./People/components/SearchContainer";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          height: "1500px"
        }}
      >
        {this.props.open ? <Empty /> : null}
        {this.props.location.pathname == "/portal/" ? <QuickAccess /> : null}
        <Switch>
          <Route path="/quickAccess" component={QuickAccess} />
          <Route path="/presence" component={InOfficeContainer} />
          <Route path="/boxtokenNative" component={BoxToken} />
          <Route path="/positivePay" component={PositivePay} />
          <Route path="/pendingList" component={PendingContainer} />
          <Route path="/addepar/bloomberg" component={Addepar} />
          <Route path="/addepar/intacct" component={Add2Intact} />
          <Route path="/testlevel1" component={Empty} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/investments" component={Investments} />
          <Route path="/workflow/newHireRequest" component={WorkflowHR} />
          <Route path="/workflow/tollPass" component={TollPass} />
          <Route path="/workflow/cc" component={CC} />
          <Route path="/glogInput" component={GlogInput} />
          <Route path="/irisCalendar" component={IrisCalendar} />

          <Route
            path="/workflow/dashboard"
            render={() => (
              <Iframe
                url="/cDevWorkflow/ConfigInstances.aspx?displayheader=no"
                title="FlowWright dashboard"
              />
            )}
          />
          <Route
            path="/workflow/myTasks"
            render={() => (
              <Iframe
                url="/cDevWorkflow/ConfigTasks.aspx?displayHeader=no"
                title="FlowWright general user task view"
              />
            )}
          />
          <Route path="/giftLog" component={GiftLog} />
          <Route path="/gift" component={ListView} />
          <Route path="/people" component={People} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(MainPage);
