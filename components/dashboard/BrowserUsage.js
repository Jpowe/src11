import React from "react";
import Paper from "material-ui/Paper";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Avatar from "material-ui/Avatar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import GlobalStyles from "../../styles";
import Subheader from "material-ui/Subheader";
import { typography } from "material-ui/styles";
import {
  grey400,
  cyan600,
  white,
  orange600,
  black
} from "material-ui/styles/colors";
import * as Colors from "material-ui/styles/colors";
//import myTheme from '../myTheme.js'

const BrowserUsage = props => {
  const { color, color2, color3, color4, color5, color6 } = props;
  const styles = {
    paper: {
      borderRadius: "10px"
    },
    legend: {
      padding: 20
    },
    pieChartDiv: {
      height: 290,
      textAlign: "center",
      width: "80%"
    },
    subheader: {
      fontSize: 18,
      fontWeight: typography.fontWeightLight,
      backgroundColor: color5,
      color: white,

      height: "40px"
    }
  };
  //const colors=["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f"]
  /* HSL colors derived from primary1Color */
  /*const colors = [
    "#a5b7c0",
    "#879fab",
    "#698796",
    "#c0a5a5",
    "#ab8787",
    "#966969",
    "#c0a5c0",
    "#ab87ab"
  ]*/
  const colors = [
    color,
    "#007746",
    "#009e5d",
    color2,
    "#2ac5b3",
    "#40d6c5",
    color3,
    "#f7a157"
  ];
  const colors2 = ["#9effd7", "#91e8de", "#facba2"];
  //const colors2 = [color,color2,color3]
  return (
    <Paper
      zDepth={GlobalStyles.depth.n}
      style={(styles.paper, { backgroundColor: color6 })}
    >
      <Subheader style={styles.subheader}>Investment categories</Subheader>
      <div style={GlobalStyles.clear} />
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer style={{ backgroundColor: color6 }}>
              <PieChart>
                <Pie
                  innerRadius={10}
                  outerRadius={60}
                  data={[
                    { name: "Liquid", value: 32 },
                    { name: "Illiquid", value: 16 },
                    { name: "Other", value: 52 }
                  ]}
                  fill="#8884d8"
                >
                  {props.data.map((item, i) => (
                    <Cell key={item.name} fill={colors2[i]} />
                  ))}
                </Pie>
                <Pie
                  innerRadius={60}
                  outerRadius={100}
                  data={props.data}
                  fill="#8884d8"
                >
                  {props.data.map((item, i) => (
                    <Cell key={item.name} fill={colors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div style={styles.legend}>
            <List>
              {props.data.map((item, i) => (
                <ListItem
                  key={item.name}
                  leftAvatar={
                    <Avatar icon={item.icon} backgroundColor={colors[i]} />
                  }
                >
                  {item.name}
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default BrowserUsage;
