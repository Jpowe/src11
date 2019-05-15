//import myTheme from './myTheme.js'
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as Colors from "material-ui/styles/colors";
import { darken, fade, emphasize, lighten } from "./utils/colorManipulator";
import Img from "./images/nav_green9.jpg";
//import { darken, fade, emphasize, lighten } from "./utils/colorManipulator";

const themeDefault = getMuiTheme({
  palette: {
    primary1Color: "#00502F", //dark green
    primary2Color: "#455A64", //blueGrey700
    primary3Color: "#2C3673", //dark blue
    // primary4Color: "#3e688c", //cornflower blue
    textColor: Colors.black,
    primaryTextColor: Colors.black,
    secondaryTextColor: "#455A64", //blueGrey700
    //  alternateTextColor: '#ffffff',
    canvasColor: Colors.grey300,
    accent1Color: "#23A596", //teal

    accent2Color: "#f58c32", //orange
    accent3Color: "#6076A9", //darj bkye grey
    accent4Color: "#A4AECB", //light blue
    accent5Color: "#DF5C33", //dark orange

    borderColor: "#9ccc65",
    fontWeightLight: "100"
    //testColor: '#9ccc65',
    //pickerHeaderColor: deepOrange500,
  },
  fontFamily: "sans-serif,Roboto",
  typography: {
    //fontStyleButtonFontSize:
    //fontWeightMedium,
  },
  appBar: {
    color: "#f58c32",
    textColor: "#00502F",
    height: 120,
    padding: 15,
    style: {
      backgroundImage: { Img }
    }
  },
  drawer: {
    width: 230,
    color: "#2C3673" //primary3Color
    //fontWeight: "lighter"
  },
  raisedButton: {
    //  primaryColor: blue600
  },
  flatButton: {
    primaryTextColor: Colors.blueGrey200
  },
  iconButton: {
    padding: 0
  },
  menuItem: {
    selectedTextColor: Colors.cyan500,
    hoverColor: fade(Colors.cyan500, 0.1)
  },
  toggle: {
    thumbOnColor: Colors.green500,
    trackOnColor: fade(Colors.green500, 0.5)
  },

  tableRow: {
    //hoverColor: palette.accent2Color,
    //stripeColor: fade(lighten(blueGrey800, 0.5), 0.4),
    //selectedColor: palette.borderColor,
    //textColor: palette.textColor,
    //borderColor: palette.borderColor,
    fontSize: 28
  },
  tableHeader: {
    //borderColor: Colors.cyan500,
    color: Colors.green900
  },
  tableFooter: {
    //textColor: '#ffffff'
  },
  table: {
    //backgroundColor: cyan500,
  },

  tableRowColumn: {
    height: 18,
    spacing: 20
  },
  card: {
    titleColor: fade("#455A64", 0.87),
    subtitleColor: fade("#455A64", 0.54)
  },
  cardText: {
    textColor: ""
  },
  tooltip: {
    color: Colors.white,
    rippleBackgroundColor: "#DF5C33",
    //  opacity: 0.9,
    fontSize: "30px"
  }
});

export default themeDefault;
