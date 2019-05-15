import React from "react";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MyHeader from "./components/MyHeader";
import LeftDrawer from "./components/LeftDrawer";
import RightDrawer from "./components/RightDrawer";
import InOfficeDrawer from "./components/InOfficeDrawer";
import MainPage from "./components/MainPage";
import withWidth, { LARGE, SMALL } from "material-ui/utils/withWidth";
import ThemeDefault from "./theme-default";
import Data from "./data";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import FlyoutContainer from "./components/FlyoutContainer";
//import Bg from "./images/squares-smallC2.jpg";
import Bg from "./images/squares-small2a.png";
import { Log } from "./utils/utils";
import PinDrawer from "./components/PinDrawer";

const store = configureStore();
//window.appStore = store; //In case you want to see what's inside by executing appStore in console;

class App extends React.Component {
  constructor(props) {
    super(props);
    //  console.log("App.constructor");
    Log("App constructor 205pm");
    this.state = {
      navDrawerOpen: false,
      navRightDrawerOpen: false,
      inOfficeDrawerOpen: false,
      flyoutEnabled: false,
      modalOpen: true
    };
  }
  componentDidMount() {
    if (window.innerWidth > 1000) {
      this.setState({ navDrawerOpen: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    Log(
      "nextProps && window.innerWidth" +
        JSON.stringify(nextProps) +
        window.innerWidth
    );
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer = () => {
    Log("handleChangeRequestNavDrawer");
    Log("App.state.navDrawerOpen " + this.state.navDrawerOpen);
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
      navRightDrawerOpen: false
    });
  };
  /*  RIGHT DRAWER: NOTIFICATIONS */
  handleChangeRequestNavDrawer3 = () => {
    Log("handleChangeRequestNavDrawer3");
    this.setState({
      navRightDrawerOpen: !this.state.navRightDrawerOpen,
      navDrawerOpen: this.state.navRightDrawerOpen
      /* BATCH SET STATE Hack */
      /////flyoutEnabled: this.state.navRightDrawerOpen
    });
    if (this.props.width == SMALL) {
      this.setState({
        navDrawerOpen: false
      });
    }
  };
  handleInOfficeDrawer = () => {
    Log("handleInOfficeDrawer f");
    this.setState({ inOfficeDrawerOpen: !this.state.inOfficeDrawerOpen });
  };
  handleActionTouchTap = () => {
    Log("handleActionTouchTap ");
    this.setState({
      //snackbar: false
    });
  };
  closeDrawer = () => {
    Log("APP.JS CLOSEDRAWER F   ");
    if (this.props.width == SMALL) {
      this.setState({ navDrawerOpen: false });
    }
  };

  render() {
    let { navDrawerOpen, navRightDrawerOpen, inOfficeDrawerOpen } = this.state;
    const header = {
      height: 100
    };
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider muiTheme={ThemeDefault}>
            <div
              style={{
                //  maxWidth: "1370px",
                background: `url(${Bg})`,
                height: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
              }}
            >
              <MyHeader
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
                handleChangeRequestRightDrawer={
                  this.handleChangeRequestNavDrawer3
                }
                handleInOfficeDrawer={this.handleInOfficeDrawer}
                leftNavDrawOpen={this.state.navDrawerOpen}
                open={this.state.navDrawerOpen}
              />
              <LeftDrawer
                navDrawerOpen={navDrawerOpen}
                menus={Data.menus}
                username="BSCC user"
                smallScreen={this.props.width == SMALL}
                closeSelf={this.closeDrawer}
              />
              <RightDrawer
                navDrawerOpen={navRightDrawerOpen}
                handleChangeRequestNavDrawer={
                  this.handleChangeRequestNavDrawer3
                }
              />
              <InOfficeDrawer
                navDrawerOpen={inOfficeDrawerOpen}
                handleChangeRequestNavDrawer={this.handleInOfficeDrawer}
              />
              <PinDrawer />
              {this.state.flyoutEnabled ? <FlyoutContainer /> : null}
              <div style={{ height: "80px" }} />
              <MainPage open={this.state.navDrawerOpen} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withWidth()(App);
