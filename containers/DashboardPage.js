import React from "react";
import {
  cyan600,
  pink600,
  purple600,
  orange600
} from "material-ui/styles/colors";
import Assessment from "material-ui/svg-icons/action/assessment";
import Face from "material-ui/svg-icons/action/face";
import ThumbUp from "material-ui/svg-icons/action/thumb-up";
import ShoppingCart from "material-ui/svg-icons/action/shopping-cart";
import InfoBox from "../components/dashboard/InfoBox";
import NewOrders from "../components/dashboard/NewOrders";
import MonthlySales from "../components/dashboard/MonthlySales";
import BrowserUsage from "../components/dashboard/BrowserUsage";
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import globalStyles from "../styles";
import Data from "../data";
import muiThemeable from "material-ui/styles/muiThemeable";

const DashboardPage = props => {
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={ShoppingCart}
            color={props.muiTheme.palette.accent1Color}
            title="Total Profit"
            value="1500k"
            colorText={props.muiTheme.palette.secondaryTextColor}
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={ThumbUp}
            color={props.muiTheme.palette.primary3Color}
            title="Likes"
            value="4231"
            colorText={props.muiTheme.palette.secondaryTextColor}
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={Assessment}
            color={props.muiTheme.palette.primary1Color}
            title="Sales"
            value="460"
            colorText={props.muiTheme.palette.secondaryTextColor}
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={Face}
            color={props.muiTheme.palette.accent2Color}
            title="New Members"
            value="248"
            colorText={props.muiTheme.palette.secondaryTextColor}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <NewOrders
            data={Data.dashBoardPage.newOrders}
            color={props.muiTheme.palette.accent4Color}
            color2={props.muiTheme.palette.primary3Color}
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
          <MonthlySales
            data={Data.dashBoardPage.monthlySales}
            color={props.muiTheme.palette.accent4Color}
            color2={props.muiTheme.palette.primary3Color}
            color3={props.muiTheme.palette.secondaryTextColor}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <RecentlyProducts
            data={Data.dashBoardPage.recentProducts}
            color={props.muiTheme.palette.accent4Color}
            color2={props.muiTheme.palette.primary3Color}
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <BrowserUsage
            data={Data.dashBoardPage.browserUsage}
            color={props.muiTheme.palette.primary1Color}
            color2={props.muiTheme.palette.accent1Color}
            color3={props.muiTheme.palette.accent2Color}
            color4={props.muiTheme.palette.primary4Color}
            color5={props.muiTheme.palette.primary3Color}
            color6={props.muiTheme.palette.accent4Color}
          />
        </div>
      </div>
    </div>
  );
};

export default muiThemeable()(DashboardPage);
